// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Navigation link clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const sectionId = href.substring(1);
                scrollToSection(sectionId);
            }
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Button clicks
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const onclick = this.getAttribute('onclick');
            if (onclick && onclick.includes('scrollToSection')) {
                const sectionId = onclick.match(/scrollToSection\('([^']+)'\)/)[1];
                scrollToSection(sectionId);
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.feature-card, .tech-category, .timeline-item, .contact-item, .info-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Demo functionality
    setupDemo();

    // Contact form
    setupContactForm();

    // Initialize floating animations
    initializeFloatingAnimations();
});

// Demo Analysis Functionality
function setupDemo() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const demoText = document.getElementById('demoText');
    const analysisResult = document.getElementById('analysisResult');

    if (analyzeBtn && demoText && analysisResult) {
        analyzeBtn.addEventListener('click', function() {
            const text = demoText.value.trim();
            
            if (!text) {
                showMessage('Veuillez saisir un texte à analyser.', 'warning');
                return;
            }

            // Show loading state
            analyzeBtn.disabled = true;
            analyzeBtn.innerHTML = '<div class="loading"></div> Analyse en cours...';
            
            // Simulate API call
            setTimeout(() => {
                const result = analyzeText(text);
                displayAnalysisResult(result);
                
                // Reset button
                analyzeBtn.disabled = false;
                analyzeBtn.innerHTML = '<i class="fas fa-search"></i> Analyser le Texte';
            }, 2000);
        });

        // Real-time character count (optional enhancement)
        demoText.addEventListener('input', function() {
            const charCount = this.value.length;
            const maxChars = 500;
            
            if (charCount > maxChars) {
                this.value = this.value.substring(0, maxChars);
            }
        });
    }
}

// Text analysis simulation
function analyzeText(text) {
    // This is a simulation. In a real application, you would call your API here.
    const words = text.toLowerCase();
    
    // Simple keyword-based analysis for demo purposes
    const aggressiveWords = ['stupide', 'idiot', 'crétin', 'imbécile', 'nul', 'pathétique'];
    const positiveWords = ['merci', 'excellent', 'fantastique', 'super', 'génial', 'parfait'];
    
    let aggressiveCount = 0;
    let positiveCount = 0;
    
    aggressiveWords.forEach(word => {
        if (words.includes(word)) aggressiveCount++;
    });
    
    positiveWords.forEach(word => {
        if (words.includes(word)) positiveCount++;
    });

    let severity, confidence, classification, description;
    
    if (aggressiveCount > 0) {
        severity = aggressiveCount > 2 ? 'danger' : 'warning';
        confidence = Math.min(85 + (aggressiveCount * 10), 95);
        classification = aggressiveCount > 2 ? 'Agression détectée' : 'Contenu potentiellement problématique';
        description = `Le texte contient ${aggressiveCount} terme(s) potentiellement agressif(s). Une modération est recommandée.`;
    } else if (positiveCount > 0) {
        severity = 'safe';
        confidence = Math.min(90 + (positiveCount * 5), 98);
        classification = 'Contenu positif';
        description = 'Le texte exprime des sentiments positifs et ne contient pas d\'agression verbale.';
    } else {
        severity = 'safe';
        confidence = Math.random() * 20 + 75; // 75-95%
        classification = 'Contenu neutre';
        description = 'Le texte analysé ne présente pas de signes d\'agression verbale.';
    }

    return {
        severity,
        confidence: Math.round(confidence),
        classification,
        description,
        keywords: aggressiveCount > 0 ? aggressiveWords.filter(word => words.includes(word)) : [],
        sentiment: positiveCount > aggressiveCount ? 'positive' : aggressiveCount > 0 ? 'negative' : 'neutral'
    };
}

// Display analysis results
function displayAnalysisResult(result) {
    const analysisResult = document.getElementById('analysisResult');
    
    const severityClass = `severity-${result.severity}`;
    const severityText = {
        'safe': 'Sûr',
        'warning': 'Attention',
        'danger': 'Risque élevé'
    };

    const html = `
        <div class="analysis-result-panel">
            <div class="severity-level ${severityClass}">
                ${severityText[result.severity]}
            </div>
            
            <h4>Classification: ${result.classification}</h4>
            
            <div style="margin: 1rem 0;">
                <label style="font-size: 0.9rem; color: #6b7280;">Niveau de confiance: ${result.confidence}%</label>
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${result.confidence}%"></div>
                </div>
            </div>
            
            <div class="analysis-details">
                <h4>Analyse détaillée</h4>
                <p>${result.description}</p>
                
                ${result.keywords.length > 0 ? `
                    <div style="margin-top: 1rem;">
                        <strong>Mots-clés détectés:</strong>
                        <div style="margin-top: 0.5rem;">
                            ${result.keywords.map(keyword => 
                                `<span style="background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; margin-right: 8px;">${keyword}</span>`
                            ).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div style="margin-top: 1rem; font-size: 0.9rem; color: #6b7280;">
                    <strong>Sentiment général:</strong> 
                    <span style="text-transform: capitalize;">${result.sentiment}</span>
                </div>
            </div>
        </div>
    `;
    
    analysisResult.innerHTML = html;
    
    // Animate the confidence bar
    setTimeout(() => {
        const confBar = analysisResult.querySelector('.confidence-fill');
        if (confBar) {
            confBar.style.width = '0%';
            setTimeout(() => {
                confBar.style.width = `${result.confidence}%`;
            }, 100);
        }
    }, 100);
}

// Contact form functionality
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showMessage('Veuillez remplir tous les champs.', 'warning');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Veuillez saisir une adresse email valide.', 'warning');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<div class="loading"></div> Envoi en cours...';
            
            setTimeout(() => {
                showMessage('Message envoyé avec succès ! Nous vous répondrons bientôt.', 'success');
                contactForm.reset();
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le Message';
            }, 2000);
        });
    }
}

// Utility functions
function showMessage(message, type = 'info') {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.innerHTML = `
        <div style="
            position: fixed;
            top: 90px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        ">
            ${message}
        </div>
    `;
    
    document.body.appendChild(messageEl);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize floating animations
function initializeFloatingAnimations() {
    // Add subtle floating animation to cards
    const cards = document.querySelectorAll('.feature-card, .tech-category');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 0 0 8px 8px;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy loading for animations
function lazyLoadAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        animationObserver.observe(el);
    });
}

// Initialize lazy loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadAnimations);
} else {
    lazyLoadAnimations();
}

// Export functions for external use (if needed)
window.VerbShieldDemo = {
    scrollToSection,
    analyzeText,
    showMessage
};
