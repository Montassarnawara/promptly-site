// === Enhanced Script with Modern Animations ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 VerbShield AI - System Initialized');
    
    // Initialize all modules
    initNavigation();
    initAnimations();
    initDemo();
    initContactForm();
    initModuleCards();
    initScrollAnimations();
    initHeroBanner();
});

// === Navigation Enhancement ===
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Smooth scroll navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Smooth scroll with enhanced easing
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                updateActiveNavLink(link);
            }
        });
    });
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// === Hero Banner Animations ===
function initHeroBanner() {
    const heroCard = document.querySelector('.floating-card');
    const waves = document.querySelectorAll('.wave');
    const statusIndicator = document.querySelector('.status-indicator');
    const confidence = document.querySelector('.confidence');
    
    // Floating card animation
    if (heroCard) {
        let mouseX = 0, mouseY = 0;
        let cardX = 0, cardY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        });
        
        function animateCard() {
            cardX += (mouseX - cardX) * 0.1;
            cardY += (mouseY - cardY) * 0.1;
            
            heroCard.style.transform = `translate(${cardX}px, ${cardY}px) rotateX(${cardY * 0.5}deg) rotateY(${cardX * 0.5}deg)`;
            requestAnimationFrame(animateCard);
        }
        animateCard();
    }
    
    // Wave animation enhancement
    waves.forEach((wave, index) => {
        wave.style.animationDelay = `${index * 0.1}s`;
        wave.style.animationDuration = `${1.5 + index * 0.2}s`;
    });
    
    // Status indicator animation
    if (statusIndicator) {
        setInterval(() => {
            statusIndicator.classList.toggle('processing');
        }, 3000);
    }
    
    // Confidence counter animation
    if (confidence) {
        animateCounter(confidence, 98.5, '%', 'Confiance: ');
    }
}

// === Module Cards Interactive Animations ===
function initModuleCards() {
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach((card, index) => {
        // Add hover sound effect simulation
        card.addEventListener('mouseenter', () => {
            console.log(`🔊 Module ${index + 1} activated`);
            
            // Add active state
            card.classList.add('module-active');
            
            // Create ripple effect
            createRippleEffect(card);
            
            // Animate specs
            const specs = card.querySelectorAll('.spec');
            specs.forEach((spec, i) => {
                setTimeout(() => {
                    spec.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        spec.style.transform = 'scale(1)';
                    }, 200);
                }, i * 100);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('module-active');
        });
        
        // Click interaction
        card.addEventListener('click', () => {
            showModuleDetails(card, index);
        });
    });
}

function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        pointer-events: none;
        width: 20px;
        height: 20px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple 0.6s ease-out;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function showModuleDetails(card, index) {
    const moduleName = card.querySelector('h4').textContent;
    const moduleIcon = card.querySelector('.module-icon i').className;
    
    // Create modal or tooltip with enhanced details
    console.log(`📋 Affichage des détails du ${moduleName}`);
    
    // Add visual feedback
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
}

// === Scroll Animations ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('metric-card')) {
                    animateMetricCard(entry.target);
                } else if (entry.target.classList.contains('flow-phase')) {
                    animateFlowPhase(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.module-card, .flow-phase, .metric-card, .feature-card').forEach(el => {
        observer.observe(el);
    });
}

function animateMetricCard(card) {
    const value = card.querySelector('.metric-value');
    if (value && value.textContent.includes('%')) {
        const targetValue = parseFloat(value.textContent);
        animateCounter(value, targetValue, '%', '');
    } else if (value && value.textContent.includes('s')) {
        const text = value.textContent;
        value.textContent = '0s';
        setTimeout(() => {
            value.textContent = text;
        }, 500);
    }
}

function animateFlowPhase(phase) {
    const number = phase.querySelector('.phase-number');
    const details = phase.querySelectorAll('.detail');
    
    // Animate phase number
    if (number) {
        number.style.transform = 'scale(0)';
        number.style.animation = 'none';
        setTimeout(() => {
            number.style.transform = 'scale(1)';
            number.style.animation = 'pulse 2s infinite';
        }, 200);
    }
    
    // Animate details sequentially
    details.forEach((detail, index) => {
        detail.style.opacity = '0';
        detail.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            detail.style.opacity = '1';
            detail.style.transform = 'translateX(0)';
            detail.style.transition = 'all 0.3s ease';
        }, 300 + index * 100);
    });
}

// === Enhanced Demo System ===
function initDemo() {
    const demoText = document.getElementById('demoText');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const analysisResult = document.getElementById('analysisResult');
    
    if (!demoText || !analyzeBtn || !analysisResult) return;
    
    // Sample texts for demonstration
    const sampleTexts = [
        "Bonjour, comment allez-vous aujourd'hui ?",
        "Je ne suis pas d'accord avec cette décision mais je respecte votre avis.",
        "Excellent travail sur ce projet, félicitations !",
        "Pouvez-vous m'expliquer cette procédure s'il vous plaît ?",
        "Merci beaucoup pour votre aide, c'est très apprécié."
    ];
    
    // Add placeholder text rotation
    let textIndex = 0;
    setInterval(() => {
        if (demoText.value === '') {
            demoText.placeholder = `Exemple: ${sampleTexts[textIndex]}`;
            textIndex = (textIndex + 1) % sampleTexts.length;
        }
    }, 3000);
    
    // Enhanced analyze button
    analyzeBtn.addEventListener('click', () => {
        const text = demoText.value.trim();
        if (!text) {
            showErrorMessage("Veuillez saisir un texte à analyser.");
            return;
        }
        
        performAnalysis(text);
    });
    
    // Real-time character counter
    demoText.addEventListener('input', () => {
        const charCount = demoText.value.length;
        updateCharacterCounter(charCount);
    });
}

function performAnalysis(text) {
    const analysisResult = document.getElementById('analysisResult');
    const analyzeBtn = document.getElementById('analyzeBtn');
    
    // Show loading state
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyse en cours...';
    
    analysisResult.innerHTML = `
        <div class="analysis-loading">
            <div class="loading-spinner"></div>
            <p>Analyse IA en cours...</p>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>
    `;
    
    // Simulate AI processing time
    setTimeout(() => {
        const result = simulateAIAnalysis(text);
        displayAnalysisResult(result);
        
        // Reset button
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<i class="fas fa-search"></i> Analyser le Texte';
    }, 2500);
}

function simulateAIAnalysis(text) {
    // Advanced simulation logic
    const words = text.toLowerCase().split(' ');
    const textLength = text.length;
    
    // Simulate different types of analysis
    const sentimentScore = Math.random() * 100;
    const aggressionLevel = Math.random() * 20; // Low for demo
    const confidence = 85 + Math.random() * 10;
    
    const positiveWords = ['bon', 'bien', 'excellent', 'merci', 'super', 'génial', 'parfait'];
    const negativeWords = ['mauvais', 'terrible', 'nul', 'idiot', 'stupide'];
    
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    
    let classification = 'SÛRE';
    let riskLevel = 'Très Faible';
    let color = '#10b981';
    
    if (aggressionLevel > 15) {
        classification = 'ATTENTION';
        riskLevel = 'Modéré';
        color = '#f59e0b';
    }
    
    if (aggressionLevel > 18) {
        classification = 'DANGER';
        riskLevel = 'Élevé';
        color = '#ef4444';
    }
    
    return {
        classification,
        riskLevel,
        confidence: confidence.toFixed(1),
        sentimentScore: sentimentScore.toFixed(1),
        aggressionLevel: aggressionLevel.toFixed(1),
        wordCount: words.length,
        charCount: textLength,
        color,
        processingTime: (1200 + Math.random() * 800).toFixed(0) // ms
    };
}

function displayAnalysisResult(result) {
    const analysisResult = document.getElementById('analysisResult');
    
    analysisResult.innerHTML = `
        <div class="analysis-complete">
            <div class="result-header">
                <div class="status-badge" style="background: ${result.color};">
                    ${result.classification}
                </div>
                <div class="confidence-score">
                    Confiance: ${result.confidence}%
                </div>
            </div>
            
            <div class="metrics-grid-demo">
                <div class="metric-item">
                    <div class="metric-icon">🎯</div>
                    <div class="metric-content">
                        <div class="metric-label">Niveau de Risque</div>
                        <div class="metric-value">${result.riskLevel}</div>
                    </div>
                </div>
                
                <div class="metric-item">
                    <div class="metric-icon">📊</div>
                    <div class="metric-content">
                        <div class="metric-label">Score Sentiment</div>
                        <div class="metric-value">${result.sentimentScore}%</div>
                    </div>
                </div>
                
                <div class="metric-item">
                    <div class="metric-icon">⚡</div>
                    <div class="metric-content">
                        <div class="metric-label">Temps Traitement</div>
                        <div class="metric-value">${result.processingTime}ms</div>
                    </div>
                </div>
                
                <div class="metric-item">
                    <div class="metric-icon">📝</div>
                    <div class="metric-content">
                        <div class="metric-label">Analyse Textuelle</div>
                        <div class="metric-value">${result.wordCount} mots</div>
                    </div>
                </div>
            </div>
            
            <div class="technical-details">
                <h4>🔬 Détails Techniques</h4>
                <div class="tech-info">
                    <div class="tech-item">
                        <span class="tech-label">Modèle IA:</span>
                        <span class="tech-value">Zeta CNN-BiLSTM v2.1</span>
                    </div>
                    <div class="tech-item">
                        <span class="tech-label">Algorithme:</span>
                        <span class="tech-value">Transformers + BERT</span>
                    </div>
                    <div class="tech-item">
                        <span class="tech-label">Précision:</span>
                        <span class="tech-value">95.8% (validation)</span>
                    </div>
                    <div class="tech-item">
                        <span class="tech-label">Langue:</span>
                        <span class="tech-value">Français (détectée)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Animate result appearance
    const resultElements = analysisResult.querySelectorAll('.metric-item, .tech-item');
    resultElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'all 0.3s ease';
        }, index * 100);
    });
}

// === Enhanced Contact Form ===
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Enhanced validation
        if (!validateForm(name, email, message)) {
            return;
        }
        
        // Simulate form submission
        submitForm({ name, email, message });
    });
}

function validateForm(name, email, message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (name.length < 2) {
        showErrorMessage("Le nom doit contenir au moins 2 caractères.");
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showErrorMessage("Veuillez saisir une adresse email valide.");
        return false;
    }
    
    if (message.length < 10) {
        showErrorMessage("Le message doit contenir au moins 10 caractères.");
        return false;
    }
    
    return true;
}

function submitForm(data) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    
    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    
    // Simulate API call
    setTimeout(() => {
        showSuccessMessage("Votre message a été envoyé avec succès ! Nous vous répondrons bientôt.");
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le Message';
    }, 2000);
}

// === Animation initialization ===
function initAnimations() {
    // Add CSS animations dynamically
    const additionalStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    }

    .notification-success {
        border-left: 4px solid #10b981;
    }

    .notification-error {
        border-left: 4px solid #ef4444;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
    }

    .notification-close {
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        cursor: pointer;
        color: #6b7280;
        font-size: 14px;
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .analysis-loading {
        text-align: center;
        padding: 40px 20px;
    }

    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #e5e7eb;
        border-top: 3px solid #3b82f6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }

    .progress-bar {
        width: 100%;
        height: 4px;
        background: #e5e7eb;
        border-radius: 2px;
        overflow: hidden;
        margin-top: 20px;
    }

    .progress-fill {
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #3b82f6, #10b981);
        transform: translateX(-100%);
        animation: progressFill 2s ease-in-out;
    }

    @keyframes progressFill {
        to {
            transform: translateX(0);
        }
    }

    .metrics-grid-demo {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 16px;
        margin: 20px 0;
    }

    .metric-item {
        background: #f9fafb;
        padding: 16px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .metric-icon {
        font-size: 1.5rem;
    }

    .metric-label {
        font-size: 0.8rem;
        color: #6b7280;
        font-weight: 500;
    }

    .metric-value {
        font-size: 1.1rem;
        font-weight: 600;
        color: #1f2937;
    }

    .technical-details {
        margin-top: 20px;
        padding: 20px;
        background: #f8fafc;
        border-radius: 12px;
    }

    .technical-details h4 {
        margin-bottom: 16px;
        color: #1f2937;
    }

    .tech-info {
        display: grid;
        gap: 8px;
    }

    .tech-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #e5e7eb;
    }

    .tech-label {
        font-weight: 500;
        color: #6b7280;
    }

    .tech-value {
        font-weight: 600;
        color: #1f2937;
    }

    .char-counter {
        font-size: 0.8rem;
        text-align: right;
        margin-top: 8px;
        color: #6b7280;
    }

    .status-badge {
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.9rem;
    }

    .result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .confidence-score {
        font-weight: 600;
        color: #1f2937;
    }

    .animate-in {
        animation: slideInUp 0.6s ease-out;
    }

    .module-active {
        transform: translateY(-15px) scale(1.03) !important;
    }

    .ripple-effect {
        animation: ripple 0.6s ease-out;
    }

    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
    `;

    // Inject additional styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
}

// === Utility Functions ===
function animateCounter(element, target, suffix = '', prefix = '') {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = prefix + current.toFixed(1) + suffix;
    }, 20);
}

function updateCharacterCounter(count) {
    let counterEl = document.querySelector('.char-counter');
    if (!counterEl) {
        counterEl = document.createElement('div');
        counterEl.className = 'char-counter';
        document.getElementById('demoText').parentNode.appendChild(counterEl);
    }
    
    counterEl.textContent = `${count} caractères`;
    counterEl.style.color = count > 500 ? '#ef4444' : '#6b7280';
}

function showErrorMessage(message) {
    showNotification(message, 'error');
}

function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// === Global scroll to section function ===
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

console.log('✅ Enhanced VerbShield AI System Loaded Successfully');

// Fonction pour adapter le diagramme à son conteneur
function adaptDiagramToContainer() {
    const container = document.getElementById('sequence-diagram');
    if (!container) return;
    
    const svg = container.querySelector('svg');
    if (!svg) return;
    
    // Obtenir les dimensions du conteneur
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = Math.min(800, containerRect.height || 800);
    
    // Adapter le SVG
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.maxWidth = '100%';
    svg.style.height = 'auto';
    
    // Adapter la viewBox si elle existe
    const viewBox = svg.getAttribute('viewBox');
    if (viewBox) {
        const [x, y, width, height] = viewBox.split(' ').map(Number);
        const aspectRatio = width / height;
        
        if (containerWidth / containerHeight > aspectRatio) {
            // Le conteneur est plus large, adapter à la hauteur
            const newWidth = containerHeight * aspectRatio;
            svg.style.width = `${newWidth}px`;
            svg.style.height = `${containerHeight}px`;
        } else {
            // Le conteneur est plus haut, adapter à la largeur
            const newHeight = containerWidth / aspectRatio;
            svg.style.width = `${containerWidth}px`;
            svg.style.height = `${newHeight}px`;
        }
    }
    
    console.log(`📐 Diagramme adapté: ${containerWidth}x${containerHeight}`);
}

// Observer pour détecter quand le diagramme est ajouté au DOM
const diagramObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const svg = node.querySelector ? node.querySelector('svg') : 
                                  (node.tagName === 'SVG' ? node : null);
                    if (svg) {
                        setTimeout(() => {
                            adaptDiagramToContainer();
                        }, 100);
                    }
                }
            });
        }
    });
});

// Démarrer l'observation du conteneur du diagramme
const diagramContainer = document.getElementById('sequence-diagram');
if (diagramContainer) {
    diagramObserver.observe(diagramContainer, {
        childList: true,
        subtree: true
    });
}

// Adapter le diagramme lors du redimensionnement de la fenêtre
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        adaptDiagramToContainer();
    }, 250);
});
