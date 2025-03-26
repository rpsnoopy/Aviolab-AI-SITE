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
- `js/translations.js` - Multilingual content (auto-generated)
- `assets/` - Images, logos, founder photos, and content files
- `assets/brochures/` - Downloadable PDF brochures in English and Italian
- `assets/images/` - Website imagery (hero, mission, case study)
- `update-translations.js` - Script to generate translations from text files
- `fonts/fontawesome/` - Locally hosted Font Awesome icons (v6.4.0)
- `fonts/montserrat/` and `fonts/open-sans/` - Custom web fonts
- `CLAUDE.md` - Detailed project documentation and version history

## Deployment

This is a static website that can be deployed to any web hosting service:

1. Upload all files to your web hosting
2. No build process is needed
3. Ensure the file structure remains intact
4. Current hosting: Cloudflare Pages

## Version Control

- Current version: v1.1.54
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