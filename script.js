document.addEventListener("DOMContentLoaded", function () {
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
    
    // Form submission handling with validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // In a real implementation, you would send the form data to a server
                // For now, we'll just show a success message
                contactForm.innerHTML = `
                    <div class="form-success">
                        <h3>Thank you for your message!</h3>
                        <p>We have received your inquiry and will get back to you soon.</p>
                    </div>
                `;
            }
        });
    }
});

// Add CSS classes for animations
document.addEventListener("DOMContentLoaded", function () {
    // Add a class to body after page load to trigger animations
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);
});