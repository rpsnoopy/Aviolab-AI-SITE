@echo off
setlocal EnableDelayedExpansion

:: TTR-SUITE Agent Installation Script (Improved Version)
:: This script copies agent files to the TTR-SUITE installation directory

echo.
echo ========================================
echo   TTR-SUITE Agent Installation Script
echo ========================================
echo.

:: Check if TTR-SUITE directory exists
set "DESTINATION=C:\TTR-SUITE\AppData\AgentCodes"
if not exist "C:\TTR-SUITE\" (
    echo ERROR: TTR-SUITE not found at C:\TTR-SUITE\
    echo Please ensure TTR-SUITE is installed before running this script.
    echo.
    pause
    exit /b 1
)

:: Create AgentCodes directory if it doesn't exist
if not exist "%DESTINATION%" (
    echo Creating AgentCodes directory...
    mkdir "%DESTINATION%" 2>nul
    if errorlevel 1 (
        echo ERROR: Failed to create directory %DESTINATION%
        echo Please check permissions and try again.
        echo.
        pause
        exit /b 1
    )
    echo Directory created successfully.
    echo.
)

:: First, check current directory for ZIP files
echo Scanning current directory for agent ZIP files...
echo Current directory: %CD%
echo.

set /a ZIP_COUNT=0
set ZIP_LIST=
for %%f in ("*.zip") do (
    set /a ZIP_COUNT+=1
    set "ZIP_LIST=!ZIP_LIST! %%f"
    echo Found ZIP file: %%f
)

if %ZIP_COUNT%==1 (
    :: Only one ZIP file found - ask for confirmation
    for %%f in ("*.zip") do (
        echo.
        echo Found one ZIP file: %%f
        echo Do you want to install agents from this file? (Y/N)
        set /p "AUTO_CONFIRM="
        
        if /i "!AUTO_CONFIRM!"=="Y" (
            set "SELECTED_ZIP=%%f"
            goto PROCESS_ZIP
        ) else if /i "!AUTO_CONFIRM!"=="YES" (
            set "SELECTED_ZIP=%%f"
            goto PROCESS_ZIP
        )
    )
)

if %ZIP_COUNT% gtr 1 (
    :: Multiple ZIP files found - let user choose
    echo.
    echo Found %ZIP_COUNT% ZIP files. Please choose which one to install:
    echo.
    
    set /a INDEX=0
    for %%f in ("*.zip") do (
        set /a INDEX+=1
        echo !INDEX!. %%f
        set "ZIP_OPTION_!INDEX!=%%f"
    )
    
    echo.
    echo Enter the number of the ZIP file to install (1-%ZIP_COUNT%):
    set /p "ZIP_CHOICE="
    
    :: Validate choice
    if "!ZIP_CHOICE!"=="" goto MANUAL_INPUT
    if %ZIP_CHOICE% lss 1 goto MANUAL_INPUT
    if %ZIP_CHOICE% gtr %ZIP_COUNT% goto MANUAL_INPUT
    
    :: Get selected ZIP file
    set "SELECTED_ZIP=!ZIP_OPTION_%ZIP_CHOICE%!"
    if "!SELECTED_ZIP!"=="" goto MANUAL_INPUT
    
    goto PROCESS_ZIP
)

:MANUAL_INPUT
:: No ZIP files found in current directory or user wants to specify manually
echo.
if %ZIP_COUNT%==0 (
    echo No ZIP files found in current directory.
)
echo.
echo Please specify the agent source:
echo 1. Full path to a ZIP file (e.g., C:\Downloads\agents.zip)
echo 2. Directory containing DLL files (e.g., C:\Downloads\agents\)
echo 3. Directory containing ZIP files (e.g., C:\Downloads\)
echo.
echo Enter your choice:
set /p "SOURCE_INPUT="

:: Remove quotes if present
set "SOURCE_INPUT=%SOURCE_INPUT:"=%"

:: Check if input is empty
if "%SOURCE_INPUT%"=="" (
    echo.
    echo ERROR: No input provided.
    echo.
    goto MANUAL_INPUT
)

:: Check if it's a ZIP file
if /i "%SOURCE_INPUT:~-4%"==".zip" (
    if not exist "%SOURCE_INPUT%" (
        echo.
        echo ERROR: ZIP file "%SOURCE_INPUT%" does not exist.
        echo.
        goto MANUAL_INPUT
    )
    set "SELECTED_ZIP=%SOURCE_INPUT%"
    goto PROCESS_ZIP
)

:: Check if it's a directory
if not exist "%SOURCE_INPUT%" (
    echo.
    echo ERROR: Directory "%SOURCE_INPUT%" does not exist.
    echo.
    goto MANUAL_INPUT
)

:: Check for DLL files in directory
set /a DLL_COUNT=0
for %%f in ("%SOURCE_INPUT%\*.dll") do (
    set /a DLL_COUNT+=1
)

if %DLL_COUNT% gtr 0 (
    :: Found DLL files directly
    set "SOURCE_DIR=%SOURCE_INPUT%"
    goto COPY_DLLS
)

:: Check for ZIP files in directory
set /a DIR_ZIP_COUNT=0
for %%f in ("%SOURCE_INPUT%\*.zip") do (
    set /a DIR_ZIP_COUNT+=1
)

if %DIR_ZIP_COUNT%==0 (
    echo.
    echo ERROR: No .dll or .zip files found in "%SOURCE_INPUT%"
    echo.
    goto MANUAL_INPUT
)

if %DIR_ZIP_COUNT%==1 (
    :: Only one ZIP file in directory
    for %%f in ("%SOURCE_INPUT%\*.zip") do (
        set "SELECTED_ZIP=%%f"
    )
    goto PROCESS_ZIP
)

:: Multiple ZIP files in directory - let user choose
echo.
echo Found %DIR_ZIP_COUNT% ZIP files in "%SOURCE_INPUT%":
echo.

set /a INDEX=0
for %%f in ("%SOURCE_INPUT%\*.zip") do (
    set /a INDEX+=1
    echo !INDEX!. %%~nxf
    set "DIR_ZIP_OPTION_!INDEX!=%%f"
)

echo.
echo Enter the number of the ZIP file to install (1-%DIR_ZIP_COUNT%):
set /p "DIR_ZIP_CHOICE="

:: Validate choice
if "!DIR_ZIP_CHOICE!"=="" goto MANUAL_INPUT
if %DIR_ZIP_CHOICE% lss 1 goto MANUAL_INPUT
if %DIR_ZIP_CHOICE% gtr %DIR_ZIP_COUNT% goto MANUAL_INPUT

:: Get selected ZIP file
set "SELECTED_ZIP=!DIR_ZIP_OPTION_%DIR_ZIP_CHOICE%!"
if "!SELECTED_ZIP!"=="" goto MANUAL_INPUT

:PROCESS_ZIP
:: Extract and process the selected ZIP file
echo.
echo Processing ZIP file: %SELECTED_ZIP%
echo.

:: Create temporary extraction directory
set "TEMP_EXTRACT=%TEMP%\ttr_agent_extract_%RANDOM%"
mkdir "%TEMP_EXTRACT%" 2>nul

:: Extract ZIP file
echo Extracting ZIP file...
powershell -command "try { Expand-Archive -Path '%SELECTED_ZIP%' -DestinationPath '%TEMP_EXTRACT%' -Force; exit 0 } catch { exit 1 }" 2>nul

if errorlevel 1 (
    echo.
    echo ERROR: Failed to extract ZIP file.
    echo Please ensure the file is a valid ZIP archive.
    rmdir /s /q "%TEMP_EXTRACT%" 2>nul
    echo.
    pause
    exit /b 1
)

:: Count DLL files in extracted content
set /a DLL_COUNT=0
for /r "%TEMP_EXTRACT%" %%f in (*.dll) do (
    set /a DLL_COUNT+=1
)

if %DLL_COUNT%==0 (
    echo.
    echo ERROR: No .dll files found in ZIP archive.
    echo Please ensure the ZIP file contains agent DLL files.
    rmdir /s /q "%TEMP_EXTRACT%" 2>nul
    echo.
    pause
    exit /b 1
)

echo Found %DLL_COUNT% agent DLL file(s) in ZIP archive.
set "SOURCE_DIR=%TEMP_EXTRACT%"
goto INSTALL_AGENTS

:COPY_DLLS
:: Direct DLL copying (no extraction needed)
set /a DLL_COUNT=0
for %%f in ("%SOURCE_DIR%\*.dll") do (
    set /a DLL_COUNT+=1
)

echo Found %DLL_COUNT% agent DLL file(s) to install.

:INSTALL_AGENTS
:: Final installation confirmation and process
echo.
echo ========================================
echo   Installation Summary
echo ========================================
echo Source: %SOURCE_DIR%
echo Destination: %DESTINATION%
echo DLL files to install: %DLL_COUNT%
echo.

:: List DLL files that will be installed
echo Files to be installed:
if exist "%TEMP_EXTRACT%" (
    for /r "%SOURCE_DIR%" %%f in (*.dll) do (
        echo   - %%~nxf
    )
) else (
    for %%f in ("%SOURCE_DIR%\*.dll") do (
        echo   - %%~nxf
    )
)

echo.
echo Do you want to proceed with the installation? (Y/N)
set /p "FINAL_CONFIRM="

if /i not "%FINAL_CONFIRM%"=="Y" if /i not "%FINAL_CONFIRM%"=="YES" (
    echo.
    echo Installation cancelled by user.
    if exist "%TEMP_EXTRACT%" rmdir /s /q "%TEMP_EXTRACT%" 2>nul
    echo.
    pause
    exit /b 0
)

echo.
echo Installing agent DLL files...
echo.

:: Copy DLL files and verify
set /a COPIED=0
set /a FAILED=0

if exist "%TEMP_EXTRACT%" (
    :: Copy from extracted files (recursive search)
    for /r "%SOURCE_DIR%" %%f in (*.dll) do (
        echo Installing: %%~nxf
        copy "%%f" "%DESTINATION%\" >nul 2>&1
        
        if errorlevel 1 (
            echo   ERROR: Failed to copy %%~nxf
            set /a FAILED+=1
        ) else (
            :: Verify file was copied correctly
            if exist "%DESTINATION%\%%~nxf" (
                echo   SUCCESS: %%~nxf installed successfully
                set /a COPIED+=1
            ) else (
                echo   ERROR: %%~nxf not found after copy
                set /a FAILED+=1
            )
        )
    )
) else (
    :: Copy from source directory directly
    for %%f in ("%SOURCE_DIR%\*.dll") do (
        echo Installing: %%~nxf
        copy "%%f" "%DESTINATION%\" >nul 2>&1
        
        if errorlevel 1 (
            echo   ERROR: Failed to copy %%~nxf
            set /a FAILED+=1
        ) else (
            :: Verify file was copied correctly
            if exist "%DESTINATION%\%%~nxf" (
                echo   SUCCESS: %%~nxf installed successfully
                set /a COPIED+=1
            ) else (
                echo   ERROR: %%~nxf not found after copy
                set /a FAILED+=1
            )
        )
    )
)

:: Clean up temporary extraction directory
if exist "%TEMP_EXTRACT%" (
    echo.
    echo Cleaning up temporary files...
    rmdir /s /q "%TEMP_EXTRACT%" 2>nul
)

echo.
echo ========================================
echo   Installation Complete
echo ========================================
echo DLL files installed successfully: %COPIED%
echo DLL files failed: %FAILED%
echo Total DLL files processed: %DLL_COUNT%
echo.

if %FAILED% gtr 0 (
    echo WARNING: Some files failed to install. Please check:
    echo   - Windows permissions (run as Administrator if needed)
    echo   - Available disk space
    echo   - TTR-SUITE is not currently running
    echo.
    echo You may need to manually copy the failed files to:
    echo   %DESTINATION%
    echo.
) else (
    echo SUCCESS: All agent DLL files have been installed to TTR-SUITE!
    echo.
    echo The agents are now available in TTR-SUITE.
    echo Please restart TTR-SUITE to load the new agents.
    echo.
)

echo Press any key to exit...
pause >nul