document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const authContainer = document.getElementById('authContainer');
    const filesContainer = document.getElementById('filesContainer');
    const emailStep = document.getElementById('emailStep');
    const codeStep = document.getElementById('codeStep');
    const emailInput = document.getElementById('emailInput');
    const codeInput = document.getElementById('codeInput');
    const requestCodeBtn = document.getElementById('requestCodeBtn');
    const verifyCodeBtn = document.getElementById('verifyCodeBtn');
    const resendCodeBtn = document.getElementById('resendCodeBtn');
    const backToEmailBtn = document.getElementById('backToEmailBtn');
    const emailMessage = document.getElementById('emailMessage');
    const codeMessage = document.getElementById('codeMessage');
    const displayEmail = document.getElementById('displayEmail');
    const codeTimer = document.getElementById('codeTimer');
    const logoutBtn = document.getElementById('logoutBtn');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const fileUpload = document.getElementById('fileUpload');
    const uploadBtn = document.getElementById('uploadBtn');
    const filesList = document.getElementById('filesList');
    const noFiles = document.getElementById('noFiles');
    const searchFiles = document.getElementById('searchFiles');

    // Current language from localStorage or default
    const currentLanguage = localStorage.getItem('language') || 'en';
    
    // Mock registered emails (in a real app, this would be in a database)
    const registeredEmails = [
        'riccardo.parenti@outlook.com',
        'rpsnoopy@me.com',
        'paola.ferrarazzo@outlook.com'
    ];

    // Mock verification code
    let verificationCode = '';
    let codeExpiryTime = 0;
    let timerInterval;
    let verificationAttempts = 0;

    // Mock files data (in a real app, this would come from a server)
    let filesData = [
        {
            id: 1,
            name: 'product_manual.pdf',
            size: 2457600,
            uploaded: '2024-03-22T14:30:00',
            uploadedBy: 'Admin',
            checksum: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            isDownloadable: true
        },
        {
            id: 2,
            name: 'technical_specs.zip',
            size: 5242880,
            uploaded: '2024-03-20T10:15:00',
            uploadedBy: 'System',
            checksum: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2',
            isDownloadable: true
        }
    ];

    // Check if user is already authenticated
    checkAuthentication();

    // Initialize UI
    function initUI() {
        // Show email step initially
        emailStep.classList.add('active');

        // Event listeners
        requestCodeBtn.addEventListener('click', requestVerificationCode);
        verifyCodeBtn.addEventListener('click', verifyCode);
        resendCodeBtn.addEventListener('click', resendCode);
        backToEmailBtn.addEventListener('click', backToEmail);
        logoutBtn.addEventListener('click', logout);
        uploadBtn.addEventListener('click', uploadFiles);
        searchFiles.addEventListener('input', filterFiles);

        // File input change event to show selected files
        fileUpload.addEventListener('change', function() {
            const fileLabel = document.querySelector('.file-input-label span');
            if (fileUpload.files.length > 0) {
                fileLabel.textContent = `${fileUpload.files.length} ${fileUpload.files.length === 1 ? 
                    (currentLanguage === 'en' ? 'file selected' : 'file selezionato') : 
                    (currentLanguage === 'en' ? 'files selected' : 'file selezionati')}`;
            } else {
                fileLabel.textContent = translations[currentLanguage].upload_files || 'Upload Files';
            }
        });
    }

    // Check if user is authenticated
    function checkAuthentication() {
        const userEmail = localStorage.getItem('userEmail');
        const authExpiry = localStorage.getItem('authExpiry');

        if (userEmail && authExpiry && new Date().getTime() < parseInt(authExpiry)) {
            // User is authenticated
            authContainer.style.display = 'none';
            filesContainer.style.display = 'block';
            
            // Set welcome message
            if (welcomeMessage) {
                welcomeMessage.textContent = `${translations[currentLanguage].welcome || 'Welcome'}, ${userEmail}`;
            }
            
            // Load files
            renderFiles();
        }
    }

    // Request verification code
    function requestVerificationCode() {
        const email = emailInput.value.trim();
        
        if (!email) {
            showMessage(emailMessage, translations[currentLanguage].email_required || 'Please enter your email address', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage(emailMessage, translations[currentLanguage].email_invalid || 'Please enter a valid email address', 'error');
            return;
        }
        
        if (!registeredEmails.includes(email)) {
            showMessage(emailMessage, translations[currentLanguage].email_not_registered || 'This email is not registered', 'error');
            return;
        }
        
        // Generate verification code (6 digits)
        verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Set code expiry time (5 minutes from now)
        codeExpiryTime = new Date().getTime() + 5 * 60 * 1000;
        
        // Update UI
        emailStep.classList.remove('active');
        codeStep.classList.add('active');
        displayEmail.textContent = email;
        codeInput.value = '';
        verificationAttempts = 0;
        
        // Start timer
        startCodeTimer();
        
        // In a real app, this would send an email with the code
        console.log(`Verification code for ${email}: ${verificationCode}`);
    }

    // Verify code
    function verifyCode() {
        const code = codeInput.value.trim();
        
        if (!code) {
            showMessage(codeMessage, translations[currentLanguage].code_required || 'Please enter the verification code', 'error');
            return;
        }
        
        // Check if code is expired
        if (new Date().getTime() > codeExpiryTime) {
            showMessage(codeMessage, translations[currentLanguage].code_expired || 'Verification code has expired', 'error');
            return;
        }
        
        // Check if code is correct
        if (code !== verificationCode) {
            verificationAttempts++;
            
            if (verificationAttempts >= 2) {
                showMessage(codeMessage, translations[currentLanguage].code_attempts_exceeded || 'Too many incorrect attempts. Please request a new code.', 'error');
                resendCodeBtn.disabled = false;
                verifyCodeBtn.disabled = true;
            } else {
                showMessage(codeMessage, translations[currentLanguage].code_incorrect || 'Incorrect verification code. Please try again.', 'error');
            }
            return;
        }
        
        // Authentication successful
        clearInterval(timerInterval);
        
        // Store authentication in localStorage (expires in 24 hours)
        const email = displayEmail.textContent;
        localStorage.setItem('userEmail', email);
        localStorage.setItem('authExpiry', new Date().getTime() + 24 * 60 * 60 * 1000);
        
        // Update UI
        authContainer.style.display = 'none';
        filesContainer.style.display = 'block';
        welcomeMessage.textContent = `${translations[currentLanguage].welcome || 'Welcome'}, ${email}`;
        
        // Load files
        renderFiles();
    }

    // Resend verification code
    function resendCode() {
        // Generate new verification code
        verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Reset code expiry time
        codeExpiryTime = new Date().getTime() + 5 * 60 * 1000;
        
        // Reset attempts
        verificationAttempts = 0;
        verifyCodeBtn.disabled = false;
        
        // Clear input and message
        codeInput.value = '';
        codeMessage.style.display = 'none';
        
        // Restart timer
        clearInterval(timerInterval);
        startCodeTimer();
        
        // Show success message
        showMessage(codeMessage, translations[currentLanguage].code_resent || 'A new verification code has been sent to your email', 'success');
        
        // In a real app, this would send a new email with the code
        console.log(`New verification code for ${displayEmail.textContent}: ${verificationCode}`);
    }

    // Go back to email step
    function backToEmail() {
        // Clear timer and code
        clearInterval(timerInterval);
        verificationCode = '';
        
        // Update UI
        codeStep.classList.remove('active');
        emailStep.classList.add('active');
        emailMessage.style.display = 'none';
    }

    // Start code timer
    function startCodeTimer() {
        clearInterval(timerInterval);
        
        timerInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = codeExpiryTime - now;
            
            if (distance <= 0) {
                clearInterval(timerInterval);
                codeTimer.textContent = '0:00';
                showMessage(codeMessage, translations[currentLanguage].code_expired || 'Verification code has expired', 'error');
                verifyCodeBtn.disabled = true;
            } else {
                const minutes = Math.floor(distance / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                codeTimer.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            }
        }, 1000);
    }

    // Logout
    function logout() {
        // Clear authentication
        localStorage.removeItem('userEmail');
        localStorage.removeItem('authExpiry');
        
        // Reset UI
        filesContainer.style.display = 'none';
        authContainer.style.display = 'block';
        emailStep.classList.add('active');
        codeStep.classList.remove('active');
        emailInput.value = '';
        codeInput.value = '';
        emailMessage.style.display = 'none';
        codeMessage.style.display = 'none';
    }

    // Upload files
    function uploadFiles() {
        const files = fileUpload.files;
        
        if (files.length === 0) {
            alert(translations[currentLanguage].no_files_selected || 'Please select files to upload');
            return;
        }
        
        // In a real app, this would upload the files to a server
        // For demo purposes, we'll just add them to our mock data
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const userEmail = localStorage.getItem('userEmail');
            
            // Generate mock checksum
            const mockChecksum = Array.from(Array(64), () => Math.floor(Math.random() * 16).toString(16)).join('');
            
            // Add file to mock data
            const newFile = {
                id: filesData.length + 1 + i,
                name: file.name,
                size: file.size,
                uploaded: new Date().toISOString(),
                uploadedBy: userEmail,
                checksum: mockChecksum,
                isDownloadable: true
            };
            
            filesData.push(newFile);
        }
        
        // Reset file input
        fileUpload.value = '';
        document.querySelector('.file-input-label span').textContent = translations[currentLanguage].upload_files || 'Upload Files';
        
        // Render updated files
        renderFiles();
        
        // Show success message
        alert(translations[currentLanguage].files_uploaded || 'Files uploaded successfully');
    }

    // Render files list
    function renderFiles() {
        // Check if there are files to display
        if (filesData.length === 0) {
            filesList.innerHTML = '';
            noFiles.style.display = 'block';
            return;
        }
        
        // Hide no files message
        noFiles.style.display = 'none';
        
        // Clear existing table rows
        filesList.innerHTML = '';
        
        // Create rows for each file
        filesData.forEach(file => {
            const row = document.createElement('tr');
            
            // Format date
            const uploadDate = new Date(file.uploaded);
            const formattedDate = uploadDate.toLocaleDateString() + ' ' + uploadDate.toLocaleTimeString();
            
            // Format file size
            const formattedSize = formatFileSize(file.size);
            
            // Create row content
            row.innerHTML = `
                <td>${file.name}</td>
                <td>${formattedSize}</td>
                <td>${formattedDate}</td>
                <td>${file.uploadedBy}</td>
                <td><span class="file-checksum">${file.checksum}</span></td>
                <td>
                    <div class="file-actions">
                        ${file.isDownloadable ? `<button class="file-action-btn download-btn" data-id="${file.id}" title="${translations[currentLanguage].download || 'Download'}"><i class="fas fa-download"></i></button>` : ''}
                        <button class="file-action-btn delete-btn" data-id="${file.id}" title="${translations[currentLanguage].delete || 'Delete'}"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            `;
            
            filesList.appendChild(row);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                downloadFile(parseInt(this.getAttribute('data-id')));
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                deleteFile(parseInt(this.getAttribute('data-id')));
            });
        });
    }

    // Filter files based on search input
    function filterFiles() {
        const searchTerm = searchFiles.value.toLowerCase();
        
        // If search term is empty, show all files
        if (!searchTerm) {
            renderFiles();
            return;
        }
        
        // Filter files based on name or uploaded by
        const filteredFiles = filesData.filter(file => 
            file.name.toLowerCase().includes(searchTerm) || 
            file.uploadedBy.toLowerCase().includes(searchTerm)
        );
        
        // Update UI with filtered files
        if (filteredFiles.length === 0) {
            filesList.innerHTML = '';
            noFiles.style.display = 'block';
            noFiles.textContent = translations[currentLanguage].no_files_found || 'No files matching your search';
        } else {
            noFiles.style.display = 'none';
            filesList.innerHTML = '';
            
            filteredFiles.forEach(file => {
                const row = document.createElement('tr');
                
                // Format date
                const uploadDate = new Date(file.uploaded);
                const formattedDate = uploadDate.toLocaleDateString() + ' ' + uploadDate.toLocaleTimeString();
                
                // Format file size
                const formattedSize = formatFileSize(file.size);
                
                // Create row content
                row.innerHTML = `
                    <td>${file.name}</td>
                    <td>${formattedSize}</td>
                    <td>${formattedDate}</td>
                    <td>${file.uploadedBy}</td>
                    <td><span class="file-checksum">${file.checksum}</span></td>
                    <td>
                        <div class="file-actions">
                            ${file.isDownloadable ? `<button class="file-action-btn download-btn" data-id="${file.id}" title="${translations[currentLanguage].download || 'Download'}"><i class="fas fa-download"></i></button>` : ''}
                            <button class="file-action-btn delete-btn" data-id="${file.id}" title="${translations[currentLanguage].delete || 'Delete'}"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                `;
                
                filesList.appendChild(row);
            });
            
            // Add event listeners to action buttons
            document.querySelectorAll('.download-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    downloadFile(parseInt(this.getAttribute('data-id')));
                });
            });
            
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    deleteFile(parseInt(this.getAttribute('data-id')));
                });
            });
        }
    }

    // Download file
    function downloadFile(fileId) {
        const file = filesData.find(f => f.id === fileId);
        
        if (!file) {
            alert(translations[currentLanguage].file_not_found || 'File not found');
            return;
        }
        
        // In a real app, this would download the file from the server
        // For demo purposes, we'll just show an alert
        alert(`${translations[currentLanguage].downloading || 'Downloading'} ${file.name}...`);
    }

    // Delete file
    function deleteFile(fileId) {
        const file = filesData.find(f => f.id === fileId);
        
        if (!file) {
            alert(translations[currentLanguage].file_not_found || 'File not found');
            return;
        }
        
        // Confirm deletion
        if (confirm(`${translations[currentLanguage].confirm_delete || 'Are you sure you want to delete'} ${file.name}?`)) {
            // Remove file from data
            filesData = filesData.filter(f => f.id !== fileId);
            
            // Update UI
            renderFiles();
        }
    }

    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = 'auth-message ' + type;
        element.style.display = 'block';
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Initialize the UI
    initUI();
});