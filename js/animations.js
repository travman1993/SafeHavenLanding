/**
 * SafeHaven Landing Page Animation JavaScript
 * Handles more complex animations and scroll effects
 * - Optimized for performance
 * - Added IntersectionObserver for better scroll handling
 * - Improved animation timing
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to sections
    setupSectionAnimations();
    
    // Add parallax effect (with performance optimizations)
    setupParallax();
    
    // Add feature card hover effects
    setupFeatureHoverEffects();
    
    // Add typewriter effect to hero headline (after a short delay)
    setTimeout(() => {
        setupTypewriterEffect();
    }, 500);
    
    // Add scroll indicator
    addScrollIndicator();
});

/**
 * Set up animation classes for major page sections
 * Uses IntersectionObserver for better performance
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
            
            // Add staggered delay based on index
            card.style.transitionDelay = `${0.1 * index}s`;
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
        premiumFeatures.forEach((feature, index) => {
            feature.classList.add('animate-on-scroll', 'fade-in');
            feature.style.transitionDelay = `${0.1 * index}s`;
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
 * Set up parallax scrolling effects with performance optimizations
 */
function setupParallax() {
    // Hero section parallax
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroSection && heroImage) {
        // Use requestAnimationFrame for smooth performance
        let ticking = false;
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            lastScrollY = window.scrollY;
            
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    // Apply parallax effect only when hero section is visible
                    if (lastScrollY < heroSection.offsetHeight) {
                        const parallaxOffset = lastScrollY * 0.2; // Adjust speed as needed
                        heroImage.style.transform = `translateY(${parallaxOffset}px)`;
                    }
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
    
    // Premium section background movement with IntersectionObserver
    const premiumSection = document.querySelector('.premium');
    
    if (premiumSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start observing scroll for this section
                    startPremiumParallax();
                } else {
                    // Stop observing scroll when section is not visible
                    stopPremiumParallax();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(premiumSection);
        
        let premiumScrollListener;
        let premiumTicking = false;
        
        function startPremiumParallax() {
            premiumScrollListener = function() {
                if (!premiumTicking) {
                    window.requestAnimationFrame(function() {
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
                        
                        premiumTicking = false;
                    });
                    
                    premiumTicking = true;
                }
            };
            
            window.addEventListener('scroll', premiumScrollListener);
        }
        
        function stopPremiumParallax() {
            if (premiumScrollListener) {
                window.removeEventListener('scroll', premiumScrollListener);
            }
        }
    }
}

/**
 * Set up hover effects for feature cards with improved performance
 */
function setupFeatureHoverEffects() {
    // We'll use CSS transitions for most hover effects to leverage GPU acceleration
    // This function will only add special effects not possible with pure CSS
    
    // Add hover class to identify touch devices vs mouse devices
    document.body.addEventListener('touchstart', function() {
        document.body.classList.add('touch-device');
    }, { once: true });
    
    document.body.addEventListener('mouseover', function() {
        document.body.classList.add('mouse-device');
    }, { once: true });
    
    // Add interactive elements that need special effects
    const appStoreButtons = document.querySelectorAll('.app-store-btn');
    
    appStoreButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.animation = 'pulse 2s infinite';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.animation = '';
            }
        });
    });
}

/**
 * Add a typewriter effect to the hero headline
 */
function setupTypewriterEffect() {
    const heroHeadline = document.querySelector('.hero-text h1');
    
    if (!heroHeadline) return;
    
    const originalText = heroHeadline.textContent;
    heroHeadline.textContent = '';
    heroHeadline.setAttribute('aria-label', originalText);
    
    let charIndex = 0;
    const typingSpeed = 40; // milliseconds per character
    const typingEffect = document.createElement('span');
    const cursor = document.createElement('span');
    
    // Setup cursor
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    cursor.style.animation = 'blink 1s step-end infinite';
    
    // Add elements to DOM
    heroHeadline.appendChild(typingEffect);
    heroHeadline.appendChild(cursor);
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            typingEffect.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                cursor.style.display = 'none';
            }, 1500);
        }
    }
    
    // Start typing
    setTimeout(typeWriter, 300);
}

/**
 * Add a scroll indicator that disappears on scroll
 */
function addScrollIndicator() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    // Check if indicator already exists (avoid duplicates on hot reloads)
    if (document.querySelector('.scroll-indicator')) return;
    
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
    scrollIndicator.style.color = 'white';
    scrollIndicator.style.opacity = '0';
    scrollIndicator.style.animation = 'fadeIn 1s ease-out 2s forwards';
    scrollIndicator.style.zIndex = '10';
    scrollIndicator.setAttribute('aria-hidden', 'true'); // Hide from screen readers
    
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
    scrollIcon.style.transition = 'transform 0.3s ease';
    
    // Style the icon's inner element
    const iconInner = scrollIcon.querySelector('i');
    iconInner.style.color = 'var(--color-primary)';
    iconInner.style.animation = 'bounce 2s infinite';
    
    // Append to hero
    hero.appendChild(scrollIndicator);
    
    // Hide on scroll using IntersectionObserver for better performance
    if ('IntersectionObserver' in window) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Show when hero is visible and near top
                    scrollIndicator.style.opacity = '1';
                } else {
                    // Hide when scrolled away from hero
                    scrollIndicator.style.opacity = '0';
                }
            });
        }, { 
            threshold: 0.7, // Only show when most of hero is visible
            rootMargin: '0px 0px -100px 0px' // Consider hero "exited" a bit early
        });
        
        heroObserver.observe(hero);
    } else {
        // Fallback for browsers without IntersectionObserver
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        }, { passive: true });
    }
}