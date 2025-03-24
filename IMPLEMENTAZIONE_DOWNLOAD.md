# Implementazione Sistema Download su Cloudflare Pages

Questo documento descrive in dettaglio tutte le azioni necessarie per implementare e rendere operativo il sistema di download sul sito Aviolab AI ospitato su Cloudflare Pages.

## 📋 Panoramica dell'Implementazione

Il sistema di download sviluppato prevede:
- Autenticazione utenti via email con codice OTP (One-Time Password)
- Area riservata per scambio file (upload/download)
- Tracciamento file con metadati (data, dimensione, checksum SHA-256)
- Interfaccia multilingue integrata con il sistema di traduzioni esistente

## 1️⃣ Pubblicazione dei file frontend

### File da pubblicare
- `download.html` - Pagina principale area download
- `download-styles.css` - Stili CSS specifici
- `download.js` - Logica frontend JavaScript
- Modifiche a `index.html` - Link alla pagina download
- Modifiche a `js/translations.js` - Traduzioni aggiornate

### Passaggi per la pubblicazione
1. Aggiungi i file al repository Git:
   ```bash
   git add download.html download-styles.css download.js assets/english_texts.txt assets/italian_texts.txt index.html js/translations.js
   ```

2. Crea un commit:
   ```bash
   git commit -m "Aggiunta area download con autenticazione via email"
   ```

3. Pubblica su GitHub:
   ```bash
   git push origin main
   ```

4. Cloudflare Pages si aggiornerà automaticamente (se configurato per il deployment automatico)

## 2️⃣ Implementazione backend

Attualmente il sistema è una demo che funziona solo lato client. Per renderlo operativo su Cloudflare, sono necessari i seguenti componenti backend:

### A. Database utenti autorizzati

**Opzione 1: Cloudflare D1 (SQL database)**
- Creazione tabella utenti con campi:
  - `email` (chiave primaria)
  - `nome`
  - `creato_il`
  - `ultimo_accesso`
  - `stato` (attivo/inattivo)

**Opzione 2: Cloudflare KV (Key-Value store)**
- Creazione namespace `authorized_users`
- Chiavi: indirizzi email
- Valori: oggetti JSON con informazioni utente

### B. Sistema di verifica email (Cloudflare Workers)

Creare Worker `email-verification` con queste funzionalità:
1. Generazione codice OTP (6 cifre)
2. Memorizzazione temporanea del codice (scadenza 5 minuti)
3. Invio email con il codice tramite:
   - **Opzione 1**: Cloudflare Email Routing
   - **Opzione 2**: Servizio esterno (SendGrid, Mailgun, ecc.)
   - **Opzione 3**: Mailchannels (gratuito con Cloudflare Workers)

```javascript
// Esempio di Workers per la verifica email
export default {
  async fetch(request) {
    // Logica per gestire la richiesta e generare codice
  },
  async email(message, env, ctx) {
    // Logica per l'invio email
  }
};
```

### C. Sistema di gestione file (Cloudflare Workers + R2)

1. **Setup Cloudflare R2**:
   - Creare bucket `aviolab-download-files`
   - Configurare policy di accesso appropriata

2. **Creazione Worker `file-management`**:
   - Endpoint per upload file
   - Endpoint per download file
   - Endpoint per elenco file
   - Endpoint per eliminazione file
   - Calcolo SHA-256 per ogni file caricato

3. **Metadata dei file**:
   - Salvare metadati in R2 o in D1/KV:
     - Nome file originale
     - Dimensione
     - Checksum SHA-256
     - Data caricamento
     - Utente che ha caricato
     - Flags (pubblico/privato, scadenza, ecc.)

### D. API di autenticazione

Creazione Worker `auth-api` con i seguenti endpoint:
- `POST /api/auth/request-code`: Richiede codice di verifica
- `POST /api/auth/verify-code`: Verifica il codice e rilascia token JWT
- `GET /api/auth/verify`: Verifica token JWT
- `POST /api/auth/logout`: Revoca token JWT

```javascript
// Esempio di schema per API di autenticazione
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    if (path === '/api/auth/request-code' && request.method === 'POST') {
      return handleRequestCode(request, env);
    }
    
    if (path === '/api/auth/verify-code' && request.method === 'POST') {
      return handleVerifyCode(request, env);
    }
    
    // Altri endpoint...
    
    return new Response('Not found', { status: 404 });
  }
};
```

## 3️⃣ Modifiche al frontend

Per collegare il frontend al backend, saranno necessarie le seguenti modifiche a `download.js`:

### Autenticazione

```javascript
// Sostituire il mock del sistema di verifica
async function requestVerificationCode() {
    const email = emailInput.value.trim();
    
    try {
        const response = await fetch('/api/auth/request-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            showMessage(emailMessage, data.message, 'error');
            return;
        }
        
        // Aggiornare UI
        emailStep.classList.remove('active');
        codeStep.classList.add('active');
        displayEmail.textContent = email;
        codeInput.value = '';
        
        // Avviare timer
        startCodeTimer();
        
    } catch (error) {
        showMessage(emailMessage, 'Errore di connessione', 'error');
        console.error(error);
    }
}
```

### Gestione File

```javascript
// Sostituire il mock di upload file
async function uploadFiles() {
    const files = fileUpload.files;
    
    if (files.length === 0) {
        alert(translations[currentLanguage].no_files_selected);
        return;
    }
    
    const uploadPromises = Array.from(files).map(file => {
        const formData = new FormData();
        formData.append('file', file);
        
        return fetch('/api/files/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        }).then(response => response.json());
    });
    
    try {
        const results = await Promise.all(uploadPromises);
        
        // Resettare input
        fileUpload.value = '';
        document.querySelector('.file-input-label span').textContent = 
            translations[currentLanguage].upload_files;
        
        // Aggiornare lista file
        await fetchFiles();
        
        alert(translations[currentLanguage].files_uploaded);
        
    } catch (error) {
        alert('Errore durante il caricamento');
        console.error(error);
    }
}
```

## 4️⃣ Configurazione di sicurezza

### A. CORS e CSP

Configurare le intestazioni di sicurezza appropriate:

```javascript
// In Workers per API
const corsHeaders = {
    "Access-Control-Allow-Origin": "https://aviolab.ai",
    "Access-Control-Allow-Methods": "GET, POST, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
```

### B. Rate Limiting

Implementare rate limiting per prevenire abusi:

```javascript
// Esempio con Cloudflare Workers
async function handleRequestCode(request, env) {
    const client = request.headers.get("CF-Connecting-IP");
    const { email } = await request.json();
    
    // Rate limiting usando Cloudflare KV per contare le richieste
    const rateLimitKey = `ratelimit:${client}:${Date.now() / 1000 / 60 | 0}`;
    const currentCount = await env.KV.get(rateLimitKey) || 0;
    
    if (currentCount > 5) {
        return new Response(JSON.stringify({
            success: false,
            message: "Troppe richieste, riprova tra qualche minuto"
        }), {
            status: 429,
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders
            }
        });
    }
    
    // Incrementa contatore
    await env.KV.put(rateLimitKey, currentCount + 1, { expirationTtl: 60 });
    
    // Resto della logica...
}
```

### C. Validazione e sanitizzazione input

Implementare validazione e sanitizzazione di tutti gli input utente.

## 5️⃣ Test e monitoraggio

### Piano di test

1. **Test di autenticazione**:
   - Email valide e non valide
   - Tentativi ripetuti con codice errato
   - Scadenza codice
   - Persistenza sessione

2. **Test di gestione file**:
   - Upload di diversi tipi e dimensioni di file
   - Funzionalità di download
   - Verifica del calcolo SHA-256
   - Eliminazione file

3. **Test di sicurezza**:
   - Autenticazione bypass
   - Accesso a file non autorizzati
   - CSRF e XSS
   - Rate limiting

### Monitoraggio

Configurare il monitoraggio continuo su Cloudflare:
- Metriche di utilizzo (Cloudflare Analytics)
- Logging errori (Cloudflare Logs)
- Avvisi per pattern sospetti

## 6️⃣ Cronoprogramma implementazione

1. **Fase 1: Setup infrastructure** (1-3 giorni)
   - Creazione bucket R2
   - Creazione Database (D1 o KV)
   - Configurazione Workers
   - Test infrastruttura di base

2. **Fase 2: Sviluppo API backend** (3-7 giorni)
   - Sviluppo sistema autenticazione
   - Sviluppo API gestione file
   - Integrazione sistemi

3. **Fase 3: Integrazione frontend-backend** (2-4 giorni)
   - Modifiche a download.js
   - Test integrazione
   - Debugging

4. **Fase 4: Test e ottimizzazione** (2-4 giorni)
   - Test completo delle funzionalità
   - Ottimizzazione performance
   - Fix problemi rilevati

5. **Fase 5: Lancio** (1 giorno)
   - Deployment finale
   - Monitoraggio iniziale
   - Comunicazione agli utenti

**Tempo totale stimato**: 9-19 giorni lavorativi

## 7️⃣ Costi stimati (mensili)

| Servizio | Piano | Costo stimato |
|---------|-------|--------------|
| Cloudflare Pages | Free | $0 |
| Cloudflare Workers | Free (100k richieste/giorno) | $0 |
| Cloudflare R2 | $0.015/GB + $0.36/milione richieste Class A | ~$5-15 |
| Cloudflare D1 | Free (Beta) | $0 |
| Email (Mailchannels) | Free con Workers | $0 |

**Costo totale stimato**: $5-15/mese (dipende dall'utilizzo)

## 8️⃣ Requisiti di manutenzione

- Monitoraggio periodico dei log (settimanale)
- Gestione utenti autorizzati (secondo necessità)
- Backup database e file (settimanale)
- Aggiornamenti di sicurezza (quando necessario)

## 9️⃣ Conclusioni e raccomandazioni

L'implementazione dell'area download utilizzando Cloudflare Pages, Workers e R2 offre numerosi vantaggi:
- Costi contenuti e scalabili
- Elevate performance globali grazie alla rete Cloudflare
- Facilità di gestione e manutenzione
- Buon livello di sicurezza

Si raccomanda di:
1. Iniziare con un gruppo ristretto di utenti test
2. Implementare limiti di dimensione dei file e quote di spazio
3. Considerare la rotazione periodica dei file meno utilizzati
4. Documentare attentamente le procedure per la gestione degli utenti
5. Prevedere procedure di backup regolari

---

## Contatti per supporto tecnico

Per assistenza tecnica durante l'implementazione:
- Email: riccardo.parenti@outlook.com
- Giorni e orari di disponibilità: Lun-Ven, 9:00-18:00 CET