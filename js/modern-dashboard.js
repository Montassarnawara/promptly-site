// Dashboard Charts and Animations
class ModernDashboard {
    constructor() {
        this.initializeTime();
        this.initializeCharts();
        this.setupEventListeners();
    }

    initializeTime() {
        // Update live time
        const updateTime = () => {
            const now = new Date();
            const timeElement = document.getElementById('live-time');
            if (timeElement) {
                timeElement.textContent = now.toLocaleTimeString();
            }
        };
        
        setInterval(updateTime, 1000);
        updateTime();
    }

    initializeCharts() {
        // Initialize mini wave charts
        const waveCharts = document.querySelectorAll('.mini-wave-chart');
        waveCharts.forEach(chart => {
            const ctx = chart.getContext('2d');
            this.drawMiniWaveChart(ctx);
        });

        // Initialize gauge charts
        const gaugeCharts = document.querySelectorAll('.gauge-chart');
        gaugeCharts.forEach((chart, index) => {
            const ctx = chart.getContext('2d');
            this.drawGaugeChart(ctx, index);
        });

        // Initialize main chart only if Chart.js is available
        const detectionsChartElement = document.getElementById('detections-chart');
        if (detectionsChartElement && typeof Chart !== 'undefined') {
            const detectionsCtx = detectionsChartElement.getContext('2d');
            this.drawDetectionsChart(detectionsCtx);
        } else if (detectionsChartElement) {
            // Fallback to simple canvas drawing if Chart.js is not available
            const ctx = detectionsChartElement.getContext('2d');
            this.drawSimpleChart(ctx);
        }
    }

    drawMiniWaveChart(ctx) {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(0, height/2);
        
        for(let x = 0; x <= width; x += 2) {
            const y = height/2 + Math.sin((x + Date.now() * 0.01) * 0.2) * (height/4) * (0.5 + Math.random() * 0.5);
            ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = '#4facfe';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    drawGaugeChart(ctx, index) {
        const values = [75, 90, 60]; // Example values for the 3 gauges
        const colors = ['#4facfe', '#10b981', '#ff6b6b'];
        
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height;
        const radius = 35;
        const startAngle = Math.PI;
        const endAngle = 2 * Math.PI;
        
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Background
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 8;
        ctx.stroke();
        
        // Value
        const valueAngle = startAngle + (endAngle - startAngle) * (values[index] / 100);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, valueAngle);
        ctx.strokeStyle = colors[index];
        ctx.lineWidth = 8;
        ctx.stroke();
    }

    drawDetectionsChart(ctx) {
        // Chart.js implementation
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['00h', '04h', '08h', '12h', '16h', '20h', '24h'],
                datasets: [{
                    label: 'Détections',
                    data: [120, 190, 300, 500, 200, 300, 450],
                    borderColor: '#4facfe',
                    backgroundColor: 'rgba(79, 172, 254, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    drawSimpleChart(ctx) {
        // Fallback simple chart without Chart.js
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const data = [120, 190, 300, 500, 200, 300, 450];
        const max = Math.max(...data);
        
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        for (let i = 1; i < 5; i++) {
            const y = (height / 5) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Draw line
        ctx.strokeStyle = '#4facfe';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let i = 0; i < data.length; i++) {
            const x = (width / (data.length - 1)) * i;
            const y = height - (data[i] / max) * height;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Draw fill
        ctx.fillStyle = 'rgba(79, 172, 254, 0.1)';
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
    }

    setupEventListeners() {
        // Refresh button
        const refreshBtn = document.querySelector('.refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshDashboard();
            });
        }

        // Action buttons
        const actionBtns = document.querySelectorAll('.action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Add your action handling here
                console.log('Action button clicked');
            });
        });
    }

    refreshDashboard() {
        // Re-initialize charts with new data
        this.initializeCharts();
        
        // Update status indicators
        const statusIndicators = document.querySelectorAll('.status-indicator');
        statusIndicators.forEach(indicator => {
            // Simulate status changes
            const statuses = ['online', 'warning', 'offline'];
            const randomStatus = statuses[Math.floor(Math.random() * 2)]; // Mostly online/warning
            indicator.className = `status-indicator ${randomStatus}`;
        });

        // Add refresh animation
        const refreshBtn = document.querySelector('.refresh-btn i');
        if (refreshBtn) {
            refreshBtn.style.animation = 'spin 1s linear';
            setTimeout(() => {
                refreshBtn.style.animation = '';
            }, 1000);
        }
    }

    // Animation for wave charts
    animateWaveCharts() {
        const waveCharts = document.querySelectorAll('.mini-wave-chart');
        waveCharts.forEach(chart => {
            const ctx = chart.getContext('2d');
            this.drawMiniWaveChart(ctx);
        });
    }

    startAnimations() {
        // Animate wave charts every 100ms
        setInterval(() => {
            this.animateWaveCharts();
        }, 100);
        
        // Initialize new AI Models & Alerts features
        this.initResponseTimeChart();
        this.initAIModelsAnimation();
        this.initAlertsSimulation();
    }

    initResponseTimeChart() {
        const canvas = document.getElementById('response-time-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        if (typeof Chart !== 'undefined') {
            // Use Chart.js if available
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['10:00', '10:15', '10:30', '10:45', '11:00', '11:15'],
                    datasets: [{
                        label: 'Temps de Réponse (s)',
                        data: [2.1, 2.8, 1.9, 3.2, 2.3, 1.7],
                        borderColor: '#10f5aa',
                        backgroundColor: 'rgba(16, 245, 170, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            display: false
                        },
                        y: {
                            display: false,
                            min: 0,
                            max: 5
                        }
                    },
                    elements: {
                        point: {
                            radius: 0
                        }
                    }
                }
            });
        } else {
            // Fallback canvas drawing
            this.drawResponseTimeChart(ctx, canvas.width, canvas.height);
        }
    }

    drawResponseTimeChart(ctx, width, height) {
        const data = [2.1, 2.8, 1.9, 3.2, 2.3, 1.7];
        const max = 5;
        const margin = 10;
        
        ctx.clearRect(0, 0, width, height);
        
        // Draw background
        ctx.fillStyle = 'rgba(16, 245, 170, 0.1)';
        ctx.fillRect(0, 0, width, height);
        
        // Draw line
        ctx.strokeStyle = '#10f5aa';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((value, index) => {
            const x = (index / (data.length - 1)) * (width - 2 * margin) + margin;
            const y = height - ((value / max) * (height - 2 * margin) + margin);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
    }

    initAIModelsAnimation() {
        const modelItems = document.querySelectorAll('.model-item');
        
        modelItems.forEach((item, index) => {
            // Animate stat numbers
            const statNumber = item.querySelector('.stat-number');
            if (statNumber) {
                this.animateNumber(statNumber, parseInt(statNumber.textContent.replace(/,/g, '')), 2000 + (index * 500));
            }
            
            // Add pulse effect to active models
            const modelStatus = item.querySelector('.model-status.active');
            if (modelStatus) {
                setInterval(() => {
                    modelStatus.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        modelStatus.style.transform = 'scale(1)';
                    }, 200);
                }, 3000 + (index * 1000));
            }
        });
    }

    initAlertsSimulation() {
        const alertsList = document.querySelector('.alerts-list');
        if (!alertsList) return;

        // Simulate new alerts every 30 seconds
        setInterval(() => {
            this.addNewAlert();
        }, 30000);
    }

    addNewAlert() {
        const alertsList = document.querySelector('.alerts-list');
        if (!alertsList) return;

        const alertTypes = [
            {
                type: 'info',
                icon: 'fa-info',
                text: 'Scan de sécurité',
                status: 'completed',
                statusText: 'Complété',
                color: '#3742fa'
            },
            {
                type: 'warning',
                icon: 'fa-exclamation',
                text: 'Seuil élevé détecté',
                status: 'monitoring',
                statusText: 'Surveillance',
                color: '#ffa502'
            },
            {
                type: 'critical',
                icon: 'fa-siren',
                text: 'Incident majeur',
                status: 'sms-sent',
                statusText: 'SMS Police Envoyé',
                color: '#ff4757'
            }
        ];

        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        
        const alertElement = document.createElement('div');
        alertElement.className = `alert-item ${randomAlert.type}`;
        alertElement.innerHTML = `
            <div class="alert-icon">
                <i class="fas ${randomAlert.icon}"></i>
            </div>
            <div class="alert-content">
                <span class="alert-type">${randomAlert.text}</span>
                <span class="alert-time">À l'instant</span>
                <span class="alert-status ${randomAlert.status}">${randomAlert.statusText}</span>
            </div>
        `;

        // Add animation
        alertElement.style.opacity = '0';
        alertElement.style.transform = 'translateX(-20px)';
        
        alertsList.insertBefore(alertElement, alertsList.firstChild);
        
        // Animate in
        setTimeout(() => {
            alertElement.style.transition = 'all 0.3s ease';
            alertElement.style.opacity = '1';
            alertElement.style.transform = 'translateX(0)';
        }, 100);

        // Remove oldest alerts if more than 5
        const alerts = alertsList.querySelectorAll('.alert-item');
        if (alerts.length > 5) {
            const oldestAlert = alerts[alerts.length - 1];
            oldestAlert.style.transition = 'all 0.3s ease';
            oldestAlert.style.opacity = '0';
            oldestAlert.style.transform = 'translateX(20px)';
            setTimeout(() => {
                if (oldestAlert.parentNode) {
                    oldestAlert.parentNode.removeChild(oldestAlert);
                }
            }, 300);
        }

        // Update time for existing alerts
        this.updateAlertTimes();
    }

    updateAlertTimes() {
        const alertTimes = document.querySelectorAll('.alert-time');
        alertTimes.forEach((timeElement, index) => {
            if (index === 0) return; // Skip the newest alert
            
            const timeTexts = [
                'Il y a 1 min', 'Il y a 3 min', 'Il y a 7 min', 
                'Il y a 12 min', 'Il y a 18 min'
            ];
            
            if (index < timeTexts.length) {
                timeElement.textContent = timeTexts[index];
            }
        });
    }

    animateNumber(element, targetValue, duration) {
        const startValue = 0;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Add CSS animation for refresh button
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if dashboard elements exist
    if (document.querySelector('.analytics-dashboard')) {
        console.log('🚀 Initialisation du tableau de bord moderne');
        
        // Wait for Chart.js to load if it's being loaded
        const initDashboard = () => {
            window.modernDashboard = new ModernDashboard();
            window.modernDashboard.startAnimations();
            console.log('✅ Tableau de bord moderne initialisé');
        };

        // Check if Chart.js is available, otherwise proceed without it
        if (typeof Chart !== 'undefined') {
            initDashboard();
        } else {
            // Wait a bit for Chart.js to potentially load
            setTimeout(() => {
                initDashboard();
            }, 1000);
        }
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernDashboard;
}
