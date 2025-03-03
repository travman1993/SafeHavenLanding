/**
 * SafeHaven Landing Page Main JavaScript
 * Handles navigation, FAQ toggles, form submission, and other UI interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Screenshots carousel
    initCarousel();
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Normally you would send the form data to your server here
            // For demo purposes, we'll just show a success message
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Log form submission (for demo)
            console.log('Form submitted:', formValues);
            
            // Show success message
            contactForm.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--color-secondary); margin-bottom: 2rem;"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
                </div>
            `;
        });
    }
    
    // Scroll animations
    initScrollAnimations();
});

/**
 * Initialize the screenshots carousel
 */
function initCarousel() {
    const carousel = document.querySelector('.screenshots-carousel');
    const screenshots = document.querySelectorAll('.screenshot');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!carousel || screenshots.length === 0) return;
    
    let currentIndex = 0;
    const slideWidth = screenshots[0].offsetWidth;
    
    // Create dots
    screenshots.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateCarousel();
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, screenshots.length - 1);
        updateCarousel();
    });
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Update carousel position and active dot
    function updateCarousel() {
        // Update carousel position
        carousel.scrollTo({
            left: currentIndex * (slideWidth + 20), // 20px is the gap
            behavior: 'smooth'
        });
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Handle carousel scroll
    carousel.addEventListener('scroll', () => {
        const scrollPosition = carousel.scrollLeft;
        const newIndex = Math.round(scrollPosition / (slideWidth + 20));
        
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            
            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
    });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Add .visible class to elements in viewport
    function checkVisibility() {
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
}