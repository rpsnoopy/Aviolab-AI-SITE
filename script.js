document.addEventListener("DOMContentLoaded", function () {
    // Initialize language
    let currentLanguage = localStorage.getItem('language') || 'en';
    document.documentElement.lang = currentLanguage;
    
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
    
    // Language selector functionality
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.querySelector(`[data-lang="${currentLanguage}"]`).classList.add('active');
        
        languageSelector.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                if (lang !== currentLanguage) {
                    currentLanguage = lang;
                    localStorage.setItem('language', lang);
                    document.documentElement.lang = lang;
                    
                    // Update active class
                    languageSelector.querySelectorAll('.lang-option').forEach(opt => {
                        opt.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // Apply translations
                    applyTranslations();
                }
            });
        });
    }
    
    // Apply initial translations
    applyTranslations();
    
    // Function to apply translations based on current language
    function applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLanguage] && translations[currentLanguage][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[currentLanguage][key];
                } else {
                    element.innerHTML = translations[currentLanguage][key];
                }
            }
        });
        
        // Handle form success messages
        const contactForm = document.querySelector('.contact-form');
        if (contactForm && contactForm.querySelector('.form-success')) {
            contactForm.innerHTML = `
                <div class="form-success">
                    <h3>${translations[currentLanguage].contact_form_success_title}</h3>
                    <p>${translations[currentLanguage].contact_form_success_message}</p>
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
    
    // Rimosso il gestore di eventi del modulo poiché ora utilizziamo FormSubmit
});

// Add CSS classes for animations
document.addEventListener("DOMContentLoaded", function () {
    // Add a class to body after page load to trigger animations
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);
});