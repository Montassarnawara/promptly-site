class MetricsAnimations {
    constructor() {
        this.isAnimating = false;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupAnimations();
            });
        } else {
            this.setupAnimations();
        }
    }

    setupAnimations() {
        this.observeMetrics();
        this.animateOnLoad();
    }

    observeMetrics() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimating) {
                    this.isAnimating = true;
                    this.animateMetricCard(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -10% 0px'
        });

        const metricCards = document.querySelectorAll('.metric-card-enhanced');
        metricCards.forEach(card => {
            observer.observe(card);
        });
    }

    animateMetricCard(card) {
        const progressCircle = card.querySelector('.progress-circle');
        const valueElement = card.querySelector('.metric-value-big');
        
        if (!progressCircle || !valueElement) return;

        // Animate circle progress
        this.animateCircleProgress(progressCircle);
        
        // Animate value counting
        this.animateValueCounting(valueElement);
        
        // Add floating animation
        this.addFloatingAnimation(card);
    }

    animateCircleProgress(circle) {
        const totalLength = 502; // Circumference of the circle
        const targetOffset = parseFloat(circle.getAttribute('data-target')) || 0;
        
        let currentOffset = totalLength;
        const duration = 2500;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeProgress = this.easeOutCubic(progress);
            currentOffset = totalLength - (totalLength - targetOffset) * easeProgress;
            
            circle.style.strokeDashoffset = currentOffset;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    animateValueCounting(element) {
        const targetValue = parseFloat(element.getAttribute('data-target')) || 0;
        let currentValue = 0;
        const duration = 2000;
        const startTime = performance.now();
        
        // Determine the format based on content
        let isTime = element.textContent.includes('s');
        let isPercentage = element.textContent.includes('%');
        let isAES = element.textContent.includes('AES');

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeProgress = this.easeOutCubic(progress);
            currentValue = targetValue * easeProgress;
            
            if (isTime) {
                element.textContent = `< ${Math.ceil(currentValue)}s`;
            } else if (isPercentage) {
                element.textContent = `${currentValue.toFixed(1)}%`;
            } else if (isAES) {
                element.textContent = `AES-${Math.floor(currentValue)}`;
            } else {
                element.textContent = currentValue.toFixed(1);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    addFloatingAnimation(card) {
        // Add subtle floating animation
        card.style.animation = 'float 6s ease-in-out infinite';
        
        // Stagger the animation start for each card
        const cards = Array.from(document.querySelectorAll('.metric-card-enhanced'));
        const index = cards.indexOf(card);
        card.style.animationDelay = `${index * 0.5}s`;
    }

    animateOnLoad() {
        // Add staggered entrance animation
        const cards = document.querySelectorAll('.metric-card-enhanced');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 300 + 500); // Add delay to ensure page is loaded
        });

        // Animate indicators
        setTimeout(() => {
            this.animateIndicators();
        }, 1000);
    }

    animateIndicators() {
        const indicators = document.querySelectorAll('.indicator-pulse');
        
        indicators.forEach((indicator, index) => {
            indicator.style.animationDelay = `${index * 0.3}s`;
            
            // Add click interaction
            indicator.addEventListener('click', () => {
                this.pulseIndicator(indicator);
            });
        });
    }

    pulseIndicator(indicator) {
        indicator.style.animation = 'none';
        indicator.offsetHeight; // Trigger reflow
        indicator.style.animation = 'pulse 0.5s ease';
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
}

// Add enhanced animations and styles
const enhancedStyles = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-15px);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 20px rgba(79, 172, 254, 0.3);
        }
        50% {
            box-shadow: 0 0 30px rgba(79, 172, 254, 0.6);
        }
    }
    
    .metric-card-enhanced {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .metric-card-enhanced:hover {
        animation: glow 2s ease-in-out infinite;
    }
    
    .progress-circle {
        filter: drop-shadow(0 0 10px currentColor);
    }
`;

// Apply styles
const styleElement = document.createElement('style');
styleElement.textContent = enhancedStyles;
document.head.appendChild(styleElement);

// Initialize the animations
new MetricsAnimations();
