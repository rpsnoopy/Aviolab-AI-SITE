document.addEventListener("DOMContentLoaded", function () {
    // Initialize language
    // Controlla se l'utente ha già una preferenza di lingua salvata
    let userLanguagePreference = localStorage.getItem('language');

    // Se non c'è preferenza salvata, determiniamo la lingua in base all'IP
    if (!userLanguagePreference) {
        detectUserLocation();
    } else {
        // Utilizziamo la preferenza salvata ma se è IT mostriamo sempre il prompt
        setLanguage(userLanguagePreference);
        
        // Se la lingua salvata è italiano, mostriamo comunque il prompt di selezione lingua
        if (userLanguagePreference === 'it' && !localStorage.getItem('languagePromptDismissed')) {
            setTimeout(showLanguagePrompt, 1500);
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
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                // Determina la lingua in base al paese
                const isItaly = data.country_code === 'IT';
                
                if (isItaly) {
                    // Se l'utente è in Italia, imposta italiano ma chiedi conferma
                    setLanguage('it');
                    
                    // Verifica se l'utente ha già scelto di non vedere più il prompt
                    if (!localStorage.getItem('languagePromptDismissed')) {
                        // Mostra il prompt dopo un breve ritardo
                        setTimeout(showLanguagePrompt, 1500);
                    }
                } else {
                    // Per tutti gli altri paesi, imposta inglese e salva la preferenza
                    setLanguage('en');
                    localStorage.setItem('language', 'en');
                }
            })
            .catch(error => {
                // In caso di errore, utilizza l'inglese come fallback
                console.error('Error detecting location:', error);
                setLanguage('en');
                localStorage.setItem('language', 'en');
            });
    }

    // Funzione per mostrare il prompt di conferma lingua
    function showLanguagePrompt() {
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
                    <p>Benvenuto! Sembra che tu stia visitando dall'Italia.<br>Preferisci visualizzare il sito in inglese?</p>
                </div>
                <div class="language-prompt-buttons">
                    <button class="btn-keep-italian">Mantieni Italiano</button>
                    <button class="btn-switch-english">Switch to English</button>
                </div>
                <label class="remember-choice">
                    <input type="checkbox" id="remember-lang-choice"> Ricorda la mia scelta
                </label>
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
            }
            
            .btn-keep-italian {
                background-color: #333333;
                color: #fff;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .btn-switch-english {
                background-color: #ff0000;
                color: white;
            }
            
            .btn-keep-italian:hover {
                background-color: #444444;
            }
            
            .btn-switch-english:hover {
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
        const keepItalianBtn = document.querySelector('.btn-keep-italian');
        const switchEnglishBtn = document.querySelector('.btn-switch-english');
        const rememberChoiceCheckbox = document.getElementById('remember-lang-choice');
        
        keepItalianBtn.addEventListener('click', function() {
            setLanguage('it');
            if (rememberChoiceCheckbox.checked) {
                localStorage.setItem('language', 'it');
                localStorage.setItem('languagePromptDismissed', 'true');
            }
            removePrompt();
        });
        
        switchEnglishBtn.addEventListener('click', function() {
            setLanguage('en');
            localStorage.setItem('language', 'en');
            if (rememberChoiceCheckbox.checked) {
                localStorage.setItem('languagePromptDismissed', 'true');
            }
            
            // Ricarica la pagina per applicare le traduzioni
            const currentScroll = window.scrollY;
            sessionStorage.setItem('scrollPosition', currentScroll);
            window.location.reload();
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
    // Check for thank you page parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('thanks') === 'true') {
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
    
    // Language selector functionality - NUOVO APPROCCIO CON RICARICAMENTO PAGINA
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        // Gestione del cambio lingua con ricaricamento della pagina
        languageSelector.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                const currentLang = document.documentElement.lang;
                
                if (lang !== currentLang) {
                    // Salva la nuova preferenza di lingua
                    localStorage.setItem('language', lang);
                    
                    // Salva la posizione di scorrimento attuale per ripristinarla dopo il ricaricamento
                    const currentScroll = window.scrollY;
                    sessionStorage.setItem('scrollPosition', currentScroll);
                    
                    // Ricarica la pagina per applicare la nuova lingua
                    window.location.reload();
                }
            });
        });
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
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(anchor => {
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
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    // Add a class to body after page load to trigger animations
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);
});