/**
 * SafeHaven Landing Page Main JavaScript
 * Handles navigation, FAQ toggles, form submission, and other UI interactions
 * - Added performance optimizations
 * - Added accessibility improvements
 * - Added improved mobile menu handling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle with improved accessibility
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menuToggle && nav) {
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('active');
            }
        });
    });
    
    // Close mobile menu when clicking outside nav
    document.addEventListener('click', function(event) {
        if (menuToggle && nav && menuToggle.classList.contains('active')) {
            if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('active');
            }
        }
    });
    
    // Header scroll effect with throttling for performance
    const header = document.querySelector('.header');
    
    if (header) {
        let lastScrollTop = 0;
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            lastScrollTop = window.scrollY;
            
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (lastScrollTop > 50) {
                        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                        header.style.boxShadow = 'var(--shadow-md)';
                    } else {
                        header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                        header.style.boxShadow = 'var(--shadow-sm)';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // FAQ Accordion with keyboard accessibility
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                toggleFaqItem(item);
            });
            
            // Add keyboard support
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFaqItem(item);
                }
            });
        }
    });
    
    function toggleFaqItem(item) {
        const isExpanded = item.classList.contains('active');
        const question = item.querySelector('.faq-question');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
        question.setAttribute('aria-expanded', !isExpanded);
    }
    
    // Lazy load images that are below the fold
    lazyLoadImages();
    
    // Initialize the screenshots carousel
    initCarousel();
    
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(contactForm)) {
                submitForm(contactForm);
            }
        });
    }
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add smooth scroll to anchor links
    initSmoothScroll();
});

/**
 * Lazy load images to improve page load performance
 */
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
}

/**
 * Initialize the screenshots carousel with improved functionality
 */
function initCarousel() {
    const carousel = document.querySelector('.screenshots-carousel');
    const screenshots = document.querySelectorAll('.screenshot');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!carousel || screenshots.length === 0) return;
    
    let currentIndex = 0;
    const slideWidth = screenshots[0].offsetWidth + parseInt(window.getComputedStyle(screenshots[0]).marginRight);
    
    // Clear existing dots
    dotsContainer.innerHTML = '';
    
    // Create dots (one for each screenshot)
    screenshots.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        
        // Make dots more accessible
        dot.setAttribute('role', 'button');
        dot.setAttribute('tabindex', '0');
        dot.setAttribute('aria-label', `Go to screenshot ${index + 1}`);
        
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        
        // Add keyboard support
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(index);
            }
        });
        
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(Math.max(currentIndex - 1, 0));
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(Math.min(currentIndex + 1, screenshots.length - 1));
        });
    }
    
    // Add keyboard navigation for the carousel
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(Math.max(currentIndex - 1, 0));
        } else if (e.key === 'ArrowRight') {
            goToSlide(Math.min(currentIndex + 1, screenshots.length - 1));
        }
    });
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        
        // Announce to screen readers
        const liveRegion = document.getElementById('carousel-live-region') || createLiveRegion();
        liveRegion.textContent = `Showing screenshot ${index + 1} of ${screenshots.length}`;
    }
    
    // Update carousel position and active dot
    function updateCarousel() {
        // Smooth scroll to the target slide
        carousel.scrollTo({
            left: currentIndex * slideWidth,
            behavior: 'smooth'
        });
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
            dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
        });
        
        // Update button states
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
            prevBtn.setAttribute('aria-disabled', currentIndex === 0);
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex === screenshots.length - 1;
            nextBtn.setAttribute('aria-disabled', currentIndex === screenshots.length - 1);
        }
    }
    
    // Create a live region for screen reader announcements
    function createLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'carousel-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.className = 'sr-only'; // Screen reader only
        document.body.appendChild(liveRegion);
        return liveRegion;
    }
    
    // Handle carousel scroll events with debouncing
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollPosition = carousel.scrollLeft;
            const newIndex = Math.round(scrollPosition / slideWidth);
            
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < screenshots.length) {
                currentIndex = newIndex;
                
                // Update active dot
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                    dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
                });
                
                // Update button states
                if (prevBtn) {
                    prevBtn.disabled = currentIndex === 0;
                    prevBtn.setAttribute('aria-disabled', currentIndex === 0);
                }
                if (nextBtn) {
                    nextBtn.disabled = currentIndex === screenshots.length - 1;
                    nextBtn.setAttribute('aria-disabled', currentIndex === screenshots.length - 1);
                }
            }
        }, 100);
    });
    
    // Initial carousel setup
    updateCarousel();
    
    // Add touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, go to next slide
            goToSlide(Math.min(currentIndex + 1, screenshots.length - 1));
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, go to previous slide
            goToSlide(Math.max(currentIndex - 1, 0));
        }
    }
    
    // Auto-advance the carousel every 5 seconds
    let autoplayInterval;
    
    function startAutoplay() {
        stopAutoplay(); // Clear any existing interval
        autoplayInterval = setInterval(() => {
            // Go to next slide or back to beginning if at the end
            const nextIndex = currentIndex === screenshots.length - 1 ? 0 : currentIndex + 1;
            goToSlide(nextIndex);
        }, 5000);
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }
    
    // Start autoplay initially
    startAutoplay();
    
    // Pause autoplay when user interacts with carousel
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('touchstart', stopAutoplay);
    carousel.addEventListener('focus', stopAutoplay);
    
    // Resume autoplay when user stops interacting
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('touchend', startAutoplay);
    carousel.addEventListener('blur', startAutoplay);
}

/**
 * Form validation
 */
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            markInvalid(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
            markInvalid(input, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearInvalid(input);
        }
    });
    
    return isValid;
}

/**
 * Mark form field as invalid
 */
function markInvalid(input, message) {
    // Remove any existing error message
    clearInvalid(input);
    
    // Add error class to input
    input.classList.add('invalid');
    
    // Create and add error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.id = `${input.id}-error`;
    
    // Connect error message to input with aria-describedby
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errorMessage.id);
    
    // Insert error message after input
    input.parentNode.appendChild(errorMessage);
}

/**
 * Clear invalid state from form field
 */
function clearInvalid(input) {
    // Remove error class
    input.classList.remove('invalid');
    input.removeAttribute('aria-invalid');
    
    // Remove any existing error message
    const errorMessageId = input.getAttribute('aria-describedby');
    if (errorMessageId) {
        const errorMessage = document.getElementById(errorMessageId);
        if (errorMessage) {
            errorMessage.remove();
        }
        input.removeAttribute('aria-describedby');
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

/**
 * Form submission with success feedback
 */
function submitForm(form) {
    // In a real implementation, you would send the form data to your server here
    // For demo purposes, we'll just show a success message
    
    // Get form data
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());
    
    // Log form submission (for demo)
    console.log('Form submitted:', formValues);
    
    // Show success message
    form.innerHTML = `
        <div class="form-success" role="alert">
            <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--color-secondary); margin-bottom: 2rem;" aria-hidden="true"></i>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
        </div>
    `;
}

/**
 * Initialize scroll animations with Intersection Observer
 */
function initScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once animation is triggered
                }
            });
        }, options);
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            element.classList.add('visible');
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get header height to adjust scroll position
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Update URL hash without causing a jump
                history.pushState(null, null, targetId);
                
                // Set focus to the target element for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                
                // Remove tabindex after focus
                setTimeout(() => {
                    targetElement.removeAttribute('tabindex');
                }, 1000);
            }
        });
    });
}
// Add this at the end of your main.js file
document.addEventListener('DOMContentLoaded', function() {
    // Short delay to ensure the animation classes have been applied
    setTimeout(function() {
        console.log("Forcing animations to complete");
        
        // Force all animated elements to be visible
        document.querySelectorAll('.animate-on-scroll').forEach(function(element) {
            element.classList.add('visible');
            console.log("Made visible:", element);
        });
        
        // Specifically target About and Contact sections to ensure they're visible
        const aboutElements = document.querySelectorAll('.about .animate-on-scroll');
        const contactElements = document.querySelectorAll('.contact .animate-on-scroll');
        
        aboutElements.forEach(el => el.classList.add('visible'));
        contactElements.forEach(el => el.classList.add('visible'));
        
        console.log("About elements made visible:", aboutElements.length);
        console.log("Contact elements made visible:", contactElements.length);
    }, 500);
});