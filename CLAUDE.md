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
- **⚠️ IMPORTANT**: Claude can commit autonomously, but pushes to remote require an explicit user request in the same conversation ("fai push", "push", "pusha", etc.). Without that explicit request, never push.
- **🌐 DEPLOYMENT**: Cloudflare Pages monitora automaticamente il repository GitHub - ogni commit viene deployato automaticamente
- **📊 MONITORING**: Accedi a pages.cloudflare.com per monitorare deploy e risolvere eventuali problemi
- **Current Version**: v1.3.00 - Refactor architetturale di `ip-legal.html`: nuova pagina con 9 sezioni allineate alla realtà del prodotto (architettura 9+2 agenti, 7 aree presidiate + 6 modalità operative trasversali con schema visivo pa-locale, 4 capability card con bullet+proof, deliverable ricostruiti per casi d'uso reali, sezione "Built for production legal work" con L1-L5/no-hallucination/scoring/confidence). Vecchia ip-legal.html spostata a `ip-legal-v1-backup.html`. Eliminati riferimenti AEN. Traduzioni IT complete in registro Lei + congiuntivi.
- **Previous Version**: v1.2.05 - Aggiunto `text-wrap: balance` alla mission-quote (`.mission-quote`) per distribuire più armoniosamente le righe del citato su più larghezze di viewport.
- **Version Numbering**: After every revision, increment the rightmost number of the version string (e.g., v1.1.00 → v1.1.01) both in CLAUDE.md and in the footer of index.html. Architectural changes warrant minor bumps (e.g., v1.1.x → v1.2.00).
- **⚠️ NEXT REPO**: lavoro di riassetto dual-product effettuato nel repo separato `Aviolab-AI-SITE-NEXT` (clone locale, no remote) per non disturbare il sito di produzione che gestisce licenze e autorizzazioni realtime sulle suite. Le dir critiche `/version` e `/lic` non sono state modificate.

## 🎨 Code Style Guidelines
- **HTML**: Semantic tags, 4-space indentation, BEM-inspired classes, data-i18n for translations
- **CSS**: CSS variables in :root, mobile-first design, BEM naming (block__element--modifier)
- **JS**: ES6+, camelCase variables, addEventListener pattern, modules for functionality
- **Formatting**: 4-space indents, single quotes, trailing commas, descriptive class names
- **Error Handling**: Form validation with clear user feedback, graceful fallbacks
- **Translations**: data-i18n attributes with translations.js for multilingual support (EN/IT)
- **Branding**: "AVIOLAB" in gray (#c0c0c0), "AI" in red (#ff0000), Verdana font for logo

## 🏗️ Project Structure
- `index.html` - Umbrella home: Aviolab AI as a two-product company (EN/IT). Hero + Mission + 2 large product cards linking to the dedicated landings + Benefits + About + Contact
- `pa-locale.html` - **NEW (v1.2.00)** Dedicated landing for TTR-SUITE per la PA Locale. Italian-only (target Italian municipalities), formal "Lei" address. Pain killer, 16+1 agents, AI Act + GDPR compliance, patent trust block, no competitor names
- `ip-legal.html` - **NEW (v1.2.00)** Dedicated landing for TTR-SUITE IP Legal (EN/IT). Inherits the 6 IP solution cards and the Fortune 500 case study previously on index.html
- `downloads.html` - Downloads area (public + client area, GitHub-hosted ZIPs)
- `styles.css` - All styling with CSS variables and responsive design. Landing-specific CSS lives inline in `pa-locale.html` and `ip-legal.html` for isolation
- `script.js` - Core JavaScript (navigation, animations, translations, form handling)
- `js/translations.js` - Multilingual content dictionary (English and Italian) — auto-generated
- `assets/english_texts.txt` - Source content for English translations (key: value format)
- `assets/italian_texts.txt` - Source content for Italian translations (key: value format)
- `assets/` - Images, logos, founder photos, and content files
- `assets/images/` - Website imagery (hero, mission, case study, **ttr-suite-pa-infografica.png**)
- `assets/downloads/` - **NEW (v1.2.00)** PDF/asset downloads served directly from the site (vs the GitHub-hosted client/public ZIPs). Contains `ttr-suite-pa-brochure.pdf`
- `efforts/` - Additional assets like email signatures (with clickable logo/name links to site), letterheads, and templates
- `fonts/fontawesome/` - Locally hosted Font Awesome icons (v6.4.0)
- `version/` - **⚠️ PRODUCTION CRITICAL** — used by the TTR-SUITE clients for version checks. Do not modify in development branches.
- `lic/` - **⚠️ PRODUCTION CRITICAL** — used by the TTR-SUITE clients for license validation (realtime). Do not modify in development branches.

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
1. **Per file pubblici**:
   - Aggiunge traduzioni in `assets/english_texts.txt` e `assets/italian_texts.txt`
   - Esegue `node update-translations.js` per rigenerare translations.js
   - Aggiorna `js/downloads.js` nell'array `additionalPublicFiles` usando sistema traduzioni
2. **Per file clienti**: Aggiorna `js/downloads.js` nell'array `exampleClients`
3. **Commit automatico**: Salva modifiche con messaggio descrittivo
4. **Istruzioni GitHub**: Fornisce link esatto dove caricare il file ZIP

### 🔧 Procedura Manuale (se Claude non disponibile)
**1. Per aggiungere file cliente:**
- Modifica `js/downloads.js` → array `exampleClients`
- Aggiungi: `'CLIENT-ID': [{ name: 'Nome File', file: 'filename.zip', size: 'X MB', type: 'software' }]`
- Carica file ZIP su: `https://github.com/rpsnoopy/aviolab-ai-downloads/tree/main/clients/CLIENT-ID/`

**2. Per aggiungere file pubblico:**
- ⚠️ **IMPORTANTE**: Prima aggiungere traduzioni in `assets/english_texts.txt` e `assets/italian_texts.txt`
- Aggiungere chiave tipo: `nuovo_file_desc: Descrizione in inglese` / `nuovo_file_desc: Descrizione in italiano`
- Eseguire `node update-translations.js` per rigenerare translations.js
- Modifica `js/downloads.js` → array `additionalPublicFiles`
- Usare sistema traduzioni: `description: translations[currentLanguage]?.nuovo_file_desc || 'Descrizione fallback'`
- Carica file ZIP su: `https://github.com/rpsnoopy/aviolab-ai-downloads/tree/main/public/`

**3. Commit modifiche:**
- `git add assets/english_texts.txt assets/italian_texts.txt js/translations.js js/downloads.js`
- `git commit -m "Add filename.zip for CLIENT-ID"`
- Push → Deploy automatico via Cloudflare Pages

## 🔄 Stato Progetto - Sessione Attuale (v1.2.00, repo NEXT)
- ✅ Repo `Aviolab-AI-SITE-NEXT` clonato da Aviolab-AI-SITE (locale, no remote, isolato dalla produzione)
- ✅ Nuova landing `pa-locale.html` per TTR-SUITE per la PA Locale (IT-only, forma di cortesia)
- ✅ Pain killer in evidenza (il dubbio del funzionario), 16+1 agenti, brevetto UIBM 102026000013123 del 08/05/2026
- ✅ Sezione conformità AI Act art. 50 + GDPR + AgID Determinazione 43/2026
- ✅ Nuova landing `ip-legal.html` (EN/IT) con i 6 IP solution card e il case study Fortune 500
- ✅ `index.html` riscritta come home ombrello con 2 product card grandi
- ✅ Traduzioni EN/IT estese (~30 chiavi nuove) e `js/translations.js` rigenerato
- ✅ Versione 1.2.00 applicata a tutti i footer (index, pa-locale, ip-legal, downloads)

## 📋 Prossimi Passi Pianificati
1. **Review utente** del lavoro nel repo NEXT (apertura locale nel browser, verifica testi e visual)
2. **Iterazioni di rifinitura** sulle landing (testi, visual, copy)
3. **Decisione produzione**: quando il sito NEXT è pronto, trasferire i file modificati nel repo di produzione `Aviolab-AI-SITE` preservando `version/` e `lic/`
4. **Pubblicazione**: commit nel repo di produzione + auto-deploy Cloudflare Pages
5. **Verifiche post-deploy**: licensing TTR-SUITE clients continua a funzionare, traduzioni caricate correttamente, link cross-product corretti
