class EnhancedDashboardAnimations {
    constructor() {
        this.animationInterval = null;
        this.updateInterval = null;
        this.init();
    }

    init() {
        console.log('🚀 Initialisation du tableau de bord amélioré');
        this.startRealTimeUpdates();
        this.setupVisibilityObserver();
        this.animateCharts();
    }

    startRealTimeUpdates() {
        // Mise à jour des métriques toutes les 3 secondes
        this.updateInterval = setInterval(() => {
            this.updateMetrics();
            this.updateSystemHealth();
            this.updateActivityFeed();
        }, 3000);

        // Première mise à jour immédiate
        this.updateMetrics();
    }

    updateMetrics() {
        // Temps de réponse (1.8s à 3.2s)
        const responseTime = (1.8 + Math.random() * 1.4).toFixed(1);
        this.animateValue('responseTimeEnhanced', responseTime + 's');

        // Précision (94% à 98%)
        const accuracy = (94 + Math.random() * 4).toFixed(1);
        this.animateValue('accuracyEnhanced', accuracy + '%');

        // Débit (1000 à 1500/h)
        const throughput = Math.floor(1000 + Math.random() * 500);
        this.animateValue('throughputEnhanced', throughput.toLocaleString() + '/h');

        // Stats analytics
        const todayStats = Math.floor(2500 + Math.random() * 800);
        const weekStats = Math.floor(18000 + Math.random() * 2000);
        
        this.animateValue('todayStats', todayStats.toLocaleString());
        this.animateValue('weekStats', weekStats.toLocaleString());
    }

    updateSystemHealth() {
        // CPU (20% à 45%)
        const cpu = Math.floor(20 + Math.random() * 25);
        this.animateValue('cpuValue', cpu + '%');
        this.updateHealthBar('cpuValue', cpu);

        // Mémoire (55% à 75%)
        const memory = Math.floor(55 + Math.random() * 20);
        this.animateValue('memoryValue', memory + '%');
        this.updateHealthBar('memoryValue', memory);

        // GPU (80% à 95%)
        const gpu = Math.floor(80 + Math.random() * 15);
        this.animateValue('gpuValue', gpu + '%');
        this.updateHealthBar('gpuValue', gpu);

        // Réseau (15% à 35%)
        const network = Math.floor(15 + Math.random() * 20);
        this.animateValue('networkValue', network + '%');
        this.updateHealthBar('networkValue', network);
    }

    updateHealthBar(elementId, value) {
        const container = document.getElementById(elementId);
        if (!container) return;

        const healthItem = container.closest('.health-item-enhanced');
        const healthLine = healthItem.querySelector('.health-line');
        
        if (healthLine) {
            const newWidth = value;
            healthLine.setAttribute('d', `M5,25 L${newWidth},25`);
        }
    }

    animateValue(elementId, newValue) {
        const element = document.getElementById(elementId);
        if (!element) return;

        // Animation de flash pour indiquer le changement
        element.style.transform = 'scale(1.1)';
        element.style.color = '#ff6b6b';
        
        setTimeout(() => {
            element.textContent = newValue;
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = '#4facfe';
            }, 200);
        }, 300);
    }

    updateActivityFeed() {
        const activities = [
            { icon: '✅', text: 'Détection audio - RAS', time: 'À l\'instant', type: 'safe' },
            { icon: '🔍', text: 'Scan de sécurité complété', time: 'Il y a 1 minute', type: 'info' },
            { icon: '📡', text: 'Connexion réseau vérifiée', time: 'Il y a 3 minutes', type: 'safe' },
            { icon: '⚡', text: 'Performance optimisée', time: 'Il y a 5 minutes', type: 'info' },
            { icon: '🔧', text: 'Maintenance préventive', time: 'Il y a 8 minutes', type: 'warning' },
            { icon: '📊', text: 'Rapport généré', time: 'Il y a 12 minutes', type: 'safe' },
            { icon: '🛡️', text: 'Système sécurisé', time: 'Il y a 15 minutes', type: 'safe' }
        ];

        const activityFeed = document.querySelector('.activity-feed-enhanced');
        if (!activityFeed) return;

        // Prendre 4 activités aléatoirement
        const randomActivities = activities.sort(() => 0.5 - Math.random()).slice(0, 4);
        
        activityFeed.innerHTML = '';
        
        randomActivities.forEach((activity, index) => {
            setTimeout(() => {
                const activityElement = this.createActivityElement(activity);
                activityFeed.appendChild(activityElement);
                
                // Animation d'apparition
                setTimeout(() => {
                    activityElement.style.opacity = '1';
                    activityElement.style.transform = 'translateX(0)';
                }, 50);
            }, index * 200);
        });
    }

    createActivityElement(activity) {
        const activityItem = document.createElement('div');
        activityItem.className = `activity-item-enhanced ${activity.type}`;
        activityItem.style.opacity = '0';
        activityItem.style.transform = 'translateX(-20px)';
        activityItem.style.transition = 'all 0.5s ease';

        activityItem.innerHTML = `
            <div class="activity-icon-enhanced">${activity.icon}</div>
            <div class="activity-content-enhanced">
                <div class="activity-text-enhanced">${activity.text}</div>
                <div class="activity-time-enhanced">${activity.time}</div>
            </div>
            ${activity.time === 'À l\'instant' ? '<div class="activity-pulse"></div>' : ''}
        `;

        return activityItem;
    }

    animateCharts() {
        // Animer les courbes SVG
        const curves = document.querySelectorAll('.curve-line, .metric-line, .chart-line');
        curves.forEach((curve, index) => {
            setTimeout(() => {
                curve.style.animation = `${curve.classList.contains('curve-line') ? 'drawCurve' : 
                                        curve.classList.contains('metric-line') ? 'drawMetricLine' : 
                                        'drawChartLine'} 3s ease-in-out infinite`;
            }, index * 200);
        });
    }

    setupVisibilityObserver() {
        const dashboardSection = document.querySelector('.analytics-section-enhanced');
        if (!dashboardSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!this.updateInterval) {
                        console.log('👁️ Dashboard visible - Redémarrage des animations');
                        this.startRealTimeUpdates();
                    }
                } else {
                    if (this.updateInterval) {
                        console.log('👁️ Dashboard caché - Pause des animations');
                        clearInterval(this.updateInterval);
                        this.updateInterval = null;
                    }
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(dashboardSection);
    }

    // Méthodes de contrôle
    stopAnimations() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
    }

    setUpdateSpeed(speed) {
        this.stopAnimations();
        setTimeout(() => {
            this.updateInterval = setInterval(() => {
                this.updateMetrics();
                this.updateSystemHealth();
                this.updateActivityFeed();
            }, speed);
        }, 100);
    }

    // Simulation d'une alerte
    triggerAlert(type = 'warning', message = 'Alerte système détectée') {
        const alertActivity = {
            icon: type === 'error' ? '🚨' : '⚠️',
            text: message,
            time: 'À l\'instant',
            type: type
        };

        const activityFeed = document.querySelector('.activity-feed-enhanced');
        if (activityFeed) {
            const alertElement = this.createActivityElement(alertActivity);
            activityFeed.prepend(alertElement);
            
            setTimeout(() => {
                alertElement.style.opacity = '1';
                alertElement.style.transform = 'translateX(0)';
            }, 50);
        }
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.enhancedDashboard = new EnhancedDashboardAnimations();
        console.log('✅ Tableau de bord amélioré activé');
    }, 1500);
});

// Nettoyage
window.addEventListener('beforeunload', () => {
    if (window.enhancedDashboard) {
        window.enhancedDashboard.stopAnimations();
    }
});
