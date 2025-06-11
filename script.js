document.addEventListener("DOMContentLoaded", function () {
    // Initialize language
    let permanentLanguagePreference = localStorage.getItem('language');
    let languageChoiceMade = localStorage.getItem('languageChoiceMade');
    let languagePromptShown = sessionStorage.getItem('languagePromptShown');
    
    // All'inizio carichiamo sempre in inglese, ma la sovrascriviamo subito se necessario
    setLanguage('en');
    
    // Se l'utente ha già fatto una scelta di lingua in precedenza
    if (permanentLanguagePreference && languageChoiceMade) {
        // Usiamo la preferenza memorizzata
        setLanguage(permanentLanguagePreference);
    } else {
        // Se invece non c'è una preferenza già memorizzata e il prompt non è già stato mostrato in questa sessione
        if (!languagePromptShown) {
            // Segniamo che il prompt è stato mostrato in questa sessione per non mostrarlo più volte
            sessionStorage.setItem('languagePromptShown', 'true');
            // Controlliamo la localizzazione per decidere se mostrare il prompt
            setTimeout(detectUserLocation, 100);
        }
    }

    // Funzione per impostare la lingua dell'interfaccia
    function setLanguage(lang) {
        let currentLanguage = lang;
        document.documentElement.lang = currentLanguage;
        if (currentLanguage === 'it') {
            document.body.classList.add('it');
        } else {
            document.body.classList.remove('it');
        }
        
        // Aggiorna lo stato visivo del selettore di lingua
        const languageSelector = document.querySelector('.language-selector');
        if (languageSelector) {
            languageSelector.querySelectorAll('.lang-option').forEach(option => {
                if (option.getAttribute('data-lang') === currentLanguage) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            });
        }
    }

    // Funzione per rilevare la posizione utente tramite API di geolocalizzazione
    function detectUserLocation() {
        // Segniamo che il prompt è stato mostrato in questa sessione
        sessionStorage.setItem('languagePromptShown', 'true');
        
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                // Determina la lingua in base al paese
                const isItaly = data.country_code === 'IT';
                
                if (isItaly) {
                    // Se l'utente è in Italia, mostriamo prompt per la selezione della lingua
                    showLanguageSelectionPrompt();
                } else {
                    // Per tutti gli altri paesi, lasciamo l'inglese (già impostato)
                    localStorage.setItem('language', 'en');
                }
            })
            .catch(error => {
                // In caso di errore, resta in inglese (già impostato)
                console.error('Error detecting location:', error);
                localStorage.setItem('language', 'en');
            });
    }

    // Funzione per mostrare il prompt di selezione lingua per utenti italiani
    function showLanguageSelectionPrompt() {
        // Crea l'elemento del prompt
        const promptElement = document.createElement('div');
        promptElement.className = 'language-prompt';
        promptElement.innerHTML = `
            <div class="language-prompt-container">
                <div class="prompt-header">
                    <div class="prompt-logo-container">
                        <img src="assets/logo.png" alt="Aviolab AI Logo" class="prompt-logo">
                        <span class="prompt-logo-text">AVIOLAB <span class="prompt-logo-text-highlight">AI</span></span>
                    </div>
                    <p>Benvenuto! Sembra che tu stia visitando dall'Italia.<br>Ti fa piacere il sito in Italiano?</p>
                </div>
                <div class="language-prompt-buttons">
                    <button class="btn-english">
                        <img src="assets/images/flags/flag-gb.svg" alt="English" class="flag-icon"> English
                    </button>
                    <button class="btn-italian">
                        <img src="assets/images/flags/flag-it.svg" alt="Italiano" class="flag-icon"> Italiano
                    </button>
                </div>
                <!-- Checkbox rimossa poiché memorizziamo sempre la scelta -->
            </div>
        `;
        
        // Aggiungi stili CSS inline
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .language-prompt {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #1a1a1a;
                color: #fff;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
                padding: 20px;
                border-radius: 8px;
                z-index: 1000;
                max-width: 550px;
                width: 90%;
                animation: fadeIn 0.3s ease-in-out;
                border: 1px solid rgba(255, 0, 0, 0.3);
            }
            
            .language-prompt-container {
                text-align: center;
            }
            
            .prompt-header {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 20px;
                text-align: center;
            }
            
            .prompt-logo-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 15px;
            }
            
            .prompt-logo {
                width: 70px;
                height: auto;
                margin-bottom: 8px;
            }
            
            .prompt-logo-text {
                font-family: Verdana, sans-serif;
                font-weight: bold;
                font-size: 16px;
                color: #c0c0c0;
                letter-spacing: 1px;
            }
            
            .prompt-logo-text-highlight {
                color: #ff0000;
            }
            
            .language-prompt p {
                margin: 0;
                font-size: 16px;
                text-align: center;
                line-height: 1.4;
                max-width: 450px;
            }
            
            .language-prompt-buttons {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin: 15px 0 10px;
            }
            
            .language-prompt button {
                padding: 10px 18px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.2s;
                font-size: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
            }
            
            .btn-english {
                background-color: #333333;
                color: #fff;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .btn-italian {
                background-color: #ff0000;
                color: white;
            }
            
            .btn-english:hover {
                background-color: #444444;
            }
            
            .btn-italian:hover {
                background-color: #cc0000;
            }
            
            .remember-choice {
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;
                color: #bbbbbb;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translate(-50%, 20px); }
                to { opacity: 1; transform: translate(-50%, 0); }
            }
        `;
        document.head.appendChild(styleElement);
        
        // Aggiungi il prompt al body
        document.body.appendChild(promptElement);
        
        // Gestisci i click sui pulsanti
        const italianBtn = document.querySelector('.btn-italian');
        const englishBtn = document.querySelector('.btn-english');
        const rememberChoiceCheckbox = document.getElementById('remember-lang-choice');
        
        italianBtn.addEventListener('click', function() {
            setLanguage('it');
            // Sempre salviamo la scelta dell'utente in localStorage per ricordarla tra sessioni
            localStorage.setItem('language', 'it');
            // Memorizziamo che il popup è stato visto e la scelta è stata fatta
            localStorage.setItem('languageChoiceMade', 'true');
            // Ricarica la pagina per applicare le traduzioni
            reloadPage();
            removePrompt();
        });
        
        englishBtn.addEventListener('click', function() {
            // Già siamo in inglese, quindi basta salvare la preferenza
            localStorage.setItem('language', 'en');
            // Memorizziamo che il popup è stato visto e la scelta è stata fatta
            localStorage.setItem('languageChoiceMade', 'true');
            removePrompt();
        });
        
        function removePrompt() {
            promptElement.style.animation = 'fadeOut 0.3s ease-in-out forwards';
            
            // Aggiungi regola di animazione per fadeOut
            const fadeOutStyle = document.createElement('style');
            fadeOutStyle.textContent = `
                @keyframes fadeOut {
                    from { opacity: 1; transform: translate(-50%, 0); }
                    to { opacity: 0; transform: translate(-50%, 20px); }
                }
            `;
            document.head.appendChild(fadeOutStyle);
            
            setTimeout(() => {
                promptElement.remove();
                styleElement.remove();
                fadeOutStyle.remove();
            }, 300);
        }
    }
    
    // Funzione per ricaricare la pagina mantenendo la posizione di scroll
    function reloadPage() {
        const currentScroll = window.scrollY;
        sessionStorage.setItem('scrollPosition', currentScroll);
        window.location.reload();
    }
    // Check for thank you page parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('thanks') === 'true') {
        // Imposta sempre che il prompt della lingua è già stato mostrato
        // così che non riappaia quando torniamo dal form
        sessionStorage.setItem('languagePromptShown', 'true');
        
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            // Scroll to contact section
            window.scrollTo({
                top: contactSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Show success message
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.innerHTML = `
                    <div class="form-success">
                        <h3>${translations[currentLanguage].contact_form_success_title}</h3>
                        <p>${translations[currentLanguage].contact_form_success_message}</p>
                    </div>
                `;
            }
        }
    }
    
    // Language selector functionality
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        // Ottieni riferimenti diretti ai bottoni
        const enOption = languageSelector.querySelector('[data-lang="en"]');
        const itOption = languageSelector.querySelector('[data-lang="it"]');
        
        // Gestione diretta per il bottone inglese
        if (enOption) {
            enOption.addEventListener('click', function(e) {
                e.preventDefault(); // Previeni comportamenti default
                
                // Cambia lingua solo se non siamo già in inglese
                if (document.documentElement.lang !== 'en') {
                    // Salva preferenze
                    localStorage.setItem('language', 'en');
                    localStorage.setItem('languageChoiceMade', 'true');
                    sessionStorage.setItem('languagePromptShown', 'true');
                    
                    // Salva la posizione di scorrimento attuale
                    const currentScroll = window.scrollY;
                    sessionStorage.setItem('scrollPosition', currentScroll);
                    
                    // Ricarica immediatamente
                    window.location.href = window.location.pathname + '?lang=en';
                }
            });
        }
        
        // Gestione diretta per il bottone italiano
        if (itOption) {
            itOption.addEventListener('click', function(e) {
                e.preventDefault(); // Previeni comportamenti default
                
                // Cambia lingua solo se non siamo già in italiano
                if (document.documentElement.lang !== 'it') {
                    // Salva preferenze
                    localStorage.setItem('language', 'it');
                    localStorage.setItem('languageChoiceMade', 'true');
                    sessionStorage.setItem('languagePromptShown', 'true');
                    
                    // Salva la posizione di scorrimento attuale
                    const currentScroll = window.scrollY;
                    sessionStorage.setItem('scrollPosition', currentScroll);
                    
                    // Ricarica immediatamente
                    window.location.href = window.location.pathname + '?lang=it';
                }
            });
        }
    }
    
    // Ripristina la posizione di scorrimento dopo il cambio lingua
    if (sessionStorage.getItem('scrollPosition')) {
        const savedPosition = parseInt(sessionStorage.getItem('scrollPosition'));
        window.scrollTo(0, savedPosition);
        // Pulisci la posizione salvata dopo averla usata
        sessionStorage.removeItem('scrollPosition');
    }
    
    // Apply translations
    applyTranslations();
    
    // Function to apply translations based on current language
    function applyTranslations() {
        const currentLang = document.documentElement.lang;
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLang] && translations[currentLang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[currentLang][key];
                } else {
                    // Gestione speciale per elementi che possono contenere testo con interruzioni di riga
                    let content = translations[currentLang][key];
                    
                    // Gestione specifica per la testimonianza del fondatore
                    if (key === 'founder_testimonial_text') {
                        // Rimuoviamo le virgolette iniziali e finali
                        content = content.replace(/^"|"$/g, '');
                        
                        // Dividiamo il testo in paragrafi usando i doppi ritorni a capo
                        let paragraphs = content.split('\n\n');
                        
                        // Avvolgiamo ogni paragrafo in un tag <p>
                        content = paragraphs.map(p => `<p>${p}</p>`).join('');
                    }
                    
                    // Se l'elemento ha la classe preserve-formatting, applichiamo l'HTML senza sovrascrivere stili
                    if (element.classList.contains('preserve-formatting')) {
                        element.innerHTML = content;
                        // Assicuriamo che gli stili inline siano preservati
                        const spans = element.querySelectorAll('span');
                        spans.forEach(span => {
                            if (span.style.color) span.style.color = span.style.color;
                            if (span.style.fontWeight) span.style.fontWeight = span.style.fontWeight;
                            if (span.style.fontSize) span.style.fontSize = span.style.fontSize;
                        });
                    } else {
                        element.innerHTML = content;
                    }
                }
            }
        });
        
        // Handle form success messages
        const contactForm = document.querySelector('.contact-form');
        if (contactForm && contactForm.querySelector('.form-success')) {
            contactForm.innerHTML = `
                <div class="form-success">
                    <h3>${translations[currentLang].contact_form_success_title}</h3>
                    <p>${translations[currentLang].contact_form_success_message}</p>
                </div>
            `;
        }
    }
    
    // Smooth scrolling for navigation - only for internal anchor links
    document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (document.body.classList.contains('mobile-menu-open')) {
                    document.body.classList.remove('mobile-menu-open');
                }
            }
        });
    });
    
    // Explicit handling for Downloads link (Edge compatibility)
    const downloadsLink = document.querySelector('a[href="downloads.html"]');
    if (downloadsLink) {
        downloadsLink.addEventListener('click', function(e) {
            // Force navigation for Edge compatibility
            e.preventDefault();
            window.open('downloads.html', '_self');
        });
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('show');
            document.body.classList.toggle('mobile-menu-open');
        });
    }
    
    // Sticky header on scroll
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.solution-card, .benefit-card, .section-header, .mission-content, .case-study-container, .about-content, .contact-container');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Highlight current section in navigation
    function highlightCurrentSection() {
        // Get all sections that have an ID
        const sections = document.querySelectorAll('section[id]');
        
        // Determine which section is currently in view
        let currentSectionId = '';
        let minDistance = Infinity;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            // Find the section closest to the top of the viewport
            if (Math.abs(sectionTop) < minDistance && sectionTop <= 100) {
                minDistance = Math.abs(sectionTop);
                currentSectionId = section.id;
            }
        });
        
        // Remove active class from all nav links and dots
        document.querySelectorAll('.nav-link, .section-indicator .dot').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current section's nav link and dot
        if (currentSectionId) {
            const activeNavLink = document.querySelector(`.nav-link[href="#${currentSectionId}"]`);
            const activeDot = document.querySelector(`.section-indicator .dot[href="#${currentSectionId}"]`);
            
            if (activeNavLink) {
                activeNavLink.classList.add('active');
            }
            
            if (activeDot) {
                activeDot.classList.add('active');
            }
        }
    }
    
    window.addEventListener('scroll', function() {
        revealOnScroll();
        highlightCurrentSection();
    });
    
    // Initialize on page load
    revealOnScroll();
    highlightCurrentSection();
    
    // Add a class to body after page load to trigger animations
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);
});