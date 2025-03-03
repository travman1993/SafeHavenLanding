/**
 * SafeHaven Landing Page Animation JavaScript
 * Handles more complex animations and scroll effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to sections
    setupSectionAnimations();
    
    // Add parallax effect
    setupParallax();
    
    // Add feature card hover effects
    setupFeatureHoverEffects();
});

/**
 * Set up animation classes for major page sections
 */
function setupSectionAnimations() {
    // Select all section headers and add animation classes
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('animate-on-scroll', 'slide-up');
    });
    
    // Features section
    const featureSection = document.querySelector('.features');
    if (featureSection) {
        const featureCards = featureSection.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            // Alternate between slide-left and slide-right
            if (index % 2 === 0) {
                card.classList.add('animate-on-scroll', 'slide-left');
            } else {
                card.classList.add('animate-on-scroll', 'slide-right');
            }
        });
    }
    
    // About section
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        const aboutImage = aboutSection.querySelector('.about-image');
        const aboutText = aboutSection.querySelector('.about-text');
        
        if (aboutImage) aboutImage.classList.add('animate-on-scroll', 'slide-left');
        if (aboutText) aboutText.classList.add('animate-on-scroll', 'slide-right');
    }
    
    // Premium section
    const premiumSection = document.querySelector('.premium');
    if (premiumSection) {
        const premiumFeatures = premiumSection.querySelectorAll('.premium-feature');
        premiumFeatures.forEach(feature => {
            feature.classList.add('animate-on-scroll', 'fade-in');
        });
    }
    
    // FAQ section
    const faqSection = document.querySelector('.faq');
    if (faqSection) {
        const faqItems = faqSection.querySelectorAll('.faq-item');
        faqItems.forEach((item, index) => {
            // Add delay based on index
            item.style.transitionDelay = `${0.1 * index}s`;
            item.classList.add('animate-on-scroll', 'slide-up');
        });
    }
    
    // Contact section
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
        const contactForm = contactSection.querySelector('.contact-form-container');
        const contactInfo = contactSection.querySelector('.contact-info');
        
        if (contactForm) contactForm.classList.add('animate-on-scroll', 'slide-left');
        if (contactInfo) contactInfo.classList.add('animate-on-scroll', 'slide-right');
    }
}

/**
 * Set up parallax scrolling effects
 */
function setupParallax() {
    // Hero section parallax
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroSection && heroImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const parallaxOffset = scrollPosition * 0.2; // Adjust speed as needed
            
            // Apply parallax effect only when hero section is visible
            if (scrollPosition < heroSection.offsetHeight) {
                heroImage.style.transform = `translateY(${parallaxOffset}px)`;
            }
        });
    }
    
    // Premium section background movement
    const premiumSection = document.querySelector('.premium');
    
    if (premiumSection) {
        window.addEventListener('scroll', function() {
            const rect = premiumSection.getBoundingClientRect();
            const isVisible = (
                rect.top < window.innerHeight &&
                rect.bottom >= 0
            );
            
            if (isVisible) {
                const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const moveAmount = 50 * (scrollProgress - 0.5);
                
                premiumSection.style.backgroundPosition = `${50 + moveAmount}% 50%`;
            }
        });
    }
}

/**
 * Set up hover effects for feature cards
 */
function setupFeatureHoverEffects() {
    const featureCards = document.querySelectorAll('.feature-card');
    const premiumFeatures = document.querySelectorAll('.premium-feature');
    
    // Feature cards hover effect
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle glow effect
            this.style.boxShadow = '0 8px 30px rgba(106, 137, 204, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Restore original shadow
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });
    
    // Premium features hover effect
    premiumFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            // Add subtle scale effect
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        feature.addEventListener('mouseleave', function() {
            // Restore original state
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // App Store button hover effect
    const appStoreButtons = document.querySelectorAll('.app-store-btn');
    
    appStoreButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.filter = 'brightness(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.filter = 'brightness(1)';
        });
    });
}

/**
 * Add a typewriter effect to the hero headline
 * (Called on page load)
 */
(function setupTypewriterEffect() {
    const heroHeadline = document.querySelector('.hero-text h1');
    
    if (!heroHeadline) return;
    
    const originalText = heroHeadline.textContent;
    heroHeadline.textContent = '';
    
    let charIndex = 0;
    const typingSpeed = 50; // milliseconds per character
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            heroHeadline.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start the typing effect after a short delay
    setTimeout(typeWriter, 500);
})();

/**
 * Add a scroll indicator
 */
(function addScrollIndicator() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    // Create scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.classList.add('scroll-indicator');
    scrollIndicator.innerHTML = `
        <div class="scroll-icon">
            <i class="fas fa-chevron-down"></i>
        </div>
        <span>Scroll to explore</span>
    `;
    
    // Style the scroll indicator
    scrollIndicator.style.position = 'absolute';
    scrollIndicator.style.bottom = '30px';
    scrollIndicator.style.left = '50%';
    scrollIndicator.style.transform = 'translateX(-50%)';
    scrollIndicator.style.textAlign = 'center';
    scrollIndicator.style.color = 'var(--color-primary)';
    scrollIndicator.style.opacity = '0';
    scrollIndicator.style.animation = 'fadeIn 1s ease-out 2s forwards';
    
    // Style the icon
    const scrollIcon = scrollIndicator.querySelector('.scroll-icon');
    scrollIcon.style.width = '40px';
    scrollIcon.style.height = '40px';
    scrollIcon.style.margin = '0 auto 10px';
    scrollIcon.style.borderRadius = '50%';
    scrollIcon.style.background = 'rgba(255, 255, 255, 0.9)';
    scrollIcon.style.display = 'flex';
    scrollIcon.style.alignItems = 'center';
    scrollIcon.style.justifyContent = 'center';
    scrollIcon.style.boxShadow = 'var(--shadow-sm)';
    scrollIcon.style.animation = 'pulse 2s infinite';
    
    // Append to hero
    hero.appendChild(scrollIndicator);
    
    // Hide on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
})();