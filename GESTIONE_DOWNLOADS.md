# Gestione Area Download

## 📁 Struttura Directory

```
downloads/
├── public/           # File pubblici per tutti
├── clients/          # Cartelle per singoli clienti
│   ├── CLIENTE001/   # ID univoco cliente
│   ├── CLIENTE002/   # Altro cliente
│   └── ...
```

## 🔧 Come Aggiungere un Nuovo Cliente

### 1. Crea la cartella del cliente
```bash
mkdir downloads/clients/NUOVO_ID_CLIENTE
```

**Esempi di ID cliente:**
- `CLIENTE001`, `CLIENTE002` (numerici)
- `AZIENDA-XYZ`, `COMPANY-ABC` (nome azienda)
- `PROGETTO-ALFA` (nome progetto)

### 2. Carica i file del cliente
Copia i file ZIP (protetti da password) nella cartella:
```bash
cp software-cliente.zip downloads/clients/NUOVO_ID_CLIENTE/
cp documentazione.pdf downloads/clients/NUOVO_ID_CLIENTE/
```

### 3. Aggiorna il codice JavaScript (OPZIONALE)
Per mostrare automaticamente i file, modifica `js/downloads.js`:

Trova la sezione `exampleClients` e aggiungi:
```javascript
'NUOVO_ID_CLIENTE': [
    { 
        name: 'Nome Software', 
        file: 'software-cliente.zip', 
        size: '5.2 MB', 
        type: 'software' 
    },
    { 
        name: 'Documentazione', 
        file: 'documentazione.pdf', 
        size: '1.1 MB', 
        type: 'documentation' 
    }
]
```

### 4. Comunica le credenziali al cliente
Invia al cliente:
- **ID Cliente**: `NUOVO_ID_CLIENTE`
- **Password ZIP**: (se i file sono protetti)
- **URL**: `https://www.aviolab.ai/downloads.html`

## 📋 Istruzioni per il Cliente

Il cliente dovrà:
1. Andare su `downloads.html`
2. Inserire il suo ID Cliente nel campo apposito
3. Cliccare "Accedi ai File"
4. Scaricare i file necessari
5. Usare la password comunicata per estrarre i ZIP

## 🔒 Sicurezza

- **File ZIP**: Proteggi sempre con password i file sensibili
- **Password**: Comunica le password separatamente (email, telefono)
- **ID Cliente**: Usa ID non facilmente indovinabili
- **Scadenza**: Considera di rimuovere file vecchi periodicamente

## 🗂️ Tipi di File Supportati

Il sistema riconosce automaticamente questi tipi:
- `software` - Applicazioni e tool → Icona ingranaggio
- `documentation` - PDF e manuali → Icona documento  
- `update` - Aggiornamenti → Icona sync
- `tool` - Utility → Icona chiave inglese
- `default` - Altri file → Icona file generica

## 🚀 File Pubblici

Per aggiungere file pubblici (accessibili a tutti):
1. Carica in `downloads/public/`
2. Modifica `js/downloads.js` nella sezione `additionalPublicFiles`

Esempio:
```javascript
{
    name: 'Demo Software',
    description: 'Prova il nostro software con dati di esempio',
    icon: 'fas fa-download',
    file: 'downloads/public/demo.zip'
}
```

## 📝 Note Tecniche

- Il sistema è **completamente statico** (no database)
- I file sono serviti direttamente dal web server
- La lista clienti è gestita via JavaScript
- Tutto funziona senza backend aggiuntivo

## 🔄 Manutenzione

### Controllo spazio
```bash
du -sh downloads/
```

### Backup cartelle clienti
```bash
tar -czf backup-clients-$(date +%Y%m%d).tar.gz downloads/clients/
```

### Pulizia file vecchi
Rimuovi cartelle clienti inattive dopo il progetto completato.