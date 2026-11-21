// Home 2027: menu degli schermi stretti e modulo dei contatti.
// La pagina non carica script.js ne' translations.js: e' solo in italiano.
document.addEventListener('DOMContentLoaded', function () {
    // Menu: il pulsante apre e chiude l'elenco, e lo dichiara a chi usa un lettore di schermo.
    const apri = document.querySelector('.menu__apri');
    const menu = document.getElementById('menu');
    if (apri && menu) {
        const chiudi = function () {
            menu.classList.remove('aperto');
            apri.setAttribute('aria-expanded', 'false');
        };
        apri.addEventListener('click', function () {
            const aperto = menu.classList.toggle('aperto');
            apri.setAttribute('aria-expanded', aperto ? 'true' : 'false');
        });
        menu.addEventListener('click', function (evento) {
            if (evento.target.closest('a')) chiudi();
        });
        document.addEventListener('keydown', function (evento) {
            if (evento.key === 'Escape' && menu.classList.contains('aperto')) {
                chiudi();
                apri.focus();
            }
        });
    }

    // Animazioni mute: partono quando entrano nello schermo e si fermano quando ne escono.
    // Chi ha chiesto meno movimento al sistema le trova ferme, con i comandi per avviarle.
    const menoMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!menoMovimento && 'IntersectionObserver' in window) {
        const guardia = new IntersectionObserver(function (voci) {
            voci.forEach(function (voce) {
                const video = voce.target;
                if (voce.isIntersecting) {
                    video.play().catch(function () { video.setAttribute('controls', ''); });
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.35 });
        document.querySelectorAll('video.animazione').forEach(function (video) {
            video.removeAttribute('controls');
            video.muted = true;
            guardia.observe(video);
        });
    }

    // La stima d'impatto in persone: in grigio quelle dell'ufficio, in rosso quanto rende in piu' il loro lavoro.
    // Il numero di persone dell'ufficio si cambia con i due tasti; si parte da quattro.
    const stima = document.querySelector('.stima');
    if (stima) {
        const PAROLE = ['', 'una', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci'];
        const FIGURA = '<svg viewBox="0 0 24 50" fill="currentColor"><circle cx="12" cy="7.5" r="6.5"/><path d="M3 27a9 9 0 0 1 18 0v19a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z"/></svg>';
        const numero = stima.querySelector('.stima__numero');
        const tasti = stima.querySelectorAll('.stima__tasto');
        const conVirgola = function (valore) { return valore.toFixed(1).replace('.', ','); };
        let persone = 4;

        const disegna = function (conArrivo) {
            numero.textContent = String(persone);
            tasti.forEach(function (tasto) {
                const prossimo = persone + Number(tasto.dataset.passo);
                tasto.disabled = prossimo < 1 || prossimo > 10;
            });
            stima.querySelectorAll('.stima__riga').forEach(function (riga) {
                const inPiu = persone * (Number(riga.dataset.capacita) - 100) / 100;
                const intere = Math.floor(inPiu + 0.001);
                const parte = inPiu - intere;
                let figure = '';
                for (let k = 0; k < persone; k++) figure += '<span class="omino omino--grigio">' + FIGURA + '</span>';
                figure += '<span class="piu">+</span>';
                let ordine = 0;
                for (let k = 0; k < intere; k++) {
                    figure += '<span class="omino omino--rosso" style="--i:' + (ordine++) + '"><span class="omino__pieno">' + FIGURA + '</span></span>';
                }
                if (parte >= 0.05) {
                    figure += '<span class="omino omino--rosso" style="--i:' + ordine + ';--parte:' + parte.toFixed(2) + '">' +
                        '<span class="omino__fondo">' + FIGURA + '</span><span class="omino__pieno">' + FIGURA + '</span></span>';
                }
                const gruppo = riga.querySelector('.stima__persone');
                gruppo.classList.remove('arrivo');
                gruppo.innerHTML = figure;
                if (conArrivo) { void gruppo.offsetWidth; gruppo.classList.add('arrivo'); }
                riga.querySelector('.stima__frase').textContent = 'A ' + PAROLE[persone] +
                    (persone === 1 ? ' persona' : ' persone') + ' il lavoro rende come se fossero in ' + conVirgola(persone + inPiu) + '.';
            });
        };

        tasti.forEach(function (tasto) {
            tasto.addEventListener('click', function () {
                persone = Math.min(10, Math.max(1, persone + Number(tasto.dataset.passo)));
                disegna(!menoMovimento);
            });
        });

        // Le persone rosse arrivano quando la sezione entra nello schermo.
        if (!menoMovimento && 'IntersectionObserver' in window) {
            disegna(false);
            stima.querySelectorAll('.stima__persone').forEach(function (g) { g.querySelectorAll('.omino--rosso').forEach(function (o) { o.style.opacity = '0'; }); });
            new IntersectionObserver(function (voci, guardiaStima) {
                if (voci[0].isIntersecting) { disegna(true); guardiaStima.disconnect(); }
            }, { threshold: 0.2 }).observe(stima);
        } else {
            disegna(false);
        }
    }

    const modulo = document.querySelector('.modulo');
    if (!modulo) return;

    // Al ritorno da FormSubmit (?thanks=true) il modulo lascia il posto alla conferma.
    if (new URLSearchParams(window.location.search).get('thanks') === 'true') {
        modulo.innerHTML =
            '<div class="modulo__esito" role="status">' +
            '<h3>Richiesta inviata</h3>' +
            '<p>Abbiamo ricevuto la Sua richiesta. Le rispondiamo di norma entro un giorno lavorativo.</p>' +
            '</div>';
        const sezione = document.getElementById('contact');
        if (sezione) sezione.scrollIntoView();
        return;
    }

    // Risposta automatica di cortesia: testo senza lettere accentate, perche' arriva per posta
    // attraverso un servizio esterno.
    modulo.addEventListener('submit', function () {
        const campo = modulo.querySelector('input[name="_autoresponse"]');
        if (!campo) return;
        campo.value = [
            'Gentile Signora, gentile Signore,',
            '',
            'grazie per averci scritto. Abbiamo ricevuto il Suo messaggio e Le risponderemo di norma entro un giorno lavorativo.',
            '',
            'Per richieste urgenti ci trova al numero +39 335 605 0950, nei giorni lavorativi dalle 9 alle 18.',
            '',
            'Cordiali saluti,',
            'Aviolab AI',
            'AVIOLAB AI DI PARENTI RICCARDO',
            'info@aviolab.ai - www.aviolab.ai',
        ].join('\n');
    });
});
