Aggiungi questo codice alla fine del file script.js, appena prima della parentesi graffa di chiusura finale:

// Funzione per garantire la corretta colorazione del titolo evidenziato
function ensureHighlightStyling() {
    // Per la versione inglese
    if (document.documentElement.lang === 'en' || document.body.classList.contains('en')) {
        const englishHighlight = document.querySelector('.hero-content h1 .highlight');
        if (englishHighlight) {
            englishHighlight.style.color = '#ff0000';
            englishHighlight.style.textShadow = '0 0 6px rgba(0, 0, 0, 0.6)';
            englishHighlight.style.fontWeight = '700';
        }
    }

    // Per la versione italiana
    if (document.documentElement.lang === 'it' || document.body.classList.contains('it')) {
        // Trova tutti gli elementi span nel titolo hero
        const italianTitleSpans = document.querySelectorAll('.hero-content h1 span');
        italianTitleSpans.forEach(span => {
            // Se contiene la frase "Potenziata dall'IA" o ha la classe highlight
            if (span.textContent.includes("Potenziata dall'IA") || span.classList.contains('highlight')) {
                span.style.color = '#ff0000';
                span.style.textShadow = '0 0 6px rgba(0, 0, 0, 0.6)';
                span.style.fontWeight = '700';
            }
        });
    }
}

// Esegui la funzione dopo che il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', function() {
    // Esegui subito
    ensureHighlightStyling();

    // Esegui anche dopo un breve ritardo per assicurarti che le traduzioni siano state applicate
    setTimeout(ensureHighlightStyling, 100);

    // Per sicurezza, esegui anche dopo un ritardo più lungo
    setTimeout(ensureHighlightStyling, 500);

    // Inoltre, aggancia la funzione all'evento di cambio lingua
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Aspetta un momento per dare tempo al sistema di traduzione di fare il suo lavoro
            setTimeout(ensureHighlightStyling, 100);
        });
    });
});
