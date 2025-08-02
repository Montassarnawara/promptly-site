class InteractiveCubesSystem {
    constructor() {
        this.currentPhase = 1;
        this.autoAnimationInterval = null;
        this.phaseDetails = {
            1: {
                title: "Détection Audio",
                subtitle: "Capteurs acoustiques et de mouvement",
                icon: "🎤",
                details: [
                    {
                        title: "Capteurs Audio",
                        content: "Microphones I2S INMP441 haute sensibilité pour la capture audio en temps réel avec filtrage des bruits de fond automatique."
                    },
                    {
                        title: "Détection Mouvement", 
                        content: "Capteurs PIR HC-SR501 et ultrasons HC-SR04 pour détecter la présence et les mouvements suspects dans la zone de surveillance."
                    },
                    {
                        title: "Traitement Signal",
                        content: "Préamplification LM386 et conversion analogique-numérique ADC ADS1115 16-bit pour un signal audio de qualité optimale."
                    }
                ],
                tech: ["INMP441", "HC-SR501", "HC-SR04", "LM386", "ADS1115"]
            },
            2: {
                title: "Caméra HD",
                subtitle: "Enregistrement vidéo haute définition",
                icon: "📹",
                details: [
                    {
                        title: "Capteur Visuel",
                        content: "Caméra OV2640 avec résolution 4K et vision nocturne infrarouge pour capture vidéo 24h/24 en conditions variables."
                    },
                    {
                        title: "Stockage Local",
                        content: "Enregistrement sur carte micro-SD avec compression H.264 et rotation automatique des fichiers pour optimiser l'espace."
                    },
                    {
                        title: "Streaming RTSP",
                        content: "Diffusion en temps réel via protocole RTSP avec accès distant sécurisé et visualisation multi-plateforme."
                    }
                ],
                tech: ["OV2640", "H.264", "RTSP", "MicroSD", "IR-LED"]
            },
            3: {
                title: "Synchronisation",
                subtitle: "Coordination des modules système",
                icon: "🔄",
                details: [
                    {
                        title: "Bus I2C/SPI",
                        content: "Communication inter-modules via bus I2C et SPI pour synchronisation temps réel et échange de données critiques."
                    },
                    {
                        title: "Horodatage GPS",
                        content: "Module GPS NEO-8M pour synchronisation temporelle précise et géolocalisation des événements détectés."
                    },
                    {
                        title: "Buffer Circulaire",
                        content: "Système de buffer FIFO pour maintenir la cohérence des données multi-capteurs avec timestamps synchronisés."
                    }
                ],
                tech: ["I2C", "SPI", "NEO-8M", "NTP", "FIFO"]
            },
            4: {
                title: "Filtrage Numérique",
                subtitle: "Nettoyage et préprocessing du signal",
                icon: "🔬",
                details: [
                    {
                        title: "Filtrage Adaptatif",
                        content: "Algorithmes RNNoise et filtres Kalman pour suppression du bruit ambiant et amélioration du rapport signal/bruit."
                    },
                    {
                        title: "Égalisation Audio",
                        content: "Correction fréquentielle automatique et normalisation d'amplitude pour optimiser la reconnaissance vocale."
                    },
                    {
                        title: "VAD (Voice Activity)",
                        content: "Détection d'activité vocale pour segmentation automatique et extraction des segments de parole pertinents."
                    }
                ],
                tech: ["RNNoise", "Kalman", "FFT", "VAD", "MFCC"]
            },
            5: {
                title: "Intelligence Artificielle",
                subtitle: "Analyse par modèles CNN, Whisper et SVM",
                icon: "🧠",
                details: [
                    {
                        title: "Whisper ASR",
                        content: "Modèle Whisper d'OpenAI pour transcription vocale multilingue en temps réel avec robustesse aux accents et bruits."
                    },
                    {
                        title: "CNN Classification",
                        content: "Réseaux de neurones convolutionnels pour extraction de caractéristiques spectrales et classification des patterns d'agression."
                    },
                    {
                        title: "SVM Decision",
                        content: "Support Vector Machine avec kernel RBF pour classification finale binaire agression/normal avec haute précision."
                    }
                ],
                tech: ["Whisper-v3", "TensorFlow", "CNN", "SVM", "scikit-learn"]
            },
            6: {
                title: "Système de Décision",
                subtitle: "Algorithmes de décision et contrôle ESP32",
                icon: "⚖️",
                details: [
                    {
                        title: "Fusion Multi-Modal",
                        content: "Combinaison pondérée des scores audio, vidéo et contextuel via algorithmes de fusion de données Bayésiennes."
                    },
                    {
                        title: "Seuils Adaptatifs",
                        content: "Ajustement automatique des seuils de détection basé sur l'historique et le contexte environnemental."
                    },
                    {
                        title: "ESP32 Control",
                        content: "Microcontrôleur ESP32 pour traitement local, décisions temps réel et gestion des actionneurs de sortie."
                    }
                ],
                tech: ["ESP32", "Bayesian", "CART", "Fuzzy-Logic", "RTOS"]
            },
            7: {
                title: "Système de Réaction",
                subtitle: "Alertes LED, SMS et notifications",
                icon: "🚨",
                details: [
                    {
                        title: "Alertes Visuelles",
                        content: "LED RGB WS2812B programmables avec patterns d'alerte différenciés selon le niveau de gravité détecté."
                    },
                    {
                        title: "Notifications SMS",
                        content: "Module GSM SIM800L pour envoi automatique de SMS d'alerte aux contacts d'urgence avec géolocalisation."
                    },
                    {
                        title: "Interface Web",
                        content: "Dashboard web temps réel via WiFi ESP8266 pour monitoring, historique et configuration à distance."
                    }
                ],
                tech: ["WS2812B", "SIM800L", "ESP8266", "MQTT", "WebSocket"]
            }
        };
        
        this.initializeSystem();
    }
    
    initializeSystem() {
        this.startAutoAnimation();
        this.setupEventListeners();
        this.updatePhaseIndicator();
    }
    
    startAutoAnimation() {
        // Animation automatique des cubes toutes les 4 secondes
        this.autoAnimationInterval = setInterval(() => {
            this.animateNextPhase();
        }, 4000);
        
        // Animation initiale
        this.animatePhase(this.currentPhase);
    }
    
    animateNextPhase() {
        // Retirer l'animation de la phase courante
        const currentCube = document.querySelector(`[data-phase="${this.currentPhase}"]`);
        if (currentCube) {
            currentCube.classList.remove('active', 'cube-auto-animate');
        }
        
        // Passer à la phase suivante
        this.currentPhase = this.currentPhase >= 7 ? 1 : this.currentPhase + 1;
        
        // Animer la nouvelle phase
        this.animatePhase(this.currentPhase);
        this.updatePhaseIndicator();
    }
    
    animatePhase(phaseNumber) {
        const cube = document.querySelector(`[data-phase="${phaseNumber}"]`);
        if (cube) {
            cube.classList.add('active', 'cube-auto-animate');
            
            // Effet sonore visuel (pulse glow)
            setTimeout(() => {
                cube.classList.remove('cube-auto-animate');
            }, 2000);
        }
    }
    
    setupEventListeners() {
        // Clic sur les cubes pour afficher les détails
        document.querySelectorAll('.phase-cube').forEach(cube => {
            cube.addEventListener('click', () => {
                const phase = parseInt(cube.getAttribute('data-phase'));
                this.showPhaseDetails(phase);
                
                // Pause de l'animation automatique lors de l'interaction
                this.pauseAutoAnimation();
            });
        });
        
        // Gestionnaire pour fermer le modal
        const modal = document.getElementById('phaseModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closePhaseDetails();
                }
            });
        }
        
        // Reprendre l'animation quand l'utilisateur n'interagit plus
        let inactivityTimer;
        document.addEventListener('mousemove', () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                this.resumeAutoAnimation();
            }, 10000); // Reprendre après 10s d'inactivité
        });
    }
    
    showPhaseDetails(phaseNumber) {
        const phaseData = this.phaseDetails[phaseNumber];
        if (!phaseData) return;
        
        const modalContent = document.getElementById('modalContent');
        if (!modalContent) return;
        
        modalContent.innerHTML = `
            <div class="modal-phase-header">
                <span class="modal-phase-icon">${phaseData.icon}</span>
                <h3 class="modal-phase-title">${phaseData.title}</h3>
                <p class="modal-phase-subtitle">${phaseData.subtitle}</p>
            </div>
            
            <div class="modal-phase-details">
                ${phaseData.details.map(detail => `
                    <div class="modal-detail-item">
                        <div class="modal-detail-title">${detail.title}</div>
                        <div class="modal-detail-content">${detail.content}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="modal-tech-stack">
                <h4 style="width: 100%; color: #3b82f6; margin-bottom: 15px;">Technologies Utilisées:</h4>
                ${phaseData.tech.map(tech => `
                    <span class="tech-badge">${tech}</span>
                `).join('')}
            </div>
        `;
        
        // Afficher le modal avec animation
        const modal = document.getElementById('phaseModal');
        if (modal) {
            modal.style.display = 'block';
            setTimeout(() => {
                modal.querySelector('.modal-content').style.opacity = '1';
            }, 10);
        }
    }
    
    closePhaseDetails() {
        const modal = document.getElementById('phaseModal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        // Reprendre l'animation automatique
        setTimeout(() => {
            this.resumeAutoAnimation();
        }, 1000);
    }
    
    pauseAutoAnimation() {
        if (this.autoAnimationInterval) {
            clearInterval(this.autoAnimationInterval);
            this.autoAnimationInterval = null;
        }
    }
    
    resumeAutoAnimation() {
        if (!this.autoAnimationInterval) {
            this.startAutoAnimation();
        }
    }
    
    updatePhaseIndicator() {
        const indicator = document.getElementById('currentPhaseCubes');
        if (indicator) {
            indicator.textContent = this.currentPhase;
            
            // Animation du changement de numéro
            indicator.style.transform = 'scale(1.2)';
            indicator.style.color = '#3b82f6';
            setTimeout(() => {
                indicator.style.transform = 'scale(1)';
                indicator.style.color = '';
            }, 300);
        }
    }
    
    // API publique pour contrôle externe
    goToPhase(phaseNumber) {
        if (phaseNumber >= 1 && phaseNumber <= 7) {
            const currentCube = document.querySelector(`[data-phase="${this.currentPhase}"]`);
            if (currentCube) {
                currentCube.classList.remove('active');
            }
            
            this.currentPhase = phaseNumber;
            this.animatePhase(this.currentPhase);
            this.updatePhaseIndicator();
        }
    }
    
    toggleAutoAnimation() {
        if (this.autoAnimationInterval) {
            this.pauseAutoAnimation();
        } else {
            this.resumeAutoAnimation();
        }
    }
}

// Fonctions globales pour compatibilité avec le HTML
function showPhaseDetails(phase) {
    window.cubesSystem?.showPhaseDetails(phase);
}

function closePhaseDetails() {
    window.cubesSystem?.closePhaseDetails();
}

// Initialisation du système quand le DOM est prêt
document.addEventListener('DOMContentLoaded', function() {
    window.cubesSystem = new InteractiveCubesSystem();
    
    // Debug/test functions (remove in production)
    window.debugCubes = {
        goTo: (phase) => window.cubesSystem.goToPhase(phase),
        toggle: () => window.cubesSystem.toggleAutoAnimation(),
        show: (phase) => window.cubesSystem.showPhaseDetails(phase)
    };
});

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    if (window.cubesSystem) {
        window.cubesSystem.pauseAutoAnimation();
    }
});
