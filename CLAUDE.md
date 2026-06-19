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
- **Current Version**: v1.3.07 - Aggiunta autorisposta automatica al form contatti di `index.html` (FormSubmit.co). Nuovo campo nascosto `_autoresponse` nel form con testo IT di fallback (caso no-JS). In `script.js`, listener `submit` sulla `.contact-form` che imposta il valore di `_autoresponse` nella lingua attiva (`document.documentElement.lang`): testo IT o EN di cortesia ("grazie, abbiamo ricevuto, risponderemo entro un giorno lavorativo, per urgenze +39 335 605 0950 giorni feriali 9-18 CET"). Testo plain-text con `\n` (FormSubmit non supporta HTML nell'autorisposta). Numero urgenze preso dalle firme email aziendali (`efforts/email_signature*.html`). Il form esiste solo in `index.html`; `pa-locale.html`/`ip-legal.html` non hanno form FormSubmit. Bump versione v1.3.07 in tutti i footer HTML.
- **Previous Version**: v1.3.06 - Sostituita la scheda comparativa AGID scaricabile dal sito (`assets/downloads/ttr-suite-pa-scheda-agid.pdf`) con la nuova versione firmata `TTR-SUITE-scheda-comparativa-sintetica - AGID - v.2.02 - signed.pdf` (sorgente `TTR-SUITE-ROOT/MARKET/AGID/`). Nuova dimensione 261 KB (prima 364/356 KB): aggiornati i meta in `pa-locale.html` (`PDF firmato · 261 KB`), `downloads.html` (`Signed PDF (261 KB)`), e le chiavi `pa_scheda_agid_desc` EN/IT in `assets/english_texts.txt`, `assets/italian_texts.txt` e `js/translations.js` (edit diretto per non perdere le `ipl2_*`). Bump version a v1.3.06 nei footer di tutte le pagine HTML.
- **Previous Version**: v1.3.05 - In `pa-locale.html`, sezione "Conformità AI Act e GDPR by design": aggiornata la riga sulle Linee Guida AgID per riflettere lo stato reale dell'iter normativo. Da "allineata alle Linee Guida AgID sui sistemi di IA nella PA (Det. 43/2026)" a "allineata alle bozze di Linee Guida AgID per lo sviluppo e il procurement di IA nella PA (adottate con Det. 43/2026, consultazione pubblica conclusa l'11 aprile 2026, iter di adozione in corso)". Occorrenza unica; nessuna versione EN (pagina IT-only).
- **Previous Version**: v1.3.04 - Hero di `pa-locale.html` semplificato: rimosso il bottone "Brochure (PDF)" (la brochure resta scaricabile dalla sezione "Documentazione e certificazioni" più in basso) lasciando due CTA, "Veda TTR-SUITE in azione" (primario, rosso) e "Documentazione AGID, GDPR, AI Act" (secondario, anchor a `#documentazione`). Nessuna altra modifica strutturale.
- **Previous Version**: v1.3.03 - Nuova pagina di approfondimento visuale `pa-locale-in-azione.html`: galleria narrativa in 4 step (il quesito + analisi sulla refezione scolastica, la verifica indipendente ex art. 120 co. 11 D.Lgs. 36/2023, la bozza di Determinazione, il fascicolo digitale SInCRO con i 2 dialog di configurazione+pratica) costruita dal materiale di `TTR-SUITE-ROOT/MARKET/TTR_SUITE_Brochure_Sindaci_4P_FINAL_fixed.pptx`. Estratti 6 screenshot reali della suite e ottimizzati con PIL in WebP qualità 85-88 + JPEG/PNG fallback in `assets/images/pa-locale/` (~750 KB serviti su browser moderni con WebP, ~1.9 MB con fallback). In `pa-locale.html`: aggiunto il diagramma di flow "Come funziona TTR-SUITE" (image7 originale, 1535×610) inline subito dopo il blocco "Dalla domanda alla firma" con `<picture>` WebP+PNG fallback, aggiunto bottone primario "Veda TTR-SUITE in azione" nell'hero CTA (prima di Brochure e Documentazione) e nel blocco CTA finale. **Fix collaterale**: il footer di `pa-locale.html` era troncato dal commit v1.3.02 (mancavano `footer-links`, `footer-social`, `footer-bottom`, `</footer>`, `</body>`, `</html>`) — ricostruito con stessa struttura di `ip-legal.html` ma testi italiani. Footer della nuova pagina include `pa-locale-in-azione.html` tra le Soluzioni. Bump version a v1.3.03 anche nei footer di `index.html`, `ip-legal.html`, `downloads.html`. Nuovo CSS isolato `ia-*` (BEM-like) dentro la nuova pagina, in linea con la convenzione di `pa-locale.html` (CSS landing-specific inline).
- **Earlier**: v1.3.02 - Pubblicazione del set di compliance AI Act + GDPR di TTR-SUITE Enterprise Edition v6.1 (4 PDF firmati: Classificazione del Rischio AI Act, Informativa Trasparenza AI Act, DPA Zero Data Retention GDPR, Scheda Tecnica). Sorgenti rielaborati come edizione generica Enterprise in `TTR-SUITE-ROOT/MARKET/CERTIFICAZIONI_AI_ACT_GDPR_v6.1/` (rimosso ogni riferimento al cliente Ansaldo e al distributore Erre Quadro, schema ruoli ora bipartito Produttore Aviolab AI / Cliente-Titolare). Estesa sezione "Documentazione e certificazioni" di `pa-locale.html` (ora con id `#documentazione`) con 4 doc-card nuove sotto AGID + brochure PA. Hero pa-locale: button "Scheda AGID" sostituito con anchor `#documentazione` e testo "Documentazione AGID, GDPR, AI Act". Nuova sezione bilingue "Documentation & certifications" / "Documentazione e certificazioni" in `ip-legal.html` (id `#documentation`) con CSS isolato (`ipl-docs-grid` / `ipl-doc-card`) prima della CTA; in cima alla grid una doc-card con Brochure aziendale Aviolab EN+IT, poi i 4 PDF compliance. Hero ip-legal: i 2 button "Get in touch"/"Explore capabilities" sostituiti con [Brochure (PDF), linka company overview EN] + [Documentation: GDPR, AI Act, anchor `#documentation`]. Aggiunte 6 voci nella categoria Documentation di `downloads.html` (brochure PA + scheda AGID + 4 compliance). Nuove chiavi `ipl2_doc_*` e `ipl2_hero_cta_brochure`/`_docs` aggiunte direttamente a `js/translations.js` (no rigenerazione via update-translations.js per non perdere le ipl2_*); analogamente `download_*` nuove. Cache buster translations.js `?v=132`.
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
- `pa-locale.html` - **NEW (v1.2.00)** Dedicated landing for TTR-SUITE per la PA Locale. Italian-only (target Italian municipalities), formal "Lei" address. Pain killer, 16+1 agents, AI Act + GDPR compliance, patent trust block, no competitor names. **v1.3.03**: inline flow diagram (image7 from brochure) after the guided-path section, hero+final CTA "Veda TTR-SUITE in azione" linking to the new gallery page
- `pa-locale-in-azione.html` - **NEW (v1.3.03)** Deep-dive visual gallery of TTR-SUITE for the PA Locale. Italian-only, narrative in 4 steps based on the 4-page brochure PPTX: §1 quesito + analysis (refezione scolastica case, screenshot-sessione), §2 independent verification (screenshot-verifica), §3 draft act (screenshot-atto, Determinazione del Responsabile del Servizio), §4 SInCRO digital file (dialog-fascicolo-config + dialog-fascicolo-pratica). Isolated CSS `ia-*` (BEM-like), sticky mini-TOC, stats cards, honesty disclaimer
- `ip-legal.html` - **NEW (v1.2.00)** Dedicated landing for TTR-SUITE IP Legal (EN/IT). Inherits the 6 IP solution cards and the Fortune 500 case study previously on index.html
- `downloads.html` - Downloads area (public + client area, GitHub-hosted ZIPs)
- `styles.css` - All styling with CSS variables and responsive design. Landing-specific CSS lives inline in `pa-locale.html`, `pa-locale-in-azione.html` and `ip-legal.html` for isolation
- `script.js` - Core JavaScript (navigation, animations, translations, form handling)
- `js/translations.js` - Multilingual content dictionary (English and Italian) — auto-generated
- `assets/english_texts.txt` - Source content for English translations (key: value format)
- `assets/italian_texts.txt` - Source content for Italian translations (key: value format)
- `assets/` - Images, logos, founder photos, and content files
- `assets/images/` - Website imagery (hero, mission, case study, **ttr-suite-pa-infografica.png**)
- `assets/images/pa-locale/` - **NEW (v1.3.03)** Brochure-derived imagery for `pa-locale.html` and `pa-locale-in-azione.html`. Source: `TTR-SUITE-ROOT/MARKET/TTR_SUITE_Brochure_Sindaci_4P_FINAL_fixed.pptx`. Files: `diagram-come-funziona.{webp,png}` (flow diagram, 1535×610), `screenshot-sessione.{webp,jpg}`, `screenshot-verifica.{webp,jpg}`, `screenshot-atto.{webp,jpg}` (UI screenshots resized to 2400px wide), `dialog-fascicolo-config.png`, `dialog-fascicolo-pratica.png` (small dialogs, kept as PNG). Total ~1.9 MB with fallbacks, ~750 KB served on modern browsers (WebP). Re-optimize via PIL/PNG/WebP if updating sources
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

### ⚠️ ATTENZIONE — chiavi `ipl2_*` non sono nei `.txt` sources
Le 177 chiavi `ipl2_*` della pagina `ip-legal.html` vivono **solo in `js/translations.js`** (blocco `it`) e come testo inline EN nel HTML — NON sono nei file `assets/english_texts.txt` / `assets/italian_texts.txt`. Eseguire `node update-translations.js` **SOVRASCRIVE** `translations.js` rigenerandolo dai sorgenti `.txt`, e quindi **cancella tutte le chiavi `ipl2_*`**. Prima di rieseguire lo script, o migrare le `ipl2_*` IT nei `.txt` sources (e quelle EN equivalenti estraendole dall'HTML inline), oppure modificare `update-translations.js` per fare merge invece di overwrite. In alternativa, per aggiornare le `ipl2_*` editare direttamente `js/translations.js` (come avvenuto in v1.3.01).

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
