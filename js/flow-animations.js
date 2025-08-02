/**
 * FlowAnimations - Système d'animation pour le flux de données
 * Animations circulaires et transitions fluides pour les 7 phases
 */

class FlowAnimations {
    constructor() {
        this.currentPhase = 0;
        this.totalPhases = 7;
        this.isPlaying = false;
        this.animationSpeed = 3000; // 3 secondes par phase
        this.particles = [];
        this.intervalId = null;
        
        this.init();
    }

    init() {
        console.log('🎬 Initialisation des animations de flux');
        this.createControlPanel();
        this.setupPhaseDetection();
        this.createParticleSystem();
        this.startAutoPlay();
    }

    createControlPanel() {
        const container = document.querySelector('.system-flow');
        if (!container) return;

        const controlPanel = document.createElement('div');
        controlPanel.className = 'flow-control-panel';
        controlPanel.innerHTML = `
            <div class="control-buttons">
                <button class="flow-btn play-btn" id="playFlow">
                    <i class="fas fa-play"></i> Démarrer Animation
                </button>
                <button class="flow-btn pause-btn" id="pauseFlow">
                    <i class="fas fa-pause"></i> Pause
                </button>
                <button class="flow-btn reset-btn" id="resetFlow">
                    <i class="fas fa-stop"></i> Reset
                </button>
            </div>
            <div class="flow-progress">
                <div class="progress-track">
                    <div class="progress-fill" id="flowProgress"></div>
                </div>
                <span class="progress-text" id="progressText">Phase 1 / 7</span>
            </div>
        `;

        container.insertBefore(controlPanel, container.querySelector('.flow-timeline'));

        // Event listeners
        document.getElementById('playFlow').addEventListener('click', () => this.play());
        document.getElementById('pauseFlow').addEventListener('click', () => this.pause());
        document.getElementById('resetFlow').addEventListener('click', () => this.reset());
    }

    setupPhaseDetection() {
        const phases = document.querySelectorAll('.flow-phase');
        phases.forEach((phase, index) => {
            // Ajouter des indicateurs de connexion
            if (index < phases.length - 1) {
                const connector = document.createElement('div');
                connector.className = 'phase-connector';
                connector.innerHTML = `
                    <div class="connector-line">
                        <div class="data-pulse"></div>
                    </div>
                    <div class="connector-arrow">→</div>
                `;
                phase.appendChild(connector);
            }

            // Ajouter des particules de données
            const particleContainer = document.createElement('div');
            particleContainer.className = 'phase-particles';
            phase.appendChild(particleContainer);
        });
    }

    createParticleSystem() {
        const container = document.querySelector('.flow-timeline');
        if (!container) return;

        // Créer le conteneur de particules globales
        const particleCanvas = document.createElement('div');
        particleCanvas.className = 'particle-canvas';
        container.appendChild(particleCanvas);

        // Générer des particules
        for (let i = 0; i < 20; i++) {
            this.createParticle(particleCanvas);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'flow-particle';
        particle.innerHTML = '<i class="fas fa-circle"></i>';
        
        // Position aléatoire
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        container.appendChild(particle);
        this.particles.push(particle);

        // Animation continue
        this.animateParticle(particle);
    }

    animateParticle(particle) {
        const duration = 5000 + Math.random() * 3000; // 5-8 secondes
        const startX = parseFloat(particle.style.left);
        const startY = parseFloat(particle.style.top);
        const endX = Math.random() * 100;
        const endY = Math.random() * 100;

        particle.style.transition = `all ${duration}ms ease-in-out`;
        particle.style.left = endX + '%';
        particle.style.top = endY + '%';

        setTimeout(() => {
            if (this.particles.includes(particle)) {
                this.animateParticle(particle);
            }
        }, duration);
    }

    play() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        console.log('▶️ Démarrage de l\'animation du flux');
        
        this.intervalId = setInterval(() => {
            this.nextPhase();
        }, this.animationSpeed);

        this.activateCurrentPhase();
        this.updatePlayButton(true);
    }

    pause() {
        this.isPlaying = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        console.log('⏸️ Animation en pause');
        this.updatePlayButton(false);
    }

    reset() {
        this.pause();
        this.currentPhase = 0;
        this.resetAllPhases();
        this.updateProgress();
        console.log('🔄 Reset de l\'animation');
    }

    nextPhase() {
        this.currentPhase = (this.currentPhase + 1) % this.totalPhases;
        this.activateCurrentPhase();
        this.updateProgress();
        
        if (this.currentPhase === 0) {
            // Cycle complet terminé
            setTimeout(() => {
                if (this.isPlaying) {
                    console.log('🔄 Nouveau cycle de flux démarré');
                }
            }, 1000);
        }
    }

    activateCurrentPhase() {
        const phases = document.querySelectorAll('.flow-phase');
        
        phases.forEach((phase, index) => {
            phase.classList.remove('active', 'completed', 'next');
            
            if (index < this.currentPhase) {
                phase.classList.add('completed');
            } else if (index === this.currentPhase) {
                phase.classList.add('active');
                this.animatePhase(phase, index);
            } else if (index === this.currentPhase + 1) {
                phase.classList.add('next');
            }
        });

        this.animateConnectors();
        this.triggerPhaseEffect(this.currentPhase);
    }

    animatePhase(phase, index) {
        // Animation du numéro de phase
        const phaseNumber = phase.querySelector('.phase-number');
        if (phaseNumber) {
            phaseNumber.style.animation = 'none';
            setTimeout(() => {
                phaseNumber.style.animation = 'phaseActivation 1s ease-out';
            }, 50);
        }

        // Animation des détails
        const details = phase.querySelectorAll('.detail');
        details.forEach((detail, i) => {
            detail.style.opacity = '0';
            detail.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                detail.style.transition = 'all 0.5s ease-out';
                detail.style.opacity = '1';
                detail.style.transform = 'translateX(0)';
            }, i * 200);
        });

        // Effet de particules spécifique à la phase
        this.createPhaseParticles(phase, index);
    }

    createPhaseParticles(phase, phaseIndex) {
        const particleContainer = phase.querySelector('.phase-particles');
        if (!particleContainer) return;

        // Nettoyer les anciennes particules
        particleContainer.innerHTML = '';

        // Couleurs par phase
        const phaseColors = [
            '#4facfe', '#ff6b6b', '#ffd93d', '#10b981', 
            '#667eea', '#f093fb', '#00f2fe'
        ];

        // Créer des particules spécifiques
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'phase-particle';
            particle.style.backgroundColor = phaseColors[phaseIndex];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            particleContainer.appendChild(particle);

            // Animation circulaire
            setTimeout(() => {
                particle.style.animation = `circularMotion ${2 + Math.random() * 2}s ease-in-out infinite`;
            }, i * 100);
        }
    }

    animateConnectors() {
        const connectors = document.querySelectorAll('.phase-connector');
        connectors.forEach((connector, index) => {
            const pulse = connector.querySelector('.data-pulse');
            if (pulse && index === this.currentPhase) {
                pulse.style.animation = 'dataPulse 1s ease-in-out infinite';
            } else if (pulse) {
                pulse.style.animation = 'none';
            }
        });
    }

    triggerPhaseEffect(phaseIndex) {
        const effects = [
            () => this.microphoneEffect(),
            () => this.cameraEffect(),
            () => this.syncEffect(),
            () => this.filterEffect(),
            () => this.aiEffect(),
            () => this.decisionEffect(),
            () => this.alertEffect()
        ];

        if (effects[phaseIndex]) {
            effects[phaseIndex]();
        }
    }

    // Effets spéciaux par phase
    microphoneEffect() {
        this.createSoundWaves();
    }

    cameraEffect() {
        this.createCameraFlash();
    }

    syncEffect() {
        this.createSyncPulse();
    }

    filterEffect() {
        this.createFilterEffect();
    }

    aiEffect() {
        this.createBrainActivity();
    }

    decisionEffect() {
        this.createDecisionTree();
    }

    alertEffect() {
        this.createAlertFlash();
    }

    createSoundWaves() {
        const container = document.querySelector('.flow-timeline');
        for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.className = 'sound-wave';
            wave.style.animationDelay = i * 0.3 + 's';
            container.appendChild(wave);
            
            setTimeout(() => wave.remove(), 2000);
        }
    }

    createCameraFlash() {
        const flash = document.createElement('div');
        flash.className = 'camera-flash';
        document.body.appendChild(flash);
        
        setTimeout(() => flash.remove(), 500);
    }

    createSyncPulse() {
        const phases = document.querySelectorAll('.flow-phase');
        phases.forEach((phase, index) => {
            setTimeout(() => {
                phase.style.animation = 'syncPulse 0.3s ease-out';
                setTimeout(() => {
                    phase.style.animation = '';
                }, 300);
            }, index * 100);
        });
    }

    createFilterEffect() {
        const container = document.querySelector('.flow-timeline');
        const filter = document.createElement('div');
        filter.className = 'filter-sweep';
        container.appendChild(filter);
        
        setTimeout(() => filter.remove(), 2000);
    }

    createBrainActivity() {
        const container = document.querySelector('.flow-timeline');
        for (let i = 0; i < 5; i++) {
            const neuron = document.createElement('div');
            neuron.className = 'neuron-spark';
            neuron.style.left = Math.random() * 100 + '%';
            neuron.style.top = Math.random() * 100 + '%';
            container.appendChild(neuron);
            
            setTimeout(() => neuron.remove(), 1500);
        }
    }

    createDecisionTree() {
        const container = document.querySelector('.flow-timeline');
        const tree = document.createElement('div');
        tree.className = 'decision-tree';
        tree.innerHTML = `
            <div class="tree-branch"></div>
            <div class="tree-branch"></div>
            <div class="tree-branch"></div>
        `;
        container.appendChild(tree);
        
        setTimeout(() => tree.remove(), 2000);
    }

    createAlertFlash() {
        document.body.style.animation = 'alertFlash 0.5s ease-out 3';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 1500);
    }

    resetAllPhases() {
        const phases = document.querySelectorAll('.flow-phase');
        phases.forEach(phase => {
            phase.classList.remove('active', 'completed', 'next');
        });
    }

    updateProgress() {
        const progressFill = document.getElementById('flowProgress');
        const progressText = document.getElementById('progressText');
        
        if (progressFill && progressText) {
            const percentage = ((this.currentPhase + 1) / this.totalPhases) * 100;
            progressFill.style.width = percentage + '%';
            progressText.textContent = `Phase ${this.currentPhase + 1} / ${this.totalPhases}`;
        }
    }

    updatePlayButton(isPlaying) {
        const playBtn = document.getElementById('playFlow');
        if (playBtn) {
            if (isPlaying) {
                playBtn.innerHTML = '<i class="fas fa-play"></i> En cours...';
                playBtn.disabled = true;
            } else {
                playBtn.innerHTML = '<i class="fas fa-play"></i> Démarrer Animation';
                playBtn.disabled = false;
            }
        }
    }

    startAutoPlay() {
        // Démarrage automatique après 2 secondes
        setTimeout(() => {
            console.log('🚀 Démarrage automatique de l\'animation');
            this.play();
        }, 2000);
    }

    destroy() {
        this.pause();
        this.particles.forEach(particle => particle.remove());
        this.particles = [];
        console.log('🗑️ Animations de flux nettoyées');
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que la section soit visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !window.flowAnimations) {
                console.log('👁️ Section flux détectée, initialisation...');
                window.flowAnimations = new FlowAnimations();
                observer.unobserve(entry.target);
            }
        });
    });

    const flowSection = document.querySelector('.system-flow');
    if (flowSection) {
        observer.observe(flowSection);
    }
});

// Nettoyage lors du changement de page
window.addEventListener('beforeunload', function() {
    if (window.flowAnimations) {
        window.flowAnimations.destroy();
    }
});
