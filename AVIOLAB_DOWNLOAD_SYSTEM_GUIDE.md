# 📥 Aviolab AI Download System - Complete Guide

## 🎯 Overview

This document describes the complete download management system for [aviolab.ai](https://aviolab.ai), which uses GitHub as a hosting platform for secure file distribution.

## 🏗️ System Architecture

The download system consists of two main components:

1. **GitHub Repository** (`aviolab-ai-downloads`) - File hosting
2. **Website Integration** (`aviolab.ai/downloads.html`) - User interface

### Why GitHub?
- ✅ **Free & Reliable**: Unlimited bandwidth for public repositories
- ✅ **Direct Links**: Stable URLs that never change
- ✅ **Version Control**: Automatic backup and file history
- ✅ **Security**: Files are password-protected ZIP archives
- ✅ **Global CDN**: Fast downloads worldwide

## 📁 Repository Structure

```
aviolab-ai-downloads/
├── README.md                    # Repository documentation
├── public/                      # Public downloads (everyone)
│   ├── TTR-PROBE.zip           # Technical analysis tool
│   ├── company-brochure.pdf    # Marketing materials
│   └── demo-software.zip       # Trial versions
├── clients/                     # Client-specific files
│   ├── AEN-TTR/                # Client: AEN-TTR
│   │   ├── TTR-PROBE.zip      # Production software
│   │   └── manual.pdf         # Documentation
│   ├── DEMO001/               # Demo client
│   │   ├── demo-app.zip       # Demo application
│   │   └── config.json        # Configuration files
│   └── TEST123/               # Test client
│       ├── test-suite.zip     # Testing tools
│       └── README.txt         # Instructions
└── archive/                   # Old versions (optional)
    └── v1.0/                  # Previous releases
```

## 🔗 Link Generation System

### Public Files
```
https://github.com/rpsnoopy/aviolab-ai-downloads/raw/main/public/[filename]
```

### Client Files
```
https://github.com/rpsnoopy/aviolab-ai-downloads/raw/main/clients/[CLIENT-ID]/[filename]
```

### Examples
- Public tool (GitHub release): `https://github.com/rpsnoopy/aviolab-ai-downloads/releases/download/TTR-SUITE/TTR-PROBE.exe`
- Public doc (public/ dir): `https://github.com/rpsnoopy/aviolab-ai-downloads/raw/main/public/MD-to-DOCX-Converter.exe`
- Client: `https://github.com/rpsnoopy/aviolab-ai-downloads/raw/main/clients/AEN-TTR/TTR-PROBE.zip`

## 🛠️ File Management Workflow

### Adding New Public Files

1. **Upload to GitHub**
   - Navigate to repository: `aviolab-ai-downloads`
   - Go to `public/` folder
   - Click "Add file" → "Upload files"
   - Upload your ZIP file(s)
   - Commit with descriptive message

2. **Update Website Code**
   - Edit `js/downloads.js`
   - Add entry to `additionalPublicFiles` array:
   ```javascript
   {
       name: 'Software Name',
       description: 'Brief description',
       icon: 'fas fa-cog',  // FontAwesome icon
       file: 'https://github.com/rpsnoopy/aviolab-ai-downloads/raw/main/public/filename.zip'
   }
   ```

3. **Commit Changes**
   - Add, commit, and push changes to main site repository

### Adding New Client Files

1. **Create Client Directory** (if new client)
   - Navigate to `clients/` folder in GitHub repo
   - Create new folder with CLIENT-ID name (e.g., `ABC123`)
   - Upload files to this folder

2. **Update Client Database**
   - Edit `js/downloads.js`
   - Add/update entry in `exampleClients` object:
   ```javascript
   'CLIENT-ID': [
       { 
           name: 'Software Name',
           file: 'filename.zip',
           size: '5.2 MB',
           type: 'software'  // or 'documentation', 'update', 'tool'
       }
   ]
   ```

3. **Commit Changes**
   - Save changes to main site repository

## 🎮 Claude AI Assistant Integration

The system is designed to work seamlessly with Claude AI for automated management.

### Supported Commands

| Command | Action | Example |
|---------|--------|---------|
| `Aggiungi [file] per cliente [ID]` | Add client file | "Aggiungi software.zip per cliente ABC123" |
| `Aggiungi [file] nell'area pubblica` | Add public file | "Aggiungi demo.zip nell'area pubblica" |
| `Rimuovi [file] per cliente [ID]` | Remove client file | "Rimuovi old-version.zip per cliente ABC123" |
| `Crea nuovo cliente [ID]` | Create client folder | "Crea nuovo cliente XYZ789" |

### Automated Process
1. **User Request**: "Aggiungi myapp.zip per cliente NEWCO"
2. **Claude Actions**:
   - Creates `clients/NEWCO/` directory structure
   - Updates `js/downloads.js` with client entry
   - Commits changes to main repository
   - Provides GitHub link for file upload
3. **User Action**: Upload `myapp.zip` to specified GitHub location
4. **Result**: File immediately available via download system

## 🔒 Security Implementation

### Password Protection
- **All files MUST be password-protected ZIP archives**
- **Passwords are communicated separately** via secure channels
- **Never store passwords** in repository or website code

### Access Control
- **Public files**: Accessible by anyone with the link
- **Client files**: Require Client ID for discovery
- **Repository**: Public for reliability, security via password protection

### Best Practices
- Use strong, unique passwords for each ZIP file
- Change passwords periodically for sensitive files
- Document password distribution method
- Monitor download statistics if needed

## 💻 Technical Implementation

### Website Integration (`downloads.html`)

The download page dynamically loads files based on:

1. **Public Section**: Automatically displays files from `additionalPublicFiles` array
2. **Client Section**: Shows files based on entered Client ID
3. **Dynamic Loading**: Files appear immediately after updates

### JavaScript Configuration (`js/downloads.js`)

Key components:
- `loadPublicDownloads()`: Displays public files
- `loadClientFiles(clientId)`: Handles client authentication
- `exampleClients`: Client-to-files mapping
- `getFileIcon(type)`: Icon selection based on file type

### File Types and Icons

| Type | Icon | Usage |
|------|------|-------|
| `software` | `fas fa-cog` | Applications, tools |
| `documentation` | `fas fa-file-pdf` | Manuals, guides |
| `update` | `fas fa-sync-alt` | Software updates |
| `tool` | `fas fa-wrench` | Utilities |

## 🚀 Setup Instructions

### Initial Repository Creation

1. **Create GitHub Repository**
   - Name: `aviolab-ai-downloads`
   - Visibility: Public
   - Initialize with README

2. **Upload Initial Structure**
   - Create folders: `public/`, `clients/`
   - Upload existing files from `temp-repo-setup/`
   - Commit initial structure

3. **Update Website**
   - Modify `js/downloads.js` with GitHub links
   - Test download functionality
   - Commit changes to main site

### Testing Checklist

- [ ] Public files load correctly
- [ ] Client ID system works
- [ ] Download links are functional
- [ ] Error messages display properly
- [ ] Mobile compatibility verified
- [ ] Cross-browser testing completed

## 📊 Monitoring and Maintenance

### Regular Tasks
- **Monthly**: Review and clean up old files
- **Quarterly**: Update client access lists
- **As needed**: Add new clients and files

### Troubleshooting Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| File not appearing | Not added to JavaScript | Update `downloads.js` |
| Download fails | Incorrect GitHub link | Check raw URL format |
| Client not found | Missing from client list | Add to `exampleClients` |
| Mobile display issues | CSS responsiveness | Test and adjust styles |

## 📞 Support and Contact

- **Technical Issues**: info@aviolab.ai
- **File Access Problems**: Check Client ID and contact support
- **Password Issues**: Request new password via secure channel

## 📋 Change Log

| Version | Date | Changes |
|---------|------|---------|
| v1.1.60 | 2025-01-06 | Implemented GitHub-based download system |
| v1.1.59 | 2025-01-05 | Added initial download area |
| v1.1.58 | 2025-01-04 | Updated founder role |

## 🔮 Future Enhancements

### Planned Features
- [ ] Download statistics tracking
- [ ] Automated password generation
- [ ] Email notifications for new files
- [ ] Advanced client management interface
- [ ] API for programmatic file management

### Scalability Considerations
- GitHub has file size limits (100MB per file, 1GB per repository)
- For larger files, consider GitHub LFS or alternative hosting
- Monitor bandwidth usage as downloads increase

---

**© 2025 Aviolab AI - Intelligent Document Analysis**

*This system ensures reliable, secure, and scalable file distribution for aviolab.ai users while maintaining simplicity and automation.*