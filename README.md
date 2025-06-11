# Aviolab AI Website

Modern, responsive website for Aviolab AI, a company specializing in AI-powered legal document analysis.

## About the Project

This is a simple, elegant one-page website for Aviolab AI built with HTML, CSS, and JavaScript. The site features responsive design, multilingual support (English and Italian), and a smooth scrolling experience. It showcases the company's AI-powered document analysis solutions.

## Features

- Single-page design with smooth scrolling navigation
- Mobile-first, responsive layout
- Bilingual support (English and Italian)
- Modern design with CSS animations and full-background imagery
- Enhanced UI elements including testimonial boxes and benefit cards
- Interactive elements and contact form
- Comprehensive download system with public and client areas
- GitHub-hosted file distribution with password-protected ZIP files
- Downloadable company brochures in PDF format
- Language-specific content delivery

## Tech Stack

- HTML5
- CSS3 with custom variables
- Vanilla JavaScript
- Font Awesome icons (locally hosted)
- Custom webfonts (Montserrat and Open Sans)

## Getting Started

### Prerequisites

- No build process required
- Can be viewed directly in a browser
- For local development, [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code is recommended

### Installation

1. Clone the repository
2. Open the project in your code editor
3. If using VS Code with Live Server, right-click on index.html and select "Open with Live Server"

## Content Management

The website content is managed through text files that allow for easy updates without diving into HTML code:

1. **Edit Content:**
   - English content: `assets/english_texts.txt`
   - Italian content: `assets/italian_texts.txt`

2. **Update Translations:**
   - After editing the text files, run:
   ```
   node update-translations.js
   ```
   - This will regenerate the `js/translations.js` file with your updated content

3. **Test Changes:**
   - Refresh the page in your browser to see the updated content
   - Test in both English and Italian language modes

## Project Structure

- `index.html` - Main HTML structure
- `styles.css` - All styling with CSS variables
- `script.js` - Core JavaScript functionality
- `downloads.html` - Download page with public and client file access
- `js/downloads.js` - Download system functionality and file management
- `js/translations.js` - Multilingual content (auto-generated)
- `assets/` - Images, logos, founder photos, and content files
- `assets/brochures/` - Downloadable PDF brochures in English and Italian
- `assets/images/` - Website imagery (hero, mission, case study)
- `update-translations.js` - Script to generate translations from text files
- `fonts/fontawesome/` - Locally hosted Font Awesome icons (v6.4.0)
- `fonts/montserrat/` and `fonts/open-sans/` - Custom web fonts
- `CLAUDE.md` - Detailed project documentation and version history

## Deployment

This website uses **Cloudflare Pages** for automatic deployment:

1. **Automatic Deployment**: Every commit to the main branch triggers automatic deployment
2. **Monitoring**: Visit [pages.cloudflare.com](https://pages.cloudflare.com) to monitor deployments and resolve issues
3. **No Build Process**: Static files are deployed directly
4. **File Structure**: Ensure file structure remains intact for proper deployment

### Deployment Workflow
1. Make changes locally
2. Commit with `git add .` and `git commit -m "message"`
3. Push with `git push origin main`
4. Cloudflare Pages automatically deploys within minutes
5. Monitor deployment status on Cloudflare dashboard

## Download System Management

### Adding New Downloads (via Claude AI)

Use these simple commands with Claude:
- `"Aggiungi [filename.zip] per cliente [CLIENT-ID]"` - Add client-specific file
- `"Aggiungi [filename.zip] nell'area pubblica"` - Add public file
- `"Crea nuovo cliente [CLIENT-ID]"` - Create new client
- `"Rimuovi [filename.zip] per cliente [CLIENT-ID]"` - Remove client file

### What Claude Does Automatically
1. Updates `js/downloads.js` with new file entries
2. Commits changes with descriptive message
3. Provides GitHub link where to upload the ZIP file
4. Ensures proper file structure and security

### Manual Process (if Claude unavailable)
1. **For Client Files:**
   - Edit `js/downloads.js` → `exampleClients` array
   - Add: `'CLIENT-ID': [{ name: 'File Name', file: 'filename.zip', size: 'X MB', type: 'software' }]`
   - Upload ZIP to: `https://github.com/rpsnoopy/aviolab-ai-downloads/tree/main/clients/CLIENT-ID/`

2. **For Public Files:**
   - Edit `js/downloads.js` → `additionalPublicFiles` array
   - Add: `{ name: 'Name', description: 'Description', icon: 'fas fa-icon', file: 'https://github.com/rpsnoopy/aviolab-ai-downloads/raw/main/public/filename.zip' }`
   - Upload ZIP to: `https://github.com/rpsnoopy/aviolab-ai-downloads/tree/main/public/`

3. **Commit:** `git add js/downloads.js && git commit -m "Add filename.zip" && git push`

**Security:** All files must be password-protected ZIP archives. Passwords are communicated separately.

## Version Control

- Current version: v1.1.66
- See `CLAUDE.md` for detailed version history and change log
- Each feature implementation or bug fix receives a version bump (v1.1.xx format)

## Contributing

For guidelines on contributing to this project, please refer to the `CLAUDE.md` file, which contains:
- Build and run commands
- Code style guidelines
- Project structure details
- Development workflow instructions
- Company information

## Contact

Riccardo Parenti - info@aviolab.ai

Website: [Aviolab AI](https://www.aviolab.ai)