# CLAUDE.md - Project Guide for Aviolab AI Website

## 🚀 Build & Run Commands
- **View Site**: Open `index.html` in browser directly or use `file:///path/to/index.html`
- **Development**: Use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension
- **Testing**: No automated tests; manual cross-browser testing recommended
- **Deployment**: Upload files to web hosting (no build process required)
- **Image Optimization**: Use [TinyPNG](https://tinypng.com/) for image compression
- **Content Updates**: Edit text in `assets/english_texts.txt` and `assets/italian_texts.txt`
- **Translation Updates**: Run `node update-translations.js` after editing text files
- **Contact Form**: Using FormSubmit.co service (action="https://formsubmit.co/ed4f9f2929019cdfc327f3485c8654e4" method="POST")
- **Git Workflow**: After making changes, add with `git add .`, commit with `git commit -m "Your message"` and push with `git push origin main`
- **⚠️ IMPORTANT**: Claude can ONLY help with commits but will NEVER push changes to remote repositories
- **🌐 DEPLOYMENT**: Cloudflare Pages monitora automaticamente il repository GitHub - ogni commit viene deployato automaticamente
- **📊 MONITORING**: Accedi a pages.cloudflare.com per monitorare deploy e risolvere eventuali problemi
- **Current Version**: v1.1.67 - Aggiornata documentazione completa con Cloudflare Pages e sistema download
- **Previous Version**: v1.1.66 - Rimosso Contact e applicato stesso stile rosso Downloads su pagina download
- **Version Numbering**: After every revision, increment the rightmost number of the version string (e.g., v1.1.00 → v1.1.01) both in CLAUDE.md and in the footer of index.html

## 🎨 Code Style Guidelines
- **HTML**: Semantic tags, 4-space indentation, BEM-inspired classes, data-i18n for translations
- **CSS**: CSS variables in :root, mobile-first design, BEM naming (block__element--modifier)
- **JS**: ES6+, camelCase variables, addEventListener pattern, modules for functionality
- **Formatting**: 4-space indents, single quotes, trailing commas, descriptive class names
- **Error Handling**: Form validation with clear user feedback, graceful fallbacks
- **Translations**: data-i18n attributes with translations.js for multilingual support (EN/IT)
- **Branding**: "AVIOLAB" in gray (#c0c0c0), "AI" in red (#ff0000), Verdana font for logo

## 🏗️ Project Structure
- `index.html` - Single page application with smooth scrolling navigation
- `styles.css` - All styling with CSS variables and responsive design
- `script.js` - Core JavaScript (navigation, animations, translations, form handling)
- `js/translations.js` - Multilingual content dictionary (English and Italian)
- `assets/english_texts.txt` - Source content for English translations (key: value format)
- `assets/italian_texts.txt` - Source content for Italian translations (key: value format)
- `assets/` - Images, logos, founder photos, and content files
- `assets/images/` - Website imagery (hero, mission, case study)
- `efforts/` - Additional assets like email signatures (with clickable logo/name links to site), letterheads, and templates
- `fonts/fontawesome/` - Locally hosted Font Awesome icons (v6.4.0)

### Favicon Configuration
- All favicon files are in the root directory:
  - `favicon.ico` - Basic favicon (16x16, 32x32, 48x48)
  - `favicon.svg` - Vector version
  - `favicon-96x96.png` - 96x96 pixel version
  - `apple-touch-icon.png` - For iOS/iPadOS
  - `mstile-*.png` files - For Windows tiles
  - `web-app-manifest-*.png` files - For PWA support
  - `site.webmanifest` - Web app manifest file
- HTML uses relative paths to these files in the root directory
- The previous configuration with subfolders is archived in `OLD_Assets`

## 📝 Development Workflow

### Content Updates (Recommended Method)
1. Edit text in `assets/english_texts.txt` and `assets/italian_texts.txt`
   - Follow the `key: value` format
   - Keys match data-i18n attributes in HTML
   - HTML tags in values are supported (e.g., `<span class="highlight">text</span>`)
   - Lines starting with # or ## are ignored (comments/section headers)
2. Run `node update-translations.js` to regenerate translations.js
3. Test changes with Live Server in both languages
4. Commit changes: `git add assets/english_texts.txt assets/italian_texts.txt js/translations.js`
5. IMPORTANT: Never edit js/translations.js directly - changes will be lost

### Adding New Components/Sections
1. Create HTML structure with appropriate data-i18n attributes
2. Add corresponding style rules in styles.css
3. Add text entries in both language files
4. Update translations.js with `node update-translations.js`
5. Test in both languages
6. Commit all changes

### Structure Updates
- Make HTML/CSS structure changes in respective files
- When adding new content sections:
  1. Add HTML with appropriate data-i18n attributes
  2. Add corresponding entries in both text files
  3. Run update script to regenerate translations
- Ensure responsive design works on all device sizes
- Optimize any new images before committing

### Company Information
- Full Legal Name: AVIOLAB AI DI PARENTI RICCARDO
- Address: Via XXV Aprile 251, IT16031 Pieve Ligure (GE)
- VAT Number: P.IVA 02997110990
- Business Registry: REA GE - 525625

## 📥 Downloads System
- **Downloads Page**: downloads.html - Area download con sezione pubblica e area clienti
- **GitHub Repository**: `aviolab-ai-downloads` - File hosting su GitHub per affidabilità e velocità
- **Link Structure**: 
  - Public: `https://github.com/rpsnoopy/aviolab-ai-downloads/raw/main/public/filename.zip`
  - Client: `https://github.com/rpsnoopy/aviolab-ai-downloads/raw/main/clients/CLIENT-ID/filename.zip`
- **Client Management**: Gestione tramite ID cliente, file ZIP protetti da password
- **Documentation**: Vedi AVIOLAB_DOWNLOAD_SYSTEM_GUIDE.md e DOWNLOAD_MANAGEMENT.md per istruzioni complete
- **Test Clients**: AEN-TTR, TEST123 e DEMO001 configurati per testing
- **Security**: File protetti da password ZIP, credenziali comunicate separatamente

### 🎯 Come Richiedere Nuovi Download
**Comandi per Claude:**
- "Aggiungi [filename.zip] per cliente [CLIENT-ID]"
- "Aggiungi [filename.zip] nell'area pubblica"
- "Crea nuovo cliente [CLIENT-ID]"
- "Rimuovi [filename.zip] per cliente [CLIENT-ID]"

**Operazioni Automatiche di Claude:**
1. **Per file clienti**: Aggiorna `js/downloads.js` nell'array `exampleClients`
2. **Per file pubblici**: Aggiorna `js/downloads.js` nell'array `additionalPublicFiles`
3. **Commit automatico**: Salva modifiche con messaggio descrittivo
4. **Istruzioni GitHub**: Fornisce link esatto dove caricare il file ZIP

### 🔧 Procedura Manuale (se Claude non disponibile)
**1. Per aggiungere file cliente:**
- Modifica `js/downloads.js` → array `exampleClients`
- Aggiungi: `'CLIENT-ID': [{ name: 'Nome File', file: 'filename.zip', size: 'X MB', type: 'software' }]`
- Carica file ZIP su: `https://github.com/rpsnoopy/aviolab-ai-downloads/tree/main/clients/CLIENT-ID/`

**2. Per aggiungere file pubblico:**
- Modifica `js/downloads.js` → array `additionalPublicFiles`
- Aggiungi: `{ name: 'Nome', description: 'Descrizione', icon: 'fas fa-icon', file: 'https://github.com/rpsnoopy/aviolab-ai-downloads/raw/main/public/filename.zip' }`
- Carica file ZIP su: `https://github.com/rpsnoopy/aviolab-ai-downloads/tree/main/public/`

**3. Commit modifiche:**
- `git add js/downloads.js`
- `git commit -m "Add filename.zip for CLIENT-ID"`
- Push → Deploy automatico via Cloudflare Pages

## 🔄 Stato Progetto - Sessione Attuale
- ✅ Area download implementata e funzionante
- ✅ Fix navigazione menu principale per link esterni
- ✅ Sistema client ID configurato e testato
- ✅ Traduzioni EN/IT complete per area download
- ✅ Documentazione gestione sistema creata

## 📋 Prossimi Passi Pianificati
1. **Deploy Produzione**: Caricare file aggiornati sul server web
2. **Primi Clienti**: Configurare ID clienti reali e caricare primi file ZIP
3. **Versioning**: Aggiornare footer con nuova versione v1.1.59
4. **Commit Changes**: Salvare modifiche con git commit
5. **Testing Finale**: Verificare funzionamento completo online
