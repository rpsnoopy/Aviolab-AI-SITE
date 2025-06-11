// Downloads page functionality
document.addEventListener('DOMContentLoaded', function() {
    const clientIdInput = document.getElementById('client-id');
    const accessBtn = document.getElementById('access-client-area');
    const clientFilesSection = document.getElementById('client-files');
    const clientDownloads = document.getElementById('client-downloads');
    const clientAreaTitle = document.getElementById('client-area-title');

    // Load public downloads from directory
    loadPublicDownloads();
    
    // Handle client area access
    if (accessBtn) {
        accessBtn.addEventListener('click', function() {
            const clientId = clientIdInput.value.trim();
            if (clientId) {
                loadClientFiles(clientId);
            } else {
                alert('Please enter a valid Client ID');
            }
        });
    }

    // Allow Enter key to trigger access
    if (clientIdInput) {
        clientIdInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                accessBtn.click();
            }
        });
    }

    function loadPublicDownloads() {
        // This function will scan the downloads/public directory
        // For now, we'll add the existing brochures and placeholder for future files
        const publicDownloadsContainer = document.getElementById('public-downloads');
        
        // Add placeholder for additional public files
        // You can manually add more items here or implement dynamic loading
        const additionalPublicFiles = [
            // Example structure - uncomment and modify when you add public files
            // {
            //     name: 'Demo Software',
            //     description: 'Try our software with sample data',
            //     icon: 'fas fa-download',
            //     file: 'downloads/public/demo.zip'
            // }
        ];

        additionalPublicFiles.forEach(file => {
            addPublicDownloadItem(file, publicDownloadsContainer);
        });
    }

    function addPublicDownloadItem(file, container) {
        const downloadItem = document.createElement('div');
        downloadItem.className = 'download-item';
        downloadItem.innerHTML = `
            <div class="download-icon">
                <i class="${file.icon}"></i>
            </div>
            <div class="download-info">
                <h3>${file.name}</h3>
                <p>${file.description}</p>
                <div class="download-links">
                    <a href="${file.file}" download class="btn btn-small">
                        <i class="fas fa-download"></i> Download
                    </a>
                </div>
            </div>
        `;
        container.appendChild(downloadItem);
    }

    function loadClientFiles(clientId) {
        // Clear previous results
        clientDownloads.innerHTML = '';
        
        // Show loading state
        clientDownloads.innerHTML = '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Loading files...</div>';
        clientFilesSection.style.display = 'block';
        clientAreaTitle.textContent = `Files for Client: ${clientId}`;

        // Simulate checking for client directory
        // In a real implementation, this would be an API call or server-side script
        setTimeout(() => {
            checkClientDirectory(clientId);
        }, 1000);
    }

    function checkClientDirectory(clientId) {
        // This is a client-side approximation
        // In practice, you'll need to manually manage this or use a server-side script
        
        // For demonstration, we'll create some example clients
        const exampleClients = {
            'DEMO001': [
                { name: 'Demo Software v1.0', file: 'software-demo-v1.0.zip', size: '2.3 MB', type: 'software' },
                { name: 'User Manual', file: 'manual-demo.pdf', size: '850 KB', type: 'documentation' }
            ],
            'TEST123': [
                { name: 'Test Application', file: 'test-app.zip', size: '5.1 MB', type: 'software' },
                { name: 'Configuration Guide', file: 'config-guide.pdf', size: '1.2 MB', type: 'documentation' }
            ]
        };

        const clientFiles = exampleClients[clientId.toUpperCase()];
        
        if (clientFiles && clientFiles.length > 0) {
            displayClientFiles(clientFiles, clientId);
        } else {
            displayNoFilesMessage(clientId);
        }
    }

    function displayClientFiles(files, clientId) {
        clientDownloads.innerHTML = '';
        
        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'download-item';
            
            const iconClass = getFileIcon(file.type);
            
            fileItem.innerHTML = `
                <div class="download-icon">
                    <i class="${iconClass}"></i>
                </div>
                <div class="download-info">
                    <h3>${file.name}</h3>
                    <p>Size: ${file.size}</p>
                    <div class="download-links">
                        <a href="downloads/clients/${clientId}/${file.file}" download class="btn btn-small">
                            <i class="fas fa-download"></i> Download
                        </a>
                    </div>
                </div>
            `;
            
            clientDownloads.appendChild(fileItem);
        });

        // Add instructions for password-protected files
        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'client-instructions';
        instructionDiv.innerHTML = `
            <div class="instruction-item">
                <i class="fas fa-lock"></i>
                <p>Files may be password protected. Check your email for access credentials.</p>
            </div>
        `;
        clientDownloads.appendChild(instructionDiv);
    }

    function displayNoFilesMessage(clientId) {
        clientDownloads.innerHTML = `
            <div class="no-files-message">
                <i class="fas fa-folder-open"></i>
                <h3>No files found for Client ID: ${clientId}</h3>
                <p>Please check your Client ID or contact us at <a href="mailto:info@aviolab.ai">info@aviolab.ai</a> for assistance.</p>
            </div>
        `;
    }

    function getFileIcon(type) {
        const icons = {
            'software': 'fas fa-cog',
            'documentation': 'fas fa-file-pdf',
            'update': 'fas fa-sync-alt',
            'tool': 'fas fa-wrench',
            'default': 'fas fa-file'
        };
        return icons[type] || icons.default;
    }
});

// Function to add new client (for admin use)
function addClientExample() {
    // This is a helper function to show how to structure client data
    // In practice, you'll create directories and files manually
    
    console.log('To add a new client:');
    console.log('1. Create directory: downloads/clients/CLIENT_ID/');
    console.log('2. Add files to the directory');
    console.log('3. Update the exampleClients object in checkClientDirectory() function');
    console.log('4. Or implement server-side directory scanning');
}