// Pagine bilingui (downloads.html, ip-legal.html): lingua della pagina e traduzioni.
// L'HTML e' scritto in italiano, la lingua predefinita. Chi ha scelto «EN» col selettore
// della testata trova la pagina in inglese: i testi vengono da js/translations.js,
// che va caricato prima di questo file. Il menu della testata lo gestisce js/sito.js.
document.addEventListener('DOMContentLoaded', function () {
    // L'inglese solo se scelto dall'utente: la vecchia versione del sito metteva 'en' da sola,
    // senza languageChoiceMade, a chi non risultava in Italia o quando ipapi.co non rispondeva.
    function linguaScelta() {
        try {
            if (localStorage.getItem('language') === 'en' && localStorage.getItem('languageChoiceMade') === 'true') {
                return 'en';
            }
        } catch (e) { /* archivio locale non disponibile */ }
        return 'it';
    }

    const lingua = linguaScelta();
    const tabella = (typeof translations !== 'undefined' && translations[lingua]) || {};

    document.documentElement.lang = lingua;
    // styles.css mostra o nasconde alcuni download secondo la lingua (body.it).
    document.body.classList.toggle('it', lingua === 'it');

    // Si applicano sempre i testi della lingua scelta. Nelle due pagine l'italiano coincide con
    // l'HTML; serve anche a ip-legal-v1-backup.html, che ha ancora l'HTML in inglese.
    document.querySelectorAll('[data-i18n]').forEach(function (elemento) {
        const valore = tabella[elemento.getAttribute('data-i18n')];
        if (!valore) return;
        if (elemento.tagName === 'TITLE') {
            document.title = valore;
        } else {
            elemento.innerHTML = valore;
        }
    });
    ['placeholder', 'aria-label'].forEach(function (attributo) {
        document.querySelectorAll('[data-i18n-' + attributo + ']').forEach(function (elemento) {
            const valore = tabella[elemento.getAttribute('data-i18n-' + attributo)];
            if (valore) elemento.setAttribute(attributo, valore);
        });
    });

    // Selettore della lingua: la scelta resta salvata e la pagina si ricarica nella lingua nuova,
    // alla stessa altezza.
    const selettore = document.querySelector('.language-selector');
    if (selettore) {
        selettore.querySelectorAll('.lang-option[data-lang]').forEach(function (pulsante) {
            const sua = pulsante.getAttribute('data-lang');
            // aria-pressed solo sui <button> delle due pagine; i <div> del vecchio selettore
            // (ip-legal-v1-backup.html) tengono la classe active.
            if (pulsante.tagName === 'BUTTON') {
                pulsante.setAttribute('aria-pressed', sua === lingua ? 'true' : 'false');
            } else {
                pulsante.classList.toggle('active', sua === lingua);
            }
            pulsante.addEventListener('click', function () {
                if (sua === lingua) return;
                try {
                    localStorage.setItem('language', sua);
                    localStorage.setItem('languageChoiceMade', 'true');
                    sessionStorage.setItem('scrollPosition', String(window.scrollY));
                } catch (e) { /* senza archivio la scelta vale solo per questa pagina */ }
                window.location.reload();
            });
        });
    }

    // Dopo il cambio di lingua: torna dov'era.
    try {
        const posizione = sessionStorage.getItem('scrollPosition');
        if (posizione !== null) {
            sessionStorage.removeItem('scrollPosition');
            window.scrollTo(0, parseInt(posizione, 10) || 0);
        }
    } catch (e) { /* archivio di sessione non disponibile */ }
});
