// Script per testare la rilevazione della lingua
// Copia questo codice in console per testare i diversi comportamenti

// 1. Test utente italiano
function testItalianUser() {
    console.log('Simulazione utente italiano');
    // Cancella localStorage per simulare primo accesso
    localStorage.clear();
    // Sostituisci la funzione fetch nel codice
    const originalFetch = window.fetch;
    window.fetch = function(url) {
        console.log('Intercettata chiamata API a:', url);
        if (url.includes('ipapi.co')) {
            console.log('Simulata risposta per utente italiano');
            return Promise.resolve({
                json: () => Promise.resolve({ country_code: 'IT' })
            });
        }
        return originalFetch.apply(this, arguments);
    };
    // Ricarica la pagina per applicare i cambiamenti
    window.location.reload();
}

// 2. Test utente estero
function testForeignUser() {
    console.log('Simulazione utente estero');
    // Cancella localStorage per simulare primo accesso
    localStorage.clear();
    // Sostituisci la funzione fetch nel codice
    const originalFetch = window.fetch;
    window.fetch = function(url) {
        console.log('Intercettata chiamata API a:', url);
        if (url.includes('ipapi.co')) {
            console.log('Simulata risposta per utente estero');
            return Promise.resolve({
                json: () => Promise.resolve({ country_code: 'US' })
            });
        }
        return originalFetch.apply(this, arguments);
    };
    // Ricarica la pagina per applicare i cambiamenti
    window.location.reload();
}

// 3. Test errore API
function testApiError() {
    console.log('Simulazione errore API');
    // Cancella localStorage per simulare primo accesso
    localStorage.clear();
    // Sostituisci la funzione fetch nel codice
    const originalFetch = window.fetch;
    window.fetch = function(url) {
        console.log('Intercettata chiamata API a:', url);
        if (url.includes('ipapi.co')) {
            console.log('Simulato errore API');
            return Promise.reject(new Error('Errore di connessione simulato'));
        }
        return originalFetch.apply(this, arguments);
    };
    // Ricarica la pagina per applicare i cambiamenti
    window.location.reload();
}

// 4. Ripristina comportamento normale
function resetTesting() {
    console.log('Ripristino comportamento normale');
    localStorage.clear();
    // Ripristina la funzione fetch originale
    delete window.fetch;
    // Ricarica la pagina
    window.location.reload();
}

// Istruzioni per l'uso
console.log('ISTRUZIONI PER IL TEST:');
console.log('1. Per testare come utente italiano: testItalianUser()');
console.log('2. Per testare come utente estero: testForeignUser()');
console.log('3. Per testare un errore dell\'API: testApiError()');
console.log('4. Per ripristinare il comportamento normale: resetTesting()');