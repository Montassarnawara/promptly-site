/**
 * Dashboard Animations - Surveillance Temps Réel
 * Animations interactives pour le tableau de bord analytics
 * 
 * @author VerbShield AI System
 * @version 1.0.0
 */

class DashboardAnimations {
    constructor() {
        this.animationRunning = false;
        this.updateInterval = null;
        this.notificationInterval = null;
        this.chartUpdateInterval = null;
        
        // Configuration des animations
        this.config = {
            updateFrequency: 3000, // 3 secondes
            notificationFrequency: 8000, // 8 secondes
            chartUpdateFrequency: 5000, // 5 secondes
            pulseSpeed: 2000, // 2 secondes
            fadeSpeed: 500 // 0.5 secondes
        };
        
        // Données simulées pour les métriques
        this.metricsData = {
            responseTime: { min: 1.8, max: 2.5, current: 2.1, trend: 'positive' },
            accuracy: { min: 95.5, max: 97.2, current: 96.3, trend: 'positive' },
            throughput: { min: 1100, max: 1400, current: 1247, trend: 'neutral' }
        };
        
        // Messages d'activité simulés
        this.activityMessages = [
            { icon: '✅', text: 'Analyse terminée - Texte sûr', type: 'safe' },
            { icon: '✅', text: 'Détection audio - RAS', type: 'safe' },
            { icon: '⚠️', text: 'Niveau d\'attention - Surveillé', type: 'warning' },
            { icon: '🔄', text: 'Calibrage des capteurs', type: 'safe' },
            { icon: '📊', text: 'Rapport d\'analyse généré', type: 'safe' },
            { icon: '🔧', text: 'Maintenance préventive', type: 'warning' },
            { icon: '🧠', text: 'Modèle IA mis à jour', type: 'safe' },
            { icon: '📡', text: 'Connexion réseau vérifiée', type: 'safe' },
            { icon: '⚡', text: 'Performance optimisée', type: 'safe' },
            { icon: '🔍', text: 'Scan de sécurité complété', type: 'safe' }
        ];
        
        this.init();
    }
    
    init() {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startAnimations());
        } else {
            this.startAnimations();
        }
    }
    
    startAnimations() {
        console.log('🚀 Démarrage des animations du tableau de bord');
        
        // Initialiser les animations
        this.initPulseAnimations();
        this.initCounterAnimations();
        this.initProgressBarAnimations();
        this.initChartAnimations();
        this.startMetricsUpdates();
        this.startActivityFeed();
        this.initInteractiveElements();
        
        this.animationRunning = true;
    }
    
    /**
     * Animations de pulsation pour les indicateurs d'état
     */
    initPulseAnimations() {
        const statusDots = document.querySelectorAll('.status-dot');
        
        statusDots.forEach((dot, index) => {
            // Animation de pulsation asynchrone
            setTimeout(() => {
                dot.style.animation = `pulse ${this.config.pulseSpeed}ms ease-in-out infinite`;
                dot.style.animationDelay = `${index * 200}ms`;
            }, index * 100);
        });
        
        // Ajouter l'animation CSS si elle n'existe pas
        this.addPulseKeyframes();
    }
    
    /**
     * Animations des compteurs numériques
     */
    initCounterAnimations() {
        const metricNumbers = document.querySelectorAll('.metric-number');
        
        metricNumbers.forEach(element => {
            this.animateCounter(element);
        });
        
        // Animer les statistiques
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(element => {
            setTimeout(() => this.animateCounter(element), Math.random() * 1000);
        });
    }
    
    /**
     * Animation d'un compteur numérique
     */
    animateCounter(element) {
        const text = element.textContent;
        const number = parseFloat(text.replace(/[^\d.]/g, ''));
        
        if (isNaN(number)) return;
        
        let start = 0;
        const duration = 2000;
        const increment = number / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= number) {
                start = number;
                clearInterval(timer);
            }
            
            // Formatage selon le type de métrique
            let formattedValue;
            if (text.includes('%')) {
                formattedValue = start.toFixed(1) + '%';
            } else if (text.includes('s')) {
                formattedValue = '< ' + start.toFixed(1) + 's';
            } else if (text.includes('/h')) {
                formattedValue = Math.round(start).toLocaleString() + '/h';
            } else if (text.includes('analyses')) {
                formattedValue = Math.round(start).toLocaleString() + ' analyses';
            } else {
                formattedValue = Math.round(start).toLocaleString();
            }
            
            element.textContent = formattedValue;
        }, 16);
    }
    
    /**
     * Animations des barres de progression
     */
    initProgressBarAnimations() {
        const healthFills = document.querySelectorAll('.health-fill');
        
        healthFills.forEach((fill, index) => {
            const targetWidth = fill.style.width;
            fill.style.width = '0%';
            fill.style.transition = 'width 2s ease-out';
            
            setTimeout(() => {
                fill.style.width = targetWidth;
                
                // Ajouter un effet de brillance
                setTimeout(() => {
                    fill.style.position = 'relative';
                    fill.style.overflow = 'hidden';
                    
                    const shimmer = document.createElement('div');
                    shimmer.className = 'shimmer-effect';
                    fill.appendChild(shimmer);
                }, 2000);
            }, index * 300);
        });
    }
    
    /**
     * Animations des graphiques
     */
    initChartAnimations() {
        const chartBars = document.querySelectorAll('.chart-bar');
        
        chartBars.forEach((bar, index) => {
            const targetHeight = bar.style.height;
            bar.style.height = '0%';
            bar.style.transition = 'height 1.5s ease-out';
            
            setTimeout(() => {
                bar.style.height = targetHeight;
            }, index * 150);
        });
        
        // Démarrer les mises à jour cycliques des graphiques
        this.startChartUpdates();
    }
    
    /**
     * Mises à jour en temps réel des métriques
     */
    startMetricsUpdates() {
        this.updateInterval = setInterval(() => {
            this.updateMetrics();
        }, this.config.updateFrequency);
    }
    
    /**
     * Mise à jour des valeurs métriques
     */
    updateMetrics() {
        // Mise à jour du temps de réponse
        const responseTimeEl = document.getElementById('responseTime');
        if (responseTimeEl) {
            const data = this.metricsData.responseTime;
            const newValue = this.generateRealisticValue(data);
            data.current = newValue;
            
            this.updateMetricWithAnimation(responseTimeEl, `< ${newValue.toFixed(1)}s`);
        }
        
        // Mise à jour de la précision
        const accuracyEl = document.getElementById('accuracy');
        if (accuracyEl) {
            const data = this.metricsData.accuracy;
            const newValue = this.generateRealisticValue(data);
            data.current = newValue;
            
            this.updateMetricWithAnimation(accuracyEl, `${newValue.toFixed(1)}%`);
        }
        
        // Mise à jour du débit
        const throughputEl = document.getElementById('throughput');
        if (throughputEl) {
            const data = this.metricsData.throughput;
            const newValue = Math.round(this.generateRealisticValue(data));
            data.current = newValue;
            
            this.updateMetricWithAnimation(throughputEl, `${newValue.toLocaleString()}/h`);
        }
    }
    
    /**
     * Génération de valeurs réalistes pour les métriques
     */
    generateRealisticValue(data) {
        const variation = (data.max - data.min) * 0.1; // 10% de variation
        const direction = Math.random() > 0.5 ? 1 : -1;
        const change = (Math.random() * variation) * direction;
        
        let newValue = data.current + change;
        newValue = Math.max(data.min, Math.min(data.max, newValue));
        
        return newValue;
    }
    
    /**
     * Animation de mise à jour d'une métrique
     */
    updateMetricWithAnimation(element, newValue) {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#4facfe';
        element.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 150);
    }
    
    /**
     * Flux d'activité en temps réel
     */
    startActivityFeed() {
        this.notificationInterval = setInterval(() => {
            this.addNewActivity();
        }, this.config.notificationFrequency);
    }
    
    /**
     * Ajout d'une nouvelle activité
     */
    addNewActivity() {
        const activityFeed = document.querySelector('.activity-feed');
        if (!activityFeed) return;
        
        const randomActivity = this.activityMessages[
            Math.floor(Math.random() * this.activityMessages.length)
        ];
        
        // Créer le nouvel élément d'activité
        const activityItem = document.createElement('div');
        activityItem.className = `activity-item ${randomActivity.type}`;
        activityItem.innerHTML = `
            <div class="activity-icon">${randomActivity.icon}</div>
            <div class="activity-content">
                <div class="activity-text">${randomActivity.text}</div>
                <div class="activity-time">À l'instant</div>
            </div>
        `;
        
        // Animation d'entrée
        activityItem.style.opacity = '0';
        activityItem.style.transform = 'translateX(-20px)';
        activityItem.style.transition = 'all 0.5s ease';
        
        // Insérer en première position
        activityFeed.insertBefore(activityItem, activityFeed.firstChild);
        
        // Animation d'apparition
        setTimeout(() => {
            activityItem.style.opacity = '1';
            activityItem.style.transform = 'translateX(0)';
        }, 100);
        
        // Supprimer les anciens éléments (garder max 4)
        const items = activityFeed.querySelectorAll('.activity-item');
        if (items.length > 4) {
            const oldItem = items[items.length - 1];
            oldItem.style.opacity = '0';
            oldItem.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                if (oldItem.parentNode) {
                    oldItem.parentNode.removeChild(oldItem);
                }
            }, 500);
        }
        
        // Mettre à jour les temps relatifs
        this.updateRelativeTimes();
    }
    
    /**
     * Mise à jour des temps relatifs
     */
    updateRelativeTimes() {
        const timeElements = document.querySelectorAll('.activity-time');
        const relativeTimes = ['À l\'instant', 'Il y a 2 minutes', 'Il y a 5 minutes', 'Il y a 12 minutes'];
        
        timeElements.forEach((element, index) => {
            if (index < relativeTimes.length) {
                element.textContent = relativeTimes[index];
            }
        });
    }
    
    /**
     * Mises à jour des graphiques
     */
    startChartUpdates() {
        this.chartUpdateInterval = setInterval(() => {
            this.updateCharts();
        }, this.config.chartUpdateFrequency);
    }
    
    /**
     * Mise à jour des graphiques
     */
    updateCharts() {
        const chartBars = document.querySelectorAll('.chart-bar');
        
        chartBars.forEach(bar => {
            const newHeight = Math.random() * 80 + 20; // Entre 20% et 100%
            bar.style.transition = 'height 1s ease-in-out';
            bar.style.height = `${newHeight}%`;
        });
    }
    
    /**
     * Éléments interactifs
     */
    initInteractiveElements() {
        // Effets de survol pour les panneaux
        const panels = document.querySelectorAll('.dashboard-panel');
        
        panels.forEach(panel => {
            panel.addEventListener('mouseenter', () => {
                panel.style.transform = 'translateY(-5px) scale(1.02)';
                panel.style.transition = 'all 0.3s ease';
                panel.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
            });
            
            panel.addEventListener('mouseleave', () => {
                panel.style.transform = 'translateY(0) scale(1)';
                panel.style.boxShadow = '';
            });
        });
        
        // Effets de clic pour les métriques
        const metricDisplays = document.querySelectorAll('.metric-display');
        
        metricDisplays.forEach(metric => {
            metric.addEventListener('click', () => {
                this.showMetricDetails(metric);
            });
        });
        
        // Effets de survol pour les barres de santé
        const healthItems = document.querySelectorAll('.health-item');
        
        healthItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const fill = item.querySelector('.health-fill');
                fill.style.filter = 'brightness(1.2) saturate(1.3)';
                fill.style.transition = 'filter 0.3s ease';
            });
            
            item.addEventListener('mouseleave', () => {
                const fill = item.querySelector('.health-fill');
                fill.style.filter = '';
            });
        });
    }
    
    /**
     * Affichage des détails d'une métrique
     */
    showMetricDetails(metricElement) {
        // Animation de pulsation
        metricElement.style.animation = 'metricPulse 0.6s ease-in-out';
        
        // Créer une notification temporaire
        const notification = document.createElement('div');
        notification.className = 'metric-notification';
        notification.innerHTML = '📊 Métrique mise à jour en temps réel';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.5s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }
    
    /**
     * Ajout des keyframes CSS
     */
    addPulseKeyframes() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% {
                    opacity: 1;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.7;
                    transform: scale(1.1);
                }
            }
            
            @keyframes metricPulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }
            
            .shimmer-effect {
                position: absolute;
                top: 0;
                left: -100%;
                right: 0;
                bottom: 0;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                animation: shimmer 2s infinite;
            }
        `;
        document.head.appendChild(style);
    }
    
    /**
     * Arrêt des animations
     */
    stop() {
        this.animationRunning = false;
        
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        if (this.notificationInterval) {
            clearInterval(this.notificationInterval);
        }
        
        if (this.chartUpdateInterval) {
            clearInterval(this.chartUpdateInterval);
        }
        
        console.log('🛑 Animations du tableau de bord arrêtées');
    }
    
    /**
     * Redémarrage des animations
     */
    restart() {
        this.stop();
        setTimeout(() => {
            this.startAnimations();
        }, 1000);
    }
}

// Initialisation automatique
let dashboardAnimations;

// Fonction d'initialisation globale
window.initDashboardAnimations = function() {
    if (dashboardAnimations) {
        dashboardAnimations.restart();
    } else {
        dashboardAnimations = new DashboardAnimations();
    }
    return dashboardAnimations;
};

// Auto-initialisation quand le script est chargé
window.addEventListener('load', () => {
    // Attendre un peu pour s'assurer que tout le DOM est prêt
    setTimeout(() => {
        dashboardAnimations = new DashboardAnimations();
    }, 500);
});

// Export pour utilisation globale
window.DashboardAnimations = DashboardAnimations;
