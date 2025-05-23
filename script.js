/*
===========================================================
  Modern Portfolio Website - JavaScript Functionality
  Author: Anurag Kumar
===========================================================
*/



document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            document.body.style.overflow = 'visible';
        }
    }, 1500);

    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Navigation Active State
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close mobile menu when clicking a link
    const mobileNavLinks = document.querySelectorAll('.nav-links a');
    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Dark Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Check for saved theme preference or use preferred color scheme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark-mode');
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            // Save theme preference
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

   const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        // Update active button
        filterBtns.forEach(function(filterBtn) {
            filterBtn.classList.remove('active');
        });
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        projectCards.forEach(function(card) {
            const cardCategory = card.getAttribute('data-category');
            if (filterValue === 'all' || cardCategory === filterValue) {
                card.style.display = 'block';
                setTimeout(function() {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(function() {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});


    // Resume Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Update active button
            tabBtns.forEach(function(tabBtn) {
                tabBtn.classList.remove('active');
            });
            this.classList.add('active');

            // Show active tab pane
            const tabId = this.getAttribute('data-tab');
            tabPanes.forEach(function(pane) {
                pane.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Skill Bars Animation
    const skillBars = document.querySelectorAll('.skill-level');
    const skillsSection = document.querySelector('#skills');

    function animateSkillBars() {
        skillBars.forEach(function(bar) {
            const percent = bar.getAttribute('data-level') + '%';
            bar.style.width = percent;
        });
    }

    // Initial check if skills section is in view
    if (isInViewport(skillsSection)) {
        animateSkillBars();
    }

    // Animate skill bars when scrolled into view
    window.addEventListener('scroll', function() {
        if (isInViewport(skillsSection)) {
            animateSkillBars();
        }
    });

    // Scroll Animations
    const animatedElements = document.querySelectorAll('.animate');

    function animateElements() {
        animatedElements.forEach(function(element) {
            if (isInViewport(element)) {
                const delay = element.getAttribute('data-delay') || 0;
                setTimeout(function() {
                    if (element.classList.contains('animate-fadeIn')) {
                        element.classList.add('animate-fadeIn');
                    } else if (element.classList.contains('animate-slideUp')) {
                        element.classList.add('animate-slideUp');
                    }
                }, delay);
            }
        });
    }

    // Check if element is in viewport
    function isInViewport(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Initial check for elements in viewport
    animateElements();

    // Check on scroll
    window.addEventListener('scroll', animateElements);

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Validation
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset form status
            const formStatus = document.querySelector('.form-status');
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';
            
            // Get form inputs
            const name = document.querySelector('#name');
            const email = document.querySelector('#email');
            const subject = document.querySelector('#subject');
            const message = document.querySelector('#message');
            
            // Validate inputs
            let isValid = true;
            
            if (name.value.trim() === '') {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                clearError(name);
            }
            
            if (email.value.trim() === '') {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                clearError(email);
            }
            
            if (message.value.trim() === '') {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                clearError(message);
            }
            
            if (isValid) {
                // Simulate form submission (replace with actual submission)
                const submitBtn = contactForm.querySelector('.submit-btn');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                setTimeout(function() {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Your message has been sent successfully!';
                    formStatus.style.display = 'block';
                    
                    // Reset form
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    
                    // Hide success message after 5 seconds
                    setTimeout(function() {
                        formStatus.style.display = 'none';
                    }, 5000);
                }, 1500);
                
                // For actual form submission, uncomment and modify the following code
                /*
                fetch('your-form-handler-url', {
                    method: 'POST',
                    body: new FormData(contactForm)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        formStatus.className = 'form-status success';
                        formStatus.textContent = 'Your message has been sent successfully!';
                        contactForm.reset();
                    } else {
                        formStatus.className = 'form-status error';
                        formStatus.textContent = data.message || 'Something went wrong. Please try again.';
                    }
                    formStatus.style.display = 'block';
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                })
                .catch(error => {
                    formStatus.className = 'form-status error';
                    formStatus.textContent = 'Something went wrong. Please try again.';
                    formStatus.style.display = 'block';
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                });
                */
            }
        });
        
        // Helper functions for form validation
        function showError(input, message) {
            input.classList.add('error');
            const errorElement = input.nextElementSibling;
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.textContent = message;
            }
        }
        
        function clearError(input) {
            input.classList.remove('error');
            const errorElement = input.nextElementSibling;
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.textContent = '';
            }
        }
        
        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
        }
    }

    // Add Animation to Hero Elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach(function(element, index) {
        element.classList.add('fade-in');
        element.style.animationDelay = (0.2 * index) + 's';
    });
});

/*
===========================================================
  Testimonials Section - JavaScript Functionality
  Author: John Doe
===========================================================
*/

document.addEventListener('DOMContentLoaded', function() {
    // Testimonials Carousel
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dotsContainer = document.querySelector('.testimonial-indicators');
    
    if (testimonialsSlider && testimonialItems.length > 0) {
        let currentIndex = 0;
        const itemCount = testimonialItems.length;
        
        // Create indicator dots
        for (let i = 0; i < itemCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-index', i);
            dotsContainer.appendChild(dot);
            
            // Add click event to dots
            dot.addEventListener('click', function() {
                goToSlide(parseInt(this.getAttribute('data-index')));
            });
        }
        
        // Update dots
        function updateDots() {
            const dots = document.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            if (index < 0) {
                index = itemCount - 1;
            } else if (index >= itemCount) {
                index = 0;
            }
            
            currentIndex = index;
            testimonialsWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
        }
        
        // Previous slide
        prevBtn.addEventListener('click', function() {
            goToSlide(currentIndex - 1);
        });
        
        // Next slide
        nextBtn.addEventListener('click', function() {
            goToSlide(currentIndex + 1);
        });
        
        // Auto slide (optional)
        let autoSlide;
        function startAutoSlide() {
            autoSlide = setInterval(function() {
                goToSlide(currentIndex + 1);
            }, 5000);
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlide);
        }
        
        // Start auto slide
        startAutoSlide();
        
        // Pause on hover
        testimonialsSlider.addEventListener('mouseenter', stopAutoSlide);
        testimonialsSlider.addEventListener('mouseleave', startAutoSlide);
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        testimonialsSlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });
        
        testimonialsSlider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        }, { passive: true });
        
        function handleSwipe() {
            const difference = touchStartX - touchEndX;
            if (difference > 50) {
                // Swipe left
                goToSlide(currentIndex + 1);
            } else if (difference < -50) {
                // Swipe right
                goToSlide(currentIndex - 1);
            }
        }
    }
});

/*
===========================================================
  Enhanced Scroll Animations - JavaScript
  Author: John Doe
===========================================================
*/
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Scroll Animations
    const fadeElements = document.querySelectorAll('.fade-up, .fade-in-left, .fade-in-right');
    
    // Initialize Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // 10% of element visible
        rootMargin: '0px 0px -50px 0px' // trigger a bit earlier
    });
    
    // Observe each element
    fadeElements.forEach(element => {
        observer.observe(element);
        
        // Add delay if specified
        const delay = element.getAttribute('data-delay');
        if (delay) {
            element.style.transitionDelay = `${delay}s`;
        }
    });
    
    // Parallax Effect for sections with .parallax class
    const parallaxSections = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        parallaxSections.forEach(section => {
            const scrollY = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const speed = section.getAttribute('data-speed') || 0.5;
            
            // Calculate parallax offset
            if (scrollY >= sectionTop - window.innerHeight && scrollY <= sectionTop + section.offsetHeight) {
                const yPos = (scrollY - sectionTop) * speed;
                section.style.backgroundPositionY = `${yPos}px`;
            }
        });
    });
    
    // Counter animation for numbers
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = parseInt(entry.target.getAttribute('data-duration')) || 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                // Start counter animation
                const updateCounter = () => {
                    current += increment;
                    
                    // Round to nearest integer and format with commas if needed
                    if (current < target) {
                        entry.target.textContent = Math.round(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target.toLocaleString();
                        counterObserver.unobserve(entry.target);
                    }
                };
                
                updateCounter();
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe counter elements
    counters.forEach(counter => {
        counterObserver.unobserve(counter); // Make sure we're not observing it already
        counterObserver.observe(counter);
    });
    
    // Staggered animation for list items
    const staggeredLists = document.querySelectorAll('.staggered-list');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const listItems = entry.target.querySelectorAll('li');
                const baseDelay = parseFloat(entry.target.getAttribute('data-base-delay')) || 0.1;
                
                listItems.forEach((item, index) => {
                    item.style.transitionDelay = `${baseDelay * index}s`;
                    item.classList.add('visible');
                });
                
                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    staggeredLists.forEach(list => {
        staggerObserver.observe(list);
    });
    
    // Scroll progress indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            scrollProgress.style.width = `${scrollPercent}%`;
        });
    }
    
    // Reveal on scroll with custom animations
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-reveal');
                const duration = element.getAttribute('data-duration') || '0.8s';
                
                element.style.animationDuration = duration;
                element.classList.add('revealed', animation);
                
                revealObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Initialize AOS-like functionality
    initializeAOSLike();
});

// AOS-like functionality (Animation On Scroll)
function initializeAOSLike() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-aos');
                const delay = element.getAttribute('data-aos-delay') || 0;
                const duration = element.getAttribute('data-aos-duration') || 800;
                const easing = element.getAttribute('data-aos-easing') || 'ease';
                
                // Apply animation styles
                element.style.transitionProperty = 'transform, opacity';
                element.style.transitionDuration = `${duration}ms`;
                element.style.transitionTimingFunction = easing;
                element.style.transitionDelay = `${delay}ms`;
                element.style.opacity = 1;
                element.style.transform = 'none';
                
                // Remove from observation after animation
                if (!element.getAttribute('data-aos-repeat')) {
                    aosObserver.unobserve(element);
                }
            } else if (element.getAttribute('data-aos-repeat')) {
                // Reset animation if repeat is enabled
                const element = entry.target;
                resetAOSElement(element);
            }
        });
    }, {
        threshold: 0.25
    });
    
    // Set initial styles for AOS elements
    elements.forEach(element => {
        resetAOSElement(element);
        aosObserver.observe(element);
    });
}

// Helper to reset AOS element styles
function resetAOSElement(element) {
    const animationType = element.getAttribute('data-aos');
    element.style.opacity = 0;
    
    // Apply initial transform based on animation type
    switch (animationType) {
        case 'fade-up':
            element.style.transform = 'translate3d(0, 30px, 0)';
            break;
        case 'fade-down':
            element.style.transform = 'translate3d(0, -30px, 0)';
            break;
        case 'fade-left':
            element.style.transform = 'translate3d(-30px, 0, 0)';
            break;
        case 'fade-right':
            element.style.transform = 'translate3d(30px, 0, 0)';
            break;
        case 'zoom-in':
            element.style.transform = 'scale(0.9)';
            break;
        case 'zoom-out':
            element.style.transform = 'scale(1.1)';
            break;
        case 'flip-up':
            element.style.transform = 'perspective(2500px) rotateX(-100deg)';
            break;
        default:
            element.style.transform = 'translate3d(0, 0, 0)';
    }
}

// Export as module if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        initializeAOSLike,
        resetAOSElement
    };
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Show sending message
  const formStatus = document.getElementById("formStatus");
  formStatus.textContent = "Sending...";
  formStatus.style.color = "blue";

  emailjs
    .sendForm("service_h6nvrf9", "template_iwzvcmh", this)
    .then(
      function () {
        formStatus.textContent = "Message sent successfully!";
        formStatus.style.color = "green";
        document.getElementById("contactForm").reset();
      },
      function (error) {
        formStatus.textContent = "Failed to send message. Try again later.";
        formStatus.style.color = "red";
        console.error("EmailJS error:", error);
      }
    );
});
