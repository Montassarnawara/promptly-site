class AutoFlowAnimations {
    constructor() {
        this.currentPhase = 1;
        this.totalPhases = 7;
        this.animationInterval = null;
        this.phaseDuration = 2500; // 2.5 secondes par phase
        this.init();
    }

    init() {
        console.log('🚀 Initialisation des animations automatiques du flux');
        this.startAutoAnimation();
        this.setupVisibilityObserver();
    }

    startAutoAnimation() {
        // Démarrer l'animation automatique
        this.animationInterval = setInterval(() => {
            this.animateToNextPhase();
        }, this.phaseDuration);

        // Première animation immédiate
        this.updatePhaseDisplay();
    }

    animateToNextPhase() {
        // Marquer la phase actuelle comme complétée
        const currentPhaseElement = document.querySelector(`[data-phase="${this.currentPhase}"]`);
        if (currentPhaseElement) {
            currentPhaseElement.classList.remove('active');
            currentPhaseElement.classList.add('completed');
        }

        // Passer à la phase suivante
        this.currentPhase++;
        
        // Si on arrive à la fin, recommencer
        if (this.currentPhase > this.totalPhases) {
            this.resetAnimation();
            return;
        }

        // Activer la nouvelle phase
        const nextPhaseElement = document.querySelector(`[data-phase="${this.currentPhase}"]`);
        if (nextPhaseElement) {
            nextPhaseElement.classList.add('active');
            nextPhaseElement.classList.remove('completed');
        }

        this.updatePhaseDisplay();
    }

    resetAnimation() {
        console.log('🔄 Redémarrage de l\'animation du flux');
        
        // Réinitialiser toutes les phases
        document.querySelectorAll('.flow-phase-auto').forEach(phase => {
            phase.classList.remove('active', 'completed');
        });

        // Recommencer à la phase 1
        this.currentPhase = 1;
        const firstPhase = document.querySelector(`[data-phase="1"]`);
        if (firstPhase) {
            firstPhase.classList.add('active');
        }

        this.updatePhaseDisplay();
    }

    updatePhaseDisplay() {
        const phaseIndicator = document.getElementById('currentPhaseAuto');
        if (phaseIndicator) {
            phaseIndicator.textContent = this.currentPhase;
        }
    }

    setupVisibilityObserver() {
        // Observer pour démarrer/arrêter l'animation selon la visibilité
        const flowContainer = document.querySelector('.system-flow-enhanced');
        if (!flowContainer) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!this.animationInterval) {
                        console.log('👁️ Section visible - Redémarrage de l\'animation');
                        this.startAutoAnimation();
                    }
                } else {
                    if (this.animationInterval) {
                        console.log('👁️ Section cachée - Pause de l\'animation');
                        clearInterval(this.animationInterval);
                        this.animationInterval = null;
                    }
                }
            });
        }, {
            threshold: 0.3
        });

        observer.observe(flowContainer);
    }

    // Méthode pour arrêter l'animation
    stopAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
    }

    // Méthode pour changer la vitesse d'animation
    setSpeed(duration) {
        this.phaseDuration = duration;
        if (this.animationInterval) {
            this.stopAnimation();
            this.startAutoAnimation();
        }
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    // Attendre un peu pour s'assurer que tout est chargé
    setTimeout(() => {
        window.autoFlowAnimations = new AutoFlowAnimations();
        console.log('✅ Animations automatiques du flux activées');
    }, 1000);
});

// Nettoyage lors du déchargement de la page
window.addEventListener('beforeunload', () => {
    if (window.autoFlowAnimations) {
        window.autoFlowAnimations.stopAnimation();
    }
});
