# Download Management System

## 🔗 GitHub Repository
**Repository**: `aviolab-ai-downloads`  
**URL**: https://github.com/rpsnoopy/aviolab-ai-downloads

## 📁 Structure
```
aviolab-ai-downloads/
├── public/              # Public downloads
│   └── TTR-PROBE.zip
├── clients/            # Client-specific files
│   ├── AEN-TTR/
│   ├── TEST123/
│   └── DEMO001/
└── README.md
```

## 🛠️ Adding New Files

### For Public Downloads
1. Upload file to `public/` folder in GitHub repo
2. Add file entry in `js/downloads.js`:
```javascript
{
    name: 'File Name',
    description: 'File description',
    icon: 'fas fa-icon-name',
    file: 'https://github.com/rpsnoopy/aviolab-ai-downloads/raw/main/public/filename.zip'
}
```

### For Client Downloads
1. Upload file to `clients/CLIENT-ID/` folder in GitHub repo
2. Add client entry in `js/downloads.js` in `exampleClients`:
```javascript
'CLIENT-ID': [
    { name: 'File Name', file: 'filename.zip', size: 'X MB', type: 'software' }
]
```

## 🔗 Link Format
- **Public**: `https://github.com/rpsnoopy/aviolab-ai-downloads/raw/main/public/filename.zip`
- **Client**: `https://github.com/rpsnoopy/aviolab-ai-downloads/raw/main/clients/CLIENT-ID/filename.zip`

## 🎯 Quick Commands for Claude
- "Aggiungi file.zip per cliente XYZ"
- "Aggiungi file.zip nell'area pubblica"
- "Rimuovi file per cliente XYZ"

## 🔄 Workflow
1. Request file addition
2. Claude updates GitHub repo structure
3. Claude updates `js/downloads.js`
4. Claude commits changes to main site
5. Files immediately available via download system

## 🔒 Security Notes
- All files should be password-protected ZIP files
- Passwords communicated separately via secure channels
- Public repository is safe due to password protection

## 📞 Support
Technical issues: info@aviolab.ai