class CompactFlowAnimations {
    constructor() {
        this.isPlaying = false;
        this.currentPhase = 1;
        this.totalPhases = 7;
        this.animationSpeed = 1200; // Plus rapide pour la version compacte
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
        this.setupControls();
        this.setupIntersectionObserver();
        this.resetAnimation();
    }

    setupControls() {
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');

        if (playBtn) {
            playBtn.addEventListener('click', () => this.play());
        }
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => this.pause());
        }
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.reset());
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isPlaying) {
                    setTimeout(() => {
                        this.autoPlay();
                    }, 800);
                }
            });
        }, {
            threshold: 0.3
        });

        const flowSection = document.querySelector('.system-flow');
        if (flowSection) {
            observer.observe(flowSection);
        }
    }

    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.animatePhases();
            this.updateControls();
        }
    }

    pause() {
        this.isPlaying = false;
        this.updateControls();
    }

    reset() {
        this.isPlaying = false;
        this.currentPhase = 1;
        this.resetAnimation();
        this.updateControls();
        this.updatePhaseIndicator();
    }

    autoPlay() {
        this.reset();
        setTimeout(() => {
            this.play();
        }, 300);
    }

    animatePhases() {
        if (!this.isPlaying || this.currentPhase > this.totalPhases) {
            this.isPlaying = false;
            this.updateControls();
            // Recommencer automatiquement après une pause
            setTimeout(() => {
                if (!this.isPlaying) {
                    this.reset();
                    setTimeout(() => this.play(), 1000);
                }
            }, 2000);
            return;
        }

        this.activatePhase(this.currentPhase);
        this.updatePhaseIndicator();

        setTimeout(() => {
            this.currentPhase++;
            this.animatePhases();
        }, this.animationSpeed);
    }

    activatePhase(phaseNumber) {
        // Désactiver toutes les phases
        const allPhases = document.querySelectorAll('.flow-phase-compact');
        allPhases.forEach(phase => {
            phase.classList.remove('active');
        });

        // Activer la phase actuelle
        const currentPhaseElement = document.querySelector(`[data-phase="${phaseNumber}"]`);
        if (currentPhaseElement && currentPhaseElement.classList.contains('flow-phase-compact')) {
            currentPhaseElement.classList.add('active');
            
            // Ajouter un effet de pulse
            currentPhaseElement.style.animation = 'none';
            currentPhaseElement.offsetHeight; // Trigger reflow
            currentPhaseElement.style.animation = 'compactPulse 0.8s ease';
        }
    }

    resetAnimation() {
        const allPhases = document.querySelectorAll('.flow-phase-compact');
        allPhases.forEach(phase => {
            phase.classList.remove('active');
            phase.style.animation = '';
        });
        
        // Activer la première phase
        const firstPhase = document.querySelector('.flow-phase-compact[data-phase="1"]');
        if (firstPhase) {
            firstPhase.classList.add('active');
        }
    }

    updateControls() {
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');

        if (playBtn && pauseBtn) {
            if (this.isPlaying) {
                playBtn.style.opacity = '0.6';
                pauseBtn.style.opacity = '1';
                playBtn.innerHTML = '⏸ En cours...';
            } else {
                playBtn.style.opacity = '1';
                pauseBtn.style.opacity = '0.6';
                playBtn.innerHTML = '▶ Play';
            }
        }
    }

    updatePhaseIndicator() {
        const indicator = document.getElementById('currentPhase');
        if (indicator) {
            indicator.textContent = Math.min(this.currentPhase, this.totalPhases);
        }
    }
}

// Styles pour la version compacte
const compactAnimationStyles = `
    @keyframes compactPulse {
        0% {
            transform: scale(1);
            box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
        }
        50% {
            transform: scale(1.08);
            box-shadow: 0 8px 25px rgba(79, 172, 254, 0.6);
        }
        100% {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);
        }
    }
    
    .flow-phase-compact {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .flow-phase-compact.active {
        box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
        border-color: #4facfe;
    }
    
    .flow-phase-compact.active .phase-number-compact {
        background: linear-gradient(45deg, #ff6b6b, #ffd93d);
        transform: scale(1.1);
    }
    
    .flow-btn {
        transition: all 0.3s ease;
    }
    
    .flow-btn:active {
        transform: scale(0.95);
    }
`;

// Ajouter les styles
const styleElement = document.createElement('style');
styleElement.textContent = compactAnimationStyles;
document.head.appendChild(styleElement);

// Initialiser les animations compactes
new CompactFlowAnimations();
