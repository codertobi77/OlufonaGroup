document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM chargé');
    
    // Initialize particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#4A56E2"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4A56E2",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Language management
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('language') || 'fr';
    
    // Set initial language
    setLanguage(currentLang);
    
    // Language toggle functionality
    langButtons.forEach(btn => {
        if(btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            setLanguage(lang);
            localStorage.setItem('language', lang);
        });
    });
    
    function setLanguage(lang) {
        // Handle regular text content
        const elementsWithLang = document.querySelectorAll('[data-lang-fr], [data-lang-en]');
        
        elementsWithLang.forEach(el => {
            const translation = el.getAttribute(`data-lang-${lang}`);
            if(translation) {
                el.textContent = translation;
            }
        });
        
        // Handle placeholders
        const placeholders = document.querySelectorAll('[data-lang-fr-placeholder], [data-lang-en-placeholder]');
        
        placeholders.forEach(el => {
            const translation = el.getAttribute(`data-lang-${lang}-placeholder`);
            if(translation) {
                el.placeholder = translation;
            }
        });
    }
    
    // Dark mode toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    // Check for saved theme preference or prefer-color-scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
    }
    
    // Toggle dark mode
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Gestion du menu mobile
    const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu nav a');

    // Ouvrir le menu
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });

    // Fermer le menu avec le bouton de fermeture
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });

    // Gestion des sous-menus
    const menuItems = document.querySelectorAll('.mobile-menu nav ul li');
    
    menuItems.forEach(item => {
        const submenu = item.querySelector('ul');
        if (submenu) {
            // Ajouter la classe has-submenu
            item.classList.add('has-submenu');
            
            // Obtenir le lien principal
            const link = item.querySelector('a');
            
            // Créer et ajouter l'icône de flèche
            const arrow = document.createElement('span');
            arrow.classList.add('submenu-arrow');
            link.appendChild(arrow);
            
            // Gestionnaire de clic
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Fermer les autres sous-menus
                menuItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherSubmenu = otherItem.querySelector('ul');
                        if (otherSubmenu) {
                            otherSubmenu.style.maxHeight = '0px';
                        }
                    }
                });
                
                // Basculer le sous-menu actuel
                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    submenu.style.maxHeight = submenu.scrollHeight + 'px';
                } else {
                    submenu.style.maxHeight = '0px';
                }
            });
        }
    });

    // Fermer le menu quand on clique sur un lien sans sous-menu
    mobileMenuLinks.forEach(link => {
        if (!link.parentElement.classList.contains('has-submenu')) {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });
        }
    });

    // Désactiver l'ancrage du défilement pendant les animations
    document.addEventListener('scroll', function(e) {
        if (document.querySelector('.has-dropdown.active')) {
            window.scrollTo(window.scrollX, window.scrollY);
        }
    }, { passive: true });

    // Sticky Header
    const header = document.querySelector('.header');
    
    function toggleStickyHeader() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    window.addEventListener('scroll', toggleStickyHeader);
    toggleStickyHeader();

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu when link is clicked
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });

    // Active Menu Item On Scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.main-nav ul li a');

    function setActiveNavItem() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollPosition > sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNavItem);
    setActiveNavItem();

    // Simple Testimonials Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;

    // Create dots
    testimonialItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToTestimonial(index);
        });
        testimonialDots.appendChild(dot);
    });

    const dots = document.querySelectorAll('.testimonial-dots .dot');

    function showTestimonial(index) {
        testimonialItems.forEach(item => {
            item.style.display = 'none';
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        testimonialItems[index].style.display = 'block';
        dots[index].classList.add('active');
    }

    function goToTestimonial(index) {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    }

    // Initial display
    showTestimonial(currentTestimonial);

    // Auto-rotate testimonials
    setInterval(nextTestimonial, 5000);

    // Contact Form Validation
    (function(){
            emailjs.init("AjFmmqiiKFnA5zOH7"); // Remplacez par votre User ID EmailJS
        })();
    document.getElementById("contactForm").addEventListener("submit", function(event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            let isValid = true;
            
            // Simple validation
            if (!name.trim()) {
                isValid = false;
                alert('Veuillez entrer votre nom');
            } else if (!email.trim() || !email.includes('@')) {
                isValid = false;
                alert('Veuillez entrer une adresse email valide');
            } else if (!subject.trim()) {
                isValid = false;
                alert('Veuillez entrer un sujet');
            } else if (!message.trim()) {
                isValid = false;
                alert('Veuillez entrer votre message');
            }
            
            if (isValid) {
                emailjs.send("service_d0s6znp", "template_xp00fly", {
                name: name,
                email: email,
                subject: subject,
                message: message
            }).then(function(response) {
                alert("E-mail envoyé avec succès !");
            }, function(error) {
                alert("Erreur lors de l'envoi.");
            });
        });
                contactForm.reset();
            }
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email.trim() || !email.includes('@')) {
                alert('Veuillez entrer une adresse email valide');
            } else {
                alert('Merci de vous être abonné à notre newsletter !');
                this.reset();
            }
        });
    }

    // Animation on Scroll
    const animatedElements = document.querySelectorAll('.feature-box, .department-card, .about-stats, .testimonial-content');
    
    function checkIfInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    }
    
    // Set initial state for animation
    animatedElements.forEach(element => {
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s var(--transition-cubic), transform 0.8s var(--transition-cubic)';
    });
    
    // Add animated class when in view
    document.addEventListener('scroll', function() {
        checkIfInView();
    });
    
    // Check for elements in view on initial load
    window.addEventListener('load', function() {
        checkIfInView();
    });
    
    // Recalculate on resize
    window.addEventListener('resize', function() {
        checkIfInView();
    });
    
    // Call once to check elements initially in view
    checkIfInView();

    const featureBoxes = document.querySelectorAll('.features, .departments');
    featureBoxes.forEach(element => {
        element.classList.add('animated');
    });
});
