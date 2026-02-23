# Procedura Aggiornamento TTR-SUITE.zip

## 🔄 Quando l'utente ha una nuova versione di TTR-SUITE

### 1. Richiesta Informazioni
Chiedere all'utente:
- "Qual è il nuovo link della release TTR-SUITE.zip su GitHub?"
- Verificare che il formato sia: `https://github.com/rpsnoopy/aviolab-ai-downloads/releases/download/[TAG]/TTR-SUITE.zip`

### 2. Localizzazione File
```bash
# Cercare il link attuale nel codice
grep -n "TTR-SUITE\.zip" js/downloads.js
```
Il file da modificare è sempre: `js/downloads.js` (linea ~51)

### 3. Aggiornamento Link
```javascript
// Nel file js/downloads.js, nell'array additionalPublicFiles
// Sostituire il link nella sezione TTR-SUITE:
{
    name: 'TTR-SUITE',
    description: 'Complete TTR suite package',
    icon: 'fas fa-box',
    file: 'NUOVO_LINK_QUI'  // <-- Aggiornare questa riga
}
```

### 4. Verifica
- Leggere il file modificato per confermare la modifica
- Verificare che il nuovo link sia corretto e accessibile

### 5. Commit (se richiesto dall'utente)
```bash
git add js/downloads.js
git commit -m "Update TTR-SUITE.zip to new release version"
```

## 📝 Note Importanti
- **File da modificare**: Sempre `js/downloads.js`
- **Posizione**: Array `additionalPublicFiles`, oggetto con `name: 'TTR-SUITE'`
- **Pattern link**: `https://github.com/rpsnoopy/aviolab-ai-downloads/releases/download/[TAG]/TTR-SUITE.zip`
- **Deploy**: Automatico via Cloudflare Pages dopo il commit

## 🎯 Comando Rapido per Claude
Quando l'utente dice "aggiorna TTR-SUITE", seguire questa procedura:
1. Chiedere il nuovo link
2. Usare `grep` per trovare il link attuale
3. Usare `Edit` per sostituire il link
4. Confermare la modifica all'utente