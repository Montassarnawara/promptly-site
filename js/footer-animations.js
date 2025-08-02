// Footer Animations and Interactions
class FooterAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupCopyrightYear();
        this.setupSocialLinks();
    }

    setupScrollAnimations() {
        const footer = document.querySelector('.footer');
        const footerContent = document.querySelector('.footer-content');
        
        if (!footer || !footerContent) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateFooterEntry();
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(footer);
    }

    animateFooterEntry() {
        const footerBrand = document.querySelector('.footer-brand');
        const footerLinks = document.querySelectorAll('.footer-links a');
        const socialLinks = document.querySelectorAll('.footer-social a');

        // Animate brand
        if (footerBrand) {
            footerBrand.style.opacity = '0';
            footerBrand.style.transform = 'translateY(30px)';
            footerBrand.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                footerBrand.style.opacity = '1';
                footerBrand.style.transform = 'translateY(0)';
            }, 100);
        }

        // Animate links with stagger effect
        footerLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            link.style.transition = 'all 0.4s ease';
            
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 200 + (index * 50));
        });

        // Animate social links
        socialLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'scale(0.8)';
            link.style.transition = 'all 0.4s ease';
            
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'scale(1)';
            }, 400 + (index * 100));
        });
    }

    setupHoverEffects() {
        const footerLinks = document.querySelectorAll('.footer-links a');
        
        footerLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.createLinkRipple(link);
            });
        });
    }

    createLinkRipple(element) {
        const ripple = document.createElement('span');
        ripple.classList.add('link-ripple');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            left: 0;
            top: 50%;
            width: ${size}px;
            height: 2px;
            background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
            transform: translateY(-50%) scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.transform = 'translateY(-50%) scaleX(1)';
        }, 10);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 300);
    }

    setupCopyrightYear() {
        const yearElement = document.querySelector('.copyright-year');
        if (yearElement) {
            // Add glowing animation to current year
            yearElement.style.cssText += `
                animation: yearGlow 2s ease-in-out infinite alternate;
            `;
            
            // Add CSS for year glow animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes yearGlow {
                    0% { 
                        text-shadow: 0 0 5px var(--color-primary); 
                        color: var(--color-primary); 
                    }
                    100% { 
                        text-shadow: 0 0 15px var(--color-primary), 0 0 25px var(--color-secondary); 
                        color: var(--color-secondary); 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupSocialLinks() {
        const socialLinks = document.querySelectorAll('.footer-social a');
        
        socialLinks.forEach((link, index) => {
            // Add unique hover colors for each social platform
            const platform = link.classList.contains('linkedin') ? 'linkedin' :
                           link.classList.contains('twitter') ? 'twitter' :
                           link.classList.contains('github') ? 'github' : 'default';
            
            link.addEventListener('mouseenter', () => {
                this.applySocialHover(link, platform);
            });
            
            link.addEventListener('mouseleave', () => {
                this.removeSocialHover(link);
            });
            
            // Add click ripple effect
            link.addEventListener('click', (e) => {
                this.createSocialRipple(e, link);
            });
        });
    }

    applySocialHover(element, platform) {
        const colors = {
            linkedin: '#0077b5',
            twitter: '#1da1f2',
            github: '#333',
            default: 'var(--color-primary)'
        };
        
        element.style.background = colors[platform];
        element.style.transform = 'translateY(-3px) scale(1.1) rotate(5deg)';
    }

    removeSocialHover(element) {
        element.style.background = '';
        element.style.transform = '';
    }

    createSocialRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: socialRipple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        // Add CSS animation for social ripple
        if (!document.querySelector('#social-ripple-style')) {
            const style = document.createElement('style');
            style.id = 'social-ripple-style';
            style.textContent = `
                @keyframes socialRipple {
                    to {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }
}

// Initialize footer animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FooterAnimations();
});

// Add smooth scrolling for footer links
document.addEventListener('DOMContentLoaded', () => {
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add a small highlight effect to the target section
                targetElement.style.transition = 'all 0.3s ease';
                targetElement.style.transform = 'scale(1.02)';
                
                setTimeout(() => {
                    targetElement.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });
});
