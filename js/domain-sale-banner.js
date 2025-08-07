// ====================================
//  NEWS TICKER BAR CONTROLLER
// ====================================

class NewsTickerBar {
    constructor() {
        this.ticker = null;
        this.isVisible = true;
        this.messages = [
            '⚡ Domaine Premium à Vendre: promptly.codes - Investissement Tech Rare - Prix Négociable',
            '💎 Opportunité Unique pour Développeurs et Entreprises Tech - promptly.codes disponible',
            '🚀 Nom de Domaine Parfait pour vos Projets IA et Développement - promptly.codes',
            '⭐ Achat Sécurisé via Afternic - Transfert Rapide et Professionnel',
            '🔥 Ne Manquez Pas Cette Occasion - promptly.codes - Contactez-nous Maintenant!'
        ];
        this.currentMessageIndex = 0;
        this.initTicker();
    }

    initTicker() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupTicker());
        } else {
            this.setupTicker();
        }
    }

    setupTicker() {
        this.ticker = document.querySelector('.news-ticker-bar');
        if (!this.ticker) return;

        this.setupTickerInteractions();
        this.startMessageRotation();
        this.addTickerEffects();
    }

    setupTickerInteractions() {
        // Track ticker clicks
        const tickerBtn = this.ticker.querySelector('.ticker-btn');
        if (tickerBtn) {
            tickerBtn.addEventListener('click', () => {
                this.trackTickerClick();
                
                // Add click effect
                tickerBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    tickerBtn.style.transform = 'scale(1)';
                }, 150);
            });
        }

        // Pause animation on hover
        const tickerText = this.ticker.querySelector('.ticker-text');
        if (tickerText) {
            this.ticker.addEventListener('mouseenter', () => {
                tickerText.style.animationPlayState = 'paused';
            });

            this.ticker.addEventListener('mouseleave', () => {
                tickerText.style.animationPlayState = 'running';
            });
        }
    }

    startMessageRotation() {
        // Change message every 45 seconds (duration of one scroll)
        setInterval(() => {
            this.rotateMessage();
        }, 45000);
    }

    rotateMessage() {
        this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
        const tickerText = this.ticker.querySelector('.ticker-text');
        
        if (tickerText) {
            // Add fade transition
            tickerText.style.opacity = '0';
            
            setTimeout(() => {
                tickerText.textContent = this.messages[this.currentMessageIndex];
                tickerText.style.opacity = '1';
            }, 500);
        }
    }

    addTickerEffects() {
        // Add glowing effect to breaking news
        const breakingNews = this.ticker.querySelector('.breaking-news');
        if (breakingNews) {
            setInterval(() => {
                breakingNews.style.textShadow = '0 0 20px #ff6b6b, 0 2px 4px rgba(0, 0, 0, 0.5)';
                setTimeout(() => {
                    breakingNews.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.5)';
                }, 1000);
            }, 3000);
        }

        // Add dynamic border effect
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            this.ticker.style.borderTopColor = `hsl(${hue}, 70%, 60%)`;
        }, 100);
    }

    trackTickerClick() {
        console.log('📺 News Ticker: Domain sale link clicked');
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'ticker_click', {
                'event_category': 'domain_sale',
                'event_label': 'news_ticker_bar',
                'value': 1
            });
        }
    }

    hideTicker() {
        if (this.ticker) {
            this.ticker.style.transform = 'translateY(100%)';
            this.isVisible = false;
        }
    }

    showTicker() {
        if (this.ticker) {
            this.ticker.style.transform = 'translateY(0)';
            this.isVisible = true;
        }
    }
}

// ====================================
//  DOMAIN SALE BANNER CONTROLLER
// ====================================

class DomainSaleBanner {
    constructor() {
        this.banner = null;
        this.isVisible = false;
        this.initBanner();
    }

    initBanner() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupBanner());
        } else {
            this.setupBanner();
        }
    }

    setupBanner() {
        this.banner = document.getElementById('saleBanner');
        if (!this.banner) return;

        // Set up click tracking
        this.trackBannerClicks();
        
        // Auto-show banner after page load
        setTimeout(() => this.showBanner(), 3000);
        
        // Auto-hide banner after some time (optional)
        setTimeout(() => this.autoHideBanner(), 15000);
        
        // Re-show banner periodically (every 2 minutes)
        setInterval(() => this.periodicShow(), 120000);
    }

    showBanner() {
        if (!this.banner || this.isVisible) return;
        
        this.banner.style.display = 'block';
        this.isVisible = true;
        
        // Add entrance animation
        setTimeout(() => {
            this.banner.classList.add('banner-visible');
        }, 100);
        
        // Track banner impression
        this.trackBannerView();
    }

    hideBanner() {
        if (!this.banner || !this.isVisible) return;
        
        this.banner.style.transform = 'translateY(-50%) translateX(400px)';
        this.banner.style.opacity = '0';
        
        setTimeout(() => {
            this.banner.style.display = 'none';
            this.isVisible = false;
        }, 500);
    }

    autoHideBanner() {
        // Auto-hide only if user hasn't interacted
        if (this.isVisible && !this.banner.dataset.userInteracted) {
            this.hideBanner();
        }
    }

    periodicShow() {
        // Show banner periodically if not manually closed
        if (!this.isVisible && !this.banner.dataset.userClosed) {
            this.showBanner();
        }
    }

    trackBannerClicks() {
        if (!this.banner) return;

        // Track sale button clicks
        const saleBtn = this.banner.querySelector('.sale-btn');
        if (saleBtn) {
            saleBtn.addEventListener('click', () => {
                this.trackBannerClick('sale_button');
                this.banner.dataset.userInteracted = 'true';
                
                // Add click animation
                saleBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    saleBtn.style.transform = 'scale(1)';
                }, 150);
            });
        }

        // Track close button clicks
        const closeBtn = this.banner.querySelector('.banner-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.trackBannerClick('close_button');
                this.banner.dataset.userClosed = 'true';
                this.hideBanner();
            });
        }

        // Track banner hover
        this.banner.addEventListener('mouseenter', () => {
            this.trackBannerHover();
            this.banner.dataset.userInteracted = 'true';
        });
    }

    trackBannerView() {
        // Analytics tracking for banner impression
        console.log('🔥 Domain Sale Banner Viewed');
        
        // Google Analytics tracking (if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'banner_impression', {
                'event_category': 'domain_sale',
                'event_label': 'promptly_codes'
            });
        }
    }

    trackBannerClick(action) {
        console.log(`🎯 Domain Sale Banner: ${action} clicked`);
        
        // Google Analytics tracking (if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'banner_click', {
                'event_category': 'domain_sale',
                'event_label': action,
                'value': action === 'sale_button' ? 1 : 0
            });
        }
    }

    trackBannerHover() {
        console.log('👀 Domain Sale Banner: User hovered');
        
        // Google Analytics tracking (if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'banner_hover', {
                'event_category': 'domain_sale',
                'event_label': 'user_interest'
            });
        }
    }
}

// Global function for closing banner (called from HTML)
function closeSaleBanner() {
    if (window.domainSaleBanner) {
        window.domainSaleBanner.hideBanner();
    }
}

// Enhanced banner effects
function addEnhancedBannerEffects() {
    const banner = document.getElementById('saleBanner');
    if (!banner) return;

    // Add magnetic effect on hover
    banner.addEventListener('mousemove', (e) => {
        const rect = banner.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        banner.style.transform = `translateY(-50%) perspective(1000px) rotateY(${deltaX * 5}deg) rotateX(${-deltaY * 5}deg)`;
    });

    banner.addEventListener('mouseleave', () => {
        banner.style.transform = 'translateY(-50%)';
    });

    // Add particle effects on click
    const saleBtn = banner.querySelector('.sale-btn');
    if (saleBtn) {
        saleBtn.addEventListener('click', (e) => {
            createClickParticles(e);
        });
    }
}

function createClickParticles(event) {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #ffeb3b;
            border-radius: 50%;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            animation: particleExplode 0.6s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;
        
        event.target.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Add particle explosion animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleExplode {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize both ticker and banner when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.newsTickerBar = new NewsTickerBar();
    window.domainSaleBanner = new DomainSaleBanner();
    addEnhancedBannerEffects();
});

// Responsive behavior
window.addEventListener('resize', () => {
    const banner = document.getElementById('saleBanner');
    if (banner && window.innerWidth < 480) {
        banner.style.width = '280px';
    } else if (banner && window.innerWidth < 768) {
        banner.style.width = '320px';
    } else if (banner) {
        banner.style.width = '380px';
    }
});
