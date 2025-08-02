/**
 * Diagramme de Séquence Interactif - Architecture Académique
 * Système de Détection d'Agression Verbale - 6 Modules Principaux
 * Version corrigée avec alignement et positionnement optimisés
 * 
 * @author Système d'Architecture Académique
 * @version 2.1.0
 * @requires D3.js v7+
 */

class SequenceDiagram {
    /**
     * Constructeur du diagramme de séquence
     * @param {string} containerId - ID du conteneur HTML
     * @param {Object} options - Options de configuration personnalisées
     */
    constructor(containerId, options = {}) {
        // Configuration optimisée pour un affichage complet du diagramme
        this.config = {
            width: 1800, // Largeur de base qui sera adaptée dynamiquement
            height: 1800, // Hauteur augmentée pour voir tout le contenu
            margin: { top: 60, right: 50, bottom: 100, left: 50 },
            moduleHeight: 140,
            subModuleHeight: 35,
            moduleSpacing: 240,
            titleOffset: 50,
            lifelineStart: 220,
            flowMessageStart: 280,
            animationSpeed: 1.0,
            
            // Palette de couleurs professionnelle moderne
            colors: {
                primary: '#2563eb',      // Bleu moderne
                secondary: '#7c3aed',    // Violet professionnel
                success: '#059669',      // Vert émeraude
                warning: '#d97706',      // Orange ambré
                danger: '#dc2626',       // Rouge moderne
                info: '#0891b2',         // Cyan
                dark: '#1f2937',         // Gris foncé
                light: '#f8fafc',        // Gris très clair
                
                // Couleurs spécifiques aux composants
                service: '#3b82f6',      // Bleu service
                outil: '#f59e0b',        // Orange outil
                processus: '#10b981',    // Vert processus
                alert: '#ef4444',        // Rouge alerte
                connection: '#8b5cf6',   // Violet connexion
                start: '#374151',        // Gris start
                
                // Dégradés
                gradients: {
                    primary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    secondary: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    danger: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
                }
            },
            
            // Configuration des animations
            animations: {
                duration: 800,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                stagger: 100
            },
            
            // Configuration de la typographie
            typography: {
                fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
                sizes: {
                    title: '26px',
                    subtitle: '18px',
                    body: '13px',
                    small: '11px',
                    tiny: '9px'
                },
                weights: {
                    light: 300,
                    normal: 400,
                    medium: 500,
                    semibold: 600,
                    bold: 700
                }
            },
            
            // Effets visuels
            effects: {
                shadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                shadowHover: '0 20px 40px rgba(0, 0, 0, 0.15)',
                borderRadius: 12,
                borderRadiusLarge: 16
            },
            
            ...options
        };

        // Stocker les options pour utilisation ultérieure
        this.options = options;
        
        // Initialisation des propriétés
        this.container = d3.select(containerId);
        this.currentStep = 0;
        this.animationRunning = false;
        this.timeout = null;
        this.tooltipVisible = false;
        
        // Vérification de D3.js
        if (typeof d3 === 'undefined') {
            this.showError('D3.js n\'est pas chargé. Veuillez inclure D3.js v7+ avant ce script.');
            return;
        }
        
        // Initialisation des données
        this.initModules();
        this.initDataFlow();
        
        // Construction du diagramme
        this.init();
    }

    /**
     * Affichage des erreurs
     * @param {string} message - Message d'erreur
     */
    showError(message) {
        this.container
            .append('div')
            .style('padding', '20px')
            .style('background', '#fee2e2')
            .style('border', '1px solid #fecaca')
            .style('border-radius', '8px')
            .style('color', '#991b1b')
            .style('font-family', this.config.typography.fontFamily)
            .text(`❌ Erreur: ${message}`);
    }

    /**
     * Initialisation des modules avec positions fixes optimales
     */
    initModules() {
        // Utiliser des positions fixes optimisées pour voir tous les modules avec espacement réduit
        const totalWidth = 1600; // Largeur utilisable réduite pour resserrer
        const moduleCount = 7; // 6 modules + 1 nœud START
        const spacing = totalWidth / (moduleCount - 1); // Espacement uniforme réduit
        
        this.modules = [
            {
                id: 'detection',
                name: '🎯 MODULE DÉTECTION',
                x: 80, // Décalage du bord gauche
                category: 'input',
                service: 'Détection Son/Mouvement',
                outil: 'Capteurs Multimodaux',
                processus: 'Conditions: Cri/Mouvement/Mots',
                description: 'Système de détection multimodal en temps réel'
            },
            {
                id: 'camera',
                name: '📹 MODULE CAMÉRA',
                x: 80 + spacing * 1,
                category: 'capture',
                service: 'API + Serveur Vidéo',
                outil: 'Caméra HD 4K',
                processus: 'Vidéo + Enregistrement',
                description: 'Capture vidéo haute définition avec streaming'
            },
            {
                id: 'start',
                name: '⚡ START',
                x: 80 + spacing * 2.2, // Position plus proche des modules
                category: 'control',
                isIntermediate: true,
                description: 'Point de synchronisation central'
            },
            {
                id: 'filtrage',
                name: '🔧 MODULE FILTRAGE',
                x: 80 + spacing * 3.1, // Espacement réduit après START
                category: 'processing',
                service: 'Numérisation & Filtrage',
                outil: 'Code Python + Serveur',
                processus: 'Data Initialisées',
                description: 'Prétraitement et nettoyage des données'
            },
            {
                id: 'ia',
                name: '🧠 MODULE IA',
                x: 80 + spacing * 4.1,
                category: 'analysis',
                service: 'Intelligence Artificielle',
                outil: 'Modèle Zeta CNN-BiLSTM',
                processus: 'Alerte + Précision',
                description: 'Analyse intelligente par réseaux de neurones'
            },
            {
                id: 'decision',
                name: '⚖️ MODULE DÉCISION',
                x: 80 + spacing * 5.1,
                category: 'logic',
                service: 'Serveur de Décision',
                outil: 'Microprocesseur ESP32',
                processus: 'Alerte Danger',
                description: 'Prise de décision automatisée'
            },
            {
                id: 'reaction',
                name: '🚨 MODULE RÉACTION',
                x: 80 + spacing * 6, // Dernier module
                category: 'output',
                service: 'Réaction + Attention',
                outil: 'LED+SMS+Buzzer+Moteur',
                processus: 'Réaction Finale',
                description: 'Système de réponse multi-canal'
            }
        ];
    }

    /**
     * Initialisation du flux de données entre modules
     */
    initDataFlow() {
        this.dataFlow = [
            // Phase 1: Détection initiale
            { 
                from: 'detection', to: 'detection', type: 'service', 
                text: '🔍 Détection Son/Mouvement\n(Analyse en temps réel)', 
                delay: 500, phase: 'detection'
            },
            { 
                from: 'detection', to: 'detection', type: 'outil', 
                text: '📡 Capteurs Multimodaux\n(INMP441 + PIR + ESP32)', 
                delay: 1000, phase: 'detection'
            },
            { 
                from: 'detection', to: 'detection', type: 'processus', 
                text: '⚠️ Conditions Détectées\n(Cri >85dB / Mouvement / Mots)', 
                delay: 1500, phase: 'detection'
            },
            
            // Phase 2: Activation caméra
            { 
                from: 'detection', to: 'camera', type: 'connection', 
                text: '🔗 Condition Déclenchée\n→ Activation Caméra', 
                delay: 2000, phase: 'capture'
            },
            { 
                from: 'camera', to: 'camera', type: 'service', 
                text: '🖥️ API + Serveur Vidéo\n(ONVIF/RTSP Protocol)', 
                delay: 2500, phase: 'capture'
            },
            { 
                from: 'camera', to: 'camera', type: 'outil', 
                text: '📹 Caméra HD 4K\n(Hikvision 25FPS)', 
                delay: 3000, phase: 'capture'
            },
            { 
                from: 'camera', to: 'camera', type: 'processus', 
                text: '🎥 Vidéo + Enregistrement\n(H.264 Buffer 5min)', 
                delay: 3500, phase: 'capture'
            },
            
            // Phase 3: Passage par START
            { 
                from: 'camera', to: 'start', type: 'connection', 
                text: '🔄 Données Brutes\n→ Point Central START', 
                delay: 4000, phase: 'control'
            },
            { 
                from: 'start', to: 'filtrage', type: 'connection', 
                text: '⚡ START → Filtrage\n(Synchronisation)', 
                delay: 4500, phase: 'control'
            },
            
            // Phase 4: Filtrage des données
            { 
                from: 'filtrage', to: 'filtrage', type: 'service', 
                text: '🔬 Numérisation & Filtrage\n(RNNoise + MTCNN)', 
                delay: 5000, phase: 'processing'
            },
            { 
                from: 'filtrage', to: 'filtrage', type: 'outil', 
                text: '🐍 Code Python + Serveur\n(OpenCV + Librosa)', 
                delay: 5500, phase: 'processing'
            },
            { 
                from: 'filtrage', to: 'filtrage', type: 'processus', 
                text: '📊 Data Initialisées\n(Format Parquet)', 
                delay: 6000, phase: 'processing'
            },
            
            // Phase 5: Analyse IA
            { 
                from: 'filtrage', to: 'ia', type: 'connection', 
                text: '🔗 Data Clean → IA\n(Données Structurées)', 
                delay: 6500, phase: 'analysis'
            },
            { 
                from: 'ia', to: 'ia', type: 'service', 
                text: '🤖 Intelligence Artificielle\n(Classification Menace)', 
                delay: 7000, phase: 'analysis'
            },
            { 
                from: 'ia', to: 'ia', type: 'outil', 
                text: '🧠 Modèle Zeta CNN-BiLSTM\n(Coral Edge TPU)', 
                delay: 7500, phase: 'analysis'
            },
            { 
                from: 'ia', to: 'ia', type: 'processus', 
                text: '🚨 Alerte + Précision\n(Score: 0.95 | Type: Verbal)', 
                delay: 8000, phase: 'analysis'
            },
            
            // Phase 6: Prise de décision
            { 
                from: 'ia', to: 'decision', type: 'alert', 
                text: '🚨 ALERTE CRITIQUE\n→ Décision Requise', 
                delay: 8500, phase: 'logic'
            },
            { 
                from: 'decision', to: 'decision', type: 'service', 
                text: '⚖️ Serveur de Décision\n(Arbre CART + QoS)', 
                delay: 9000, phase: 'logic'
            },
            { 
                from: 'decision', to: 'decision', type: 'outil', 
                text: '🔧 Microprocesseur ESP32\n(FreeRTOS Real-time)', 
                delay: 9500, phase: 'logic'
            },
            { 
                from: 'decision', to: 'decision', type: 'processus', 
                text: '⚠️ Alerte Danger\n(Niveau: CRITIQUE)', 
                delay: 10000, phase: 'logic'
            },
            
            // Phase 7: Réaction finale
            { 
                from: 'decision', to: 'reaction', type: 'alert', 
                text: '🔴 DANGER CONFIRMÉ\n→ Réaction Immédiate', 
                delay: 10500, phase: 'output'
            },
            { 
                from: 'reaction', to: 'reaction', type: 'service', 
                text: '🚨 Réaction + Attention\n(Orchestration Multi-Canal)', 
                delay: 11000, phase: 'output'
            },
            { 
                from: 'reaction', to: 'reaction', type: 'outil', 
                text: '🔧 LED+SMS+Buzzer+Moteur\n(Twilio+GPIO+MQTT)', 
                delay: 11500, phase: 'output'
            },
            { 
                from: 'reaction', to: 'reaction', type: 'processus', 
                text: '✅ Réaction Finale\n(Alertes Déclenchées)', 
                delay: 12000, phase: 'output'
            }
        ];
    }

    /**
     * Initialisation principale du diagramme
     */
    init() {
        try {
            this.cleanContainer();
            this.createSVG();
            this.createDefinitions();
            this.drawBackground();
            this.drawTitle();
            this.drawModules();
            this.drawLegend();
            this.setupControls();
            this.setupTooltip();
            this.addInteractivity();
        } catch (error) {
            this.showError(`Erreur lors de l'initialisation: ${error.message}`);
        }
    }

    /**
     * Nettoyage du conteneur
     */
    cleanContainer() {
        this.container.selectAll('*').remove();
    }

    /**
     * Création du SVG principal avec vue complète du diagramme
     */
    createSVG() {
        // Calculer les dimensions réelles du conteneur
        const containerElement = this.container.node();
        const containerWidth = Math.max(
            containerElement.offsetWidth || 0, 
            containerElement.clientWidth || 0,
            containerElement.getBoundingClientRect().width || 0,
            1800 // Largeur minimale garantie
        );
        
        // Forcer une largeur fixe pour voir tout le diagramme sans zoom
        const diagramWidth = 1800; // Largeur fixe pour voir tous les modules
        const diagramHeight = this.config.height;
        
        console.log(`🔧 Création SVG: ${diagramWidth}x${diagramHeight}px (conteneur: ${containerWidth}px)`);
        
        this.svg = this.container
            .append('svg')
            .attr('width', diagramWidth) // Largeur fixe au lieu de 100%
            .attr('height', diagramHeight)
            .attr('viewBox', `0 0 ${diagramWidth} ${diagramHeight}`)
            .attr('preserveAspectRatio', 'xMinYMin meet') // Alignement à gauche
            .style('background', this.config.colors.gradients.background)
            .style('border-radius', `${this.config.effects.borderRadiusLarge}px`)
            .style('box-shadow', this.config.effects.shadow)
            .style('border', `2px solid ${this.config.colors.light}`)
            .style('font-family', this.config.typography.fontFamily)
            .style('display', 'block')
            .style('overflow', 'visible');
        
        // Mettre à jour la largeur dans la config pour les calculs
        this.config.width = diagramWidth;
        
        this.g = this.svg.append('g')
            .attr('transform', `translate(${this.config.margin.left}, ${this.config.margin.top})`);
    }

    /**
     * Création des définitions SVG (marqueurs, dégradés, filtres)
     */
    createDefinitions() {
        const defs = this.svg.append('defs');
        
        // Marqueur de flèche moderne
        defs.append('marker')
            .attr('id', 'arrow-modern')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 9)
            .attr('refY', 0)
            .attr('markerWidth', 10)
            .attr('markerHeight', 10)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .style('fill', this.config.colors.dark)
            .style('stroke', this.config.colors.dark)
            .style('stroke-width', 1);

        // Dégradés pour les modules
        const gradientData = [
            { id: 'gradient-service', colors: ['#3b82f6', '#1d4ed8'] },
            { id: 'gradient-outil', colors: ['#f59e0b', '#d97706'] },
            { id: 'gradient-processus', colors: ['#10b981', '#059669'] },
            { id: 'gradient-alert', colors: ['#ef4444', '#dc2626'] },
            { id: 'gradient-connection', colors: ['#8b5cf6', '#7c3aed'] }
        ];

        gradientData.forEach(grad => {
            const gradient = defs.append('linearGradient')
                .attr('id', grad.id)
                .attr('x1', '0%')
                .attr('y1', '0%')
                .attr('x2', '100%')
                .attr('y2', '100%');
            
            gradient.append('stop')
                .attr('offset', '0%')
                .style('stop-color', grad.colors[0]);
            
            gradient.append('stop')
                .attr('offset', '100%')
                .style('stop-color', grad.colors[1]);
        });

        // Filtre d'ombre portée
        const filter = defs.append('filter')
            .attr('id', 'drop-shadow')
            .attr('x', '-50%')
            .attr('y', '-50%')
            .attr('width', '200%')
            .attr('height', '200%');
        
        filter.append('feDropShadow')
            .attr('dx', 0)
            .attr('dy', 4)
            .attr('stdDeviation', 8)
            .attr('flood-color', 'rgba(0,0,0,0.1)');
    }

    /**
     * Dessin du fond avec motif subtil
     */
    drawBackground() {
        // Motif de grille subtile
        const pattern = this.svg.select('defs').append('pattern')
            .attr('id', 'grid')
            .attr('width', 50)
            .attr('height', 50)
            .attr('patternUnits', 'userSpaceOnUse');
        
        pattern.append('path')
            .attr('d', 'M 50 0 L 0 0 0 50')
            .style('fill', 'none')
            .style('stroke', this.config.colors.light)
            .style('stroke-width', 1)
            .style('opacity', 0.3);
        
        this.g.append('rect')
            .attr('width', this.config.width - this.config.margin.left - this.config.margin.right)
            .attr('height', this.config.height - this.config.margin.top - this.config.margin.bottom)
            .style('fill', 'url(#grid)')
            .style('opacity', 0.5);
    }

    /**
     * Dessin du titre principal avec positionnement corrigé
     */
    drawTitle() {
        const titleGroup = this.svg.append('g').attr('class', 'title-group');
        
        // Titre principal - positionné pour éviter les conflits
        titleGroup.append('text')
            .attr('x', this.config.width / 2)
            .attr('y', 50)
            .attr('text-anchor', 'middle')
            .style('font-size', this.config.typography.sizes.title)
            .style('font-weight', this.config.typography.weights.bold)
            .style('fill', '#343f56ff') // Couleur grise pour le titre
            .style('font-family', this.config.typography.fontFamily)
            .text('🛡️ Architecture Académique - Système de Détection d\'Agression Verbale');
        
        // Sous-titre
        titleGroup.append('text')
            .attr('x', this.config.width / 2)
            .attr('y', 80)
            .attr('text-anchor', 'middle')
            .style('font-size', this.config.typography.sizes.subtitle)
            .style('font-weight', this.config.typography.weights.medium)
            .style('fill', '#263244ff') // Couleur grise plus claire pour le sous-titre
            .style('font-family', this.config.typography.fontFamily)
            .text('Architecture Edge-to-Cloud | 6 Modules Principaux | 3 Composants par Module');
    }

    /**
     * Dessin des modules principaux avec espacement optimisé
     */
    drawModules() {
        this.modules.forEach((module, index) => {
            const group = this.g.append('g')
                .attr('class', `module-group module-${module.id}`)
                .style('cursor', 'pointer');
            
            if (module.isIntermediate) {
                this.drawIntermediateNode(group, module);
            } else {
                this.drawMainModule(group, module, index);
            }
            
            this.drawLifeline(group, module);
        });
    }

    /**
     * Dessin du nœud intermédiaire (START) avec position corrigée
     */
    drawIntermediateNode(group, module) {
        // Cercle principal avec dégradé - taille réduite pour mieux s'intégrer
        group.append('circle')
            .attr('cx', module.x)
            .attr('cy', 150)
            .attr('r', 35) // Rayon réduit de 45 à 35
            .style('fill', `url(#gradient-connection)`)
            .style('stroke', this.config.colors.dark)
            .style('stroke-width', 2) // Bordure plus fine
            .style('filter', 'url(#drop-shadow)')
            .style('transition', 'all 0.3s ease');
        
        // Texte du nœud - taille adaptée
        group.append('text')
            .attr('x', module.x)
            .attr('y', 155) // Position ajustée
            .attr('text-anchor', 'middle')
            .style('fill', 'white')
            .style('font-size', '11px') // Taille réduite
            .style('font-weight', this.config.typography.weights.bold)
            .style('text-shadow', '0 2px 4px rgba(0,0,0,0.3)')
            .text('START');
    }

    /**
     * Dessin d'un module principal avec dimensions optimisées
     */
    drawMainModule(group, module, index) {
        // Animation d'entrée avec délai
        group.style('opacity', 0)
            .style('transform', 'translateY(20px)')
            .transition()
            .delay(index * this.config.animations.stagger)
            .duration(this.config.animations.duration)
            .style('opacity', 1)
            .style('transform', 'translateY(0px)');

        // Conteneur principal avec ombre moderne et espacement optimisé
        const mainRect = group.append('rect')
            .attr('x', module.x - 85)
            .attr('y', 40)
            .attr('width', 170)
            .attr('height', this.config.moduleHeight)
            .attr('rx', this.config.effects.borderRadius)
            .style('fill', 'white')
            .style('stroke', this.config.colors.primary)
            .style('stroke-width', 2)
            .style('filter', 'url(#drop-shadow)')
            .style('transition', 'all 0.3s ease');
        
        // Titre du module avec style moderne
        group.append('text')
            .attr('x', module.x)
            .attr('y', 62)
            .attr('text-anchor', 'middle')
            .style('fill', '#6b7280') // Couleur grise pour les titres de modules
            .style('font-size', '12px')
            .style('font-weight', this.config.typography.weights.bold)
            .style('font-family', this.config.typography.fontFamily)
            .text(module.name);
        
        // Sous-modules avec design amélioré et espacement réduit
        this.drawSubModule(group, module, 'service', 80);
        this.drawSubModule(group, module, 'outil', 120);
        this.drawSubModule(group, module, 'processus', 160);

        // Effet de survol
        group.on('mouseenter', function() {
            mainRect.style('stroke-width', 3)
                   .style('stroke', this.config.colors.secondary);
        }.bind(this))
        .on('mouseleave', function() {
            mainRect.style('stroke-width', 2)
                   .style('stroke', this.config.colors.primary);
        }.bind(this));
    }

    /**
     * Dessin d'un sous-module avec dimensions compactes optimisées
     */
    drawSubModule(group, module, type, yPos) {
        const color = this.config.colors[type];
        const text = module[type];
        
        // Rectangle du sous-module avec dégradé et taille réduite
        group.append('rect')
            .attr('x', module.x - 80)
            .attr('y', yPos)
            .attr('width', 160)
            .attr('height', this.config.subModuleHeight)
            .attr('rx', this.config.effects.borderRadius - 4)
            .style('fill', `url(#gradient-${type})`)
            .style('stroke', this.config.colors.dark)
            .style('stroke-width', 1)
            .style('opacity', 0.95);
        
        // Icône et label du type avec taille réduite
        const typeLabels = {
            service: { icon: '🔧', label: 'SERVICE' },
            outil: { icon: '🛠️', label: 'OUTIL' },
            processus: { icon: '📤', label: 'PROCESSUS' }
        };
        
        const typeInfo = typeLabels[type];
        
        group.append('text')
            .attr('x', module.x)
            .attr('y', yPos + 16)
            .attr('text-anchor', 'middle')
            .style('fill', 'white')
            .style('font-size', '10px')
            .style('font-weight', this.config.typography.weights.bold)
            .style('text-shadow', '0 1px 2px rgba(0,0,0,0.5)')
            .text(`${typeInfo.icon} ${typeInfo.label}`);
        
        // Contenu du sous-module avec meilleur formatage et taille adaptée
        const lines = this.formatText(text, 20);
        lines.forEach((line, i) => {
            group.append('text')
                .attr('x', module.x)
                .attr('y', yPos + 28 + (i * 10))
                .attr('text-anchor', 'middle')
                .style('fill', 'white')
                .style('font-size', '9px')
                .style('font-weight', this.config.typography.weights.medium)
                .style('text-shadow', '0 1px 2px rgba(0,0,0,0.5)')
                .text(line);
        });
    }

    /**
     * Formatage intelligent du texte
     */
    formatText(text, maxLength) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';
        
        words.forEach(word => {
            if ((currentLine + word).length <= maxLength) {
                currentLine += (currentLine ? ' ' : '') + word;
            } else {
                if (currentLine) lines.push(currentLine);
                currentLine = word;
            }
        });
        
        if (currentLine) lines.push(currentLine);
        return lines.slice(0, 2); // Maximum 2 lignes
    }

    /**
     * Dessin des lignes de vie avec positionnement corrigé
     */
    drawLifeline(group, module) {
        group.append('line')
            .attr('x1', module.x)
            .attr('y1', module.isIntermediate ? 185 : this.config.lifelineStart) // Position ajustée pour START
            .attr('x2', module.x)
            .attr('y2', this.config.height - 300) // Plus d'espace pour l'animation
            .style('stroke', this.config.colors.primary)
            .style('stroke-width', 2)
            .style('stroke-dasharray', '8,4')
            .style('opacity', 0.6);
    }

    /**
     * Dessin de la légende moderne avec positionnement optimisé
     */
    drawLegend() {
        const legend = this.g.append('g').attr('class', 'legend');
        const legendY = this.config.height - 220; // Position plus basse avec la nouvelle hauteur
        
        // Fond de la légende
        legend.append('rect')
            .attr('x', 40)
            .attr('y', legendY - 30)
            .attr('width', this.config.width - 160)
            .attr('height', 90)
            .attr('rx', this.config.effects.borderRadius)
            .style('fill', 'white')
            .style('stroke', this.config.colors.light)
            .style('stroke-width', 2)
            .style('filter', 'url(#drop-shadow)')
            .style('opacity', 0.95);
        
        // Titre de la légende
        legend.append('text')
            .attr('x', 60)
            .attr('y', legendY - 5)
            .style('font-size', this.config.typography.sizes.subtitle)
            .style('font-weight', this.config.typography.weights.bold)
            .style('fill', this.config.colors.dark)
            .style('font-family', this.config.typography.fontFamily)
            .text('📋 Légende des Composants');
        
        const legendItems = [
            { type: 'service', label: 'Service (Logique Métier)', x: 60 },
            { type: 'outil', label: 'Outil (Hardware/Software)', x: 320 },
            { type: 'processus', label: 'Processus (Output/Résultat)', x: 580 },
            { type: 'connection', label: 'Connexion (Flux de Données)', x: 840 },
            { type: 'alert', label: 'Alerte (Action Critique)', x: 1100 }
        ];
        
        legendItems.forEach(item => {
            // Rectangle coloré avec dégradé
            legend.append('rect')
                .attr('x', item.x)
                .attr('y', legendY + 20)
                .attr('width', 20)
                .attr('height', 20)
                .attr('rx', 4)
                .style('fill', `url(#gradient-${item.type})`);
            
            // Texte de la légende
            legend.append('text')
                .attr('x', item.x + 28)
                .attr('y', legendY + 35)
                .style('font-size', this.config.typography.sizes.small)
                .style('font-weight', this.config.typography.weights.medium)
                .style('fill', this.config.colors.dark)
                .style('font-family', this.config.typography.fontFamily)
                .text(item.label);
        });
    }

    /**
     * Configuration des contrôles interactifs
     */
    setupControls() {
        const controls = this.container
            .append('div')
            .attr('class', 'sequence-controls')
            .style('text-align', 'center')
            .style('margin-top', '30px')
            .style('padding', '30px')
            .style('background', this.config.colors.gradients.background)
            .style('border-radius', `${this.config.effects.borderRadius}px`)
            .style('box-shadow', this.config.effects.shadow)
            .style('border', `1px solid ${this.config.colors.light}`)
            .style('font-family', this.config.typography.fontFamily);
        
        // Conteneur des boutons
        const buttonContainer = controls.append('div')
            .style('margin-bottom', '25px');
        
        // Styles communs pour les boutons
        const buttonStyle = {
            border: 'none',
            padding: '16px 32px',
            'border-radius': '25px',
            margin: '0 10px',
            cursor: 'pointer',
            'font-weight': this.config.typography.weights.semibold,
            'font-size': this.config.typography.sizes.body,
            'font-family': this.config.typography.fontFamily,
            transition: 'all 0.3s ease',
            'box-shadow': '0 4px 12px rgba(0,0,0,0.1)'
        };
        
        // Bouton Démarrer
        const startBtn = buttonContainer.append('button')
            .text('▶️ Démarrer Séquence')
            .style('background', this.config.colors.gradients.success)
            .style('color', 'white');
        
        Object.entries(buttonStyle).forEach(([key, value]) => {
            startBtn.style(key, value);
        });
        
        startBtn.on('mouseover', function() {
                d3.select(this)
                  .style('transform', 'translateY(-2px)')
                  .style('box-shadow', '0 8px 20px rgba(0,0,0,0.15)');
            })
            .on('mouseout', function() {
                d3.select(this)
                  .style('transform', 'translateY(0px)')
                  .style('box-shadow', '0 4px 12px rgba(0,0,0,0.1)');
            })
            .on('click', () => this.startAnimation());
        
        // Bouton Pause
        const pauseBtn = buttonContainer.append('button')
            .text('⏸️ Pause')
            .style('background', this.config.colors.gradients.warning)
            .style('color', 'white');
        
        Object.entries(buttonStyle).forEach(([key, value]) => {
            pauseBtn.style(key, value);
        });
        
        pauseBtn.on('mouseover', function() {
                d3.select(this)
                  .style('transform', 'translateY(-2px)')
                  .style('box-shadow', '0 8px 20px rgba(0,0,0,0.15)');
            })
            .on('mouseout', function() {
                d3.select(this)
                  .style('transform', 'translateY(0px)')
                  .style('box-shadow', '0 4px 12px rgba(0,0,0,0.1)');
            })
            .on('click', () => this.pauseAnimation());
        
        // Bouton Reset
        const resetBtn = buttonContainer.append('button')
            .text('🔄 Reset')
            .style('background', this.config.colors.gradients.danger)
            .style('color', 'white');
        
        Object.entries(buttonStyle).forEach(([key, value]) => {
            resetBtn.style(key, value);
        });
        
        resetBtn.on('mouseover', function() {
                d3.select(this)
                  .style('transform', 'translateY(-2px)')
                  .style('box-shadow', '0 8px 20px rgba(0,0,0,0.15)');
            })
            .on('mouseout', function() {
                d3.select(this)
                  .style('transform', 'translateY(0px)')
                  .style('box-shadow', '0 4px 12px rgba(0,0,0,0.1)');
            })
            .on('click', () => this.resetAnimation());
        
        // Contrôle de vitesse moderne
        const speedContainer = controls.append('div')
            .style('margin-bottom', '25px')
            .style('display', 'inline-block');
        
        speedContainer.append('label')
            .style('font-size', this.config.typography.sizes.body)
            .style('color', this.config.colors.dark)
            .style('margin-right', '15px')
            .style('font-weight', this.config.typography.weights.medium)
            .text('Vitesse d\'animation: ');
        
        const speedSelect = speedContainer.append('select')
            .attr('id', 'speedControl')
            .style('padding', '10px 15px')
            .style('border-radius', '8px')
            .style('border', `2px solid ${this.config.colors.light}`)
            .style('background', 'white')
            .style('font-family', this.config.typography.fontFamily)
            .style('font-size', this.config.typography.sizes.body)
            .style('cursor', 'pointer')
            .style('transition', 'all 0.3s ease');
        
        const speedOptions = [
            { value: '0.5', text: 'Lente' },
            { value: '1.0', text: 'Normale' },
            { value: '1.5', text: 'Rapide' },
            { value: '2.0', text: 'Très rapide' }
        ];
        
        speedOptions.forEach(option => {
            speedSelect.append('option')
                .attr('value', option.value)
                .property('selected', option.value === '1.0')
                .text(option.text);
        });
        
        speedSelect.on('change', (event) => {
            this.config.animationSpeed = parseFloat(event.target.value);
        });
        
        // Barre de progression moderne
        this.setupProgressBar(controls);
    }

    /**
     * Configuration de la barre de progression
     */
    setupProgressBar(controls) {
        this.progressContainer = controls.append('div')
            .style('margin-top', '25px');
        
        this.progressContainer.append('div')
            .style('font-size', this.config.typography.sizes.body)
            .style('color', this.config.colors.dark)
            .style('margin-bottom', '10px')
            .style('font-weight', this.config.typography.weights.medium)
            .text('Progression de la Séquence');
        
        this.progressBar = this.progressContainer.append('div')
            .style('width', '100%')
            .style('height', '14px')
            .style('background', this.config.colors.light)
            .style('border-radius', '7px')
            .style('overflow', 'hidden')
            .style('border', `1px solid ${this.config.colors.primary}`)
            .style('box-shadow', 'inset 0 2px 4px rgba(0,0,0,0.1)');
        
        this.progressFill = this.progressBar.append('div')
            .style('height', '100%')
            .style('width', '0%')
            .style('background', this.config.colors.gradients.primary)
            .style('transition', 'width 0.5s ease')
            .style('border-radius', '7px')
            .style('position', 'relative');
        
        // Texte de pourcentage
        this.progressText = this.progressContainer.append('div')
            .style('font-size', this.config.typography.sizes.small)
            .style('color', this.config.colors.secondary)
            .style('margin-top', '8px')
            .style('font-weight', this.config.typography.weights.medium)
            .text('0%');
    }

    /**
     * Configuration du tooltip
     */
    setupTooltip() {
        this.tooltip = this.container.append('div')
            .attr('class', 'sequence-tooltip')
            .style('position', 'absolute')
            .style('background', this.config.colors.dark)
            .style('color', 'white')
            .style('padding', '15px 20px')
            .style('border-radius', '10px')
            .style('font-size', this.config.typography.sizes.small)
            .style('font-family', this.config.typography.fontFamily)
            .style('box-shadow', this.config.effects.shadow)
            .style('pointer-events', 'none')
            .style('opacity', 0)
            .style('transition', 'opacity 0.3s ease')
            .style('z-index', 1000);
    }

    /**
     * Ajout de l'interactivité
     */
    addInteractivity() {
        // Interaction avec les modules
        this.g.selectAll('.module-group')
            .on('mouseenter', (event, d) => {
                const moduleData = this.modules.find(m => 
                    event.currentTarget.classList.contains(`module-${m.id}`)
                );
                
                if (moduleData && !moduleData.isIntermediate) {
                    this.showTooltip(event, moduleData.description);
                }
            })
            .on('mouseleave', () => {
                this.hideTooltip();
            });
    }

    /**
     * Affichage du tooltip
     */
    showTooltip(event, text) {
        this.tooltip
            .style('opacity', 1)
            .style('left', (event.pageX + 15) + 'px')
            .style('top', (event.pageY - 15) + 'px')
            .text(text);
    }

    /**
     * Masquage du tooltip
     */
    hideTooltip() {
        this.tooltip.style('opacity', 0);
    }

    // === MÉTHODES D'ANIMATION ===

    /**
     * Démarrage de l'animation
     */
    startAnimation() {
        if (this.animationRunning) return;
        
        this.animationRunning = true;
        this.currentStep = 0;
        this.g.selectAll('.flow-message').remove();
        this.animateStep();
    }

    /**
     * Pause de l'animation
     */
    pauseAnimation() {
        this.animationRunning = false;
        clearTimeout(this.timeout);
    }

    /**
     * Reset de l'animation
     */
    resetAnimation() {
        this.pauseAnimation();
        this.currentStep = 0;
        this.g.selectAll('.flow-message').remove();
        this.progressFill.style('width', '0%');
        this.progressText.text('0%');
    }

    /**
     * Animation d'une étape
     */
    animateStep() {
        if (!this.animationRunning || this.currentStep >= this.dataFlow.length) {
            this.animationRunning = false;
            if (this.currentStep >= this.dataFlow.length) {
                this.showCompletionMessage();
            }
            return;
        }
        
        const step = this.dataFlow[this.currentStep];
        this.drawFlowMessage(step, this.currentStep);
        
        // Mise à jour de la progression
        const progress = ((this.currentStep + 1) / this.dataFlow.length) * 100;
        this.progressFill.style('width', progress + '%');
        this.progressText.text(Math.round(progress) + '%');
        
        this.currentStep++;
        
        // Calcul du délai avec prise en compte de la vitesse
        const baseDelay = step.delay - (this.currentStep > 1 ? this.dataFlow[this.currentStep - 2].delay : 0);
        const adjustedDelay = baseDelay / this.config.animationSpeed;
        
        this.timeout = setTimeout(() => this.animateStep(), adjustedDelay);
    }

    /**
     * Dessin d'un message de flux avec positionnement optimisé
     */
    drawFlowMessage(step, index) {
        const fromModule = this.modules.find(m => m.id === step.from);
        const toModule = this.modules.find(m => m.id === step.to);
        const y = this.config.flowMessageStart + (index % 20) * 50;
        const color = this.config.colors[step.type];
        
        if (step.from === step.to) {
            this.drawSelfMessage(fromModule, step, y, color, index);
        } else {
            this.drawConnectionMessage(fromModule, toModule, step, y, color, index);
        }
    }

    /**
     * Dessin d'un message auto-référentiel avec espacement corrigé
     */
    drawSelfMessage(module, step, y, color, index) {
        const group = this.g.append('g').attr('class', 'flow-message');
        const rectWidth = 180;
        
        // Rectangle du message avec design moderne
        group.append('rect')
            .attr('x', module.x + 25)
            .attr('y', y - 25)
            .attr('width', rectWidth)
            .attr('height', 50)
            .attr('rx', this.config.effects.borderRadius)
            .style('fill', `url(#gradient-${step.type})`)
            .style('stroke', this.config.colors.dark)
            .style('stroke-width', 2)
            .style('filter', 'url(#drop-shadow)');
        
        // Flèche de retour moderne avec espacement corrigé
        group.append('path')
            .attr('d', `M ${module.x + 25} ${y} L ${module.x + 205} ${y} L ${module.x + 205} ${y + 25} L ${module.x + 30} ${y + 25}`)
            .style('fill', 'none')
            .style('stroke', this.config.colors.dark)
            .style('stroke-width', 3)
            .style('marker-end', 'url(#arrow-modern)');
        
        // Texte du message
        this.addMessageText(group, module.x + 210, y - 10, step.text, 'white');
        
        // Animation d'entrée
        group.style('opacity', 0)
            .style('transform', 'scale(0.8)')
            .transition()
            .duration(this.config.animations.duration / this.config.animationSpeed)
            .style('opacity', 1)
            .style('transform', 'scale(1)');
    }

    /**
     * Dessin d'un message de connexion avec espacement optimisé
     */
    drawConnectionMessage(from, to, step, y, color, index) {
        const group = this.g.append('g').attr('class', 'flow-message');
        
        // Ligne de connexion avec animation
        const line = group.append('line')
            .attr('x1', from.x)
            .attr('y1', y)
            .attr('x2', to.x)
            .attr('y2', y)
            .style('stroke', this.config.colors.dark)
            .style('stroke-width', 4)
            .style('marker-end', 'url(#arrow-modern)')
            .style('opacity', 0.9);
        
        // Texte du message avec espacement corrigé
        const textX = (from.x + to.x) / 2;
        this.addMessageText(group, textX, y - 35, step.text, this.config.colors.dark);
        
        // Animation de la ligne
        const totalLength = Math.abs(to.x - from.x);
        
        line.style('stroke-dasharray', totalLength + ' ' + totalLength)
            .style('stroke-dashoffset', totalLength)
            .transition()
            .duration(this.config.animations.duration / this.config.animationSpeed)
            .ease(d3.easeLinear)
            .style('stroke-dashoffset', 0);
        
        // Animation du texte
        group.selectAll('text')
            .style('opacity', 0)
            .transition()
            .delay((this.config.animations.duration / 2) / this.config.animationSpeed)
            .duration((this.config.animations.duration / 2) / this.config.animationSpeed)
            .style('opacity', 1);
    }

    /**
     * Ajout de texte formaté
     */
    addMessageText(group, x, y, text, color) {
        const lines = text.split('\n');
        lines.forEach((line, i) => {
            group.append('text')
                .attr('x', x)
                .attr('y', y + i * 16)
                .attr('text-anchor', 'middle')
                .style('font-size', this.config.typography.sizes.small)
                .style('font-weight', this.config.typography.weights.semibold)
                .style('fill', color)
                .style('text-shadow', color === 'white' ? '0 1px 2px rgba(0,0,0,0.5)' : '0 1px 2px rgba(255,255,255,0.8)')
                .style('font-family', this.config.typography.fontFamily)
                .text(line);
        });
    }

    /**
     * Affichage du message de completion avec positionnement corrigé
     */
    showCompletionMessage() {
        const completion = this.svg.append('g').attr('class', 'completion');
        
        // Fond du message
        completion.append('rect')
            .attr('x', this.config.width / 2 - 350)
            .attr('y', this.config.height - 120) // Position plus basse
            .attr('width', 700)
            .attr('height', 60)
            .attr('rx', 30)
            .style('fill', this.config.colors.gradients.success)
            .style('stroke', this.config.colors.dark)
            .style('stroke-width', 2)
            .style('filter', 'url(#drop-shadow)')
            .style('opacity', 0)
            .transition()
            .duration(this.config.animations.duration / this.config.animationSpeed)
            .style('opacity', 1);
        
        // Texte de completion
        completion.append('text')
            .attr('x', this.config.width / 2)
            .attr('y', this.config.height - 85) // Position adaptée
            .attr('text-anchor', 'middle')
            .style('font-size', this.config.typography.sizes.subtitle)
            .style('font-weight', this.config.typography.weights.bold)
            .style('fill', 'white')
            .style('text-shadow', '0 2px 4px rgba(0,0,0,0.3)')
            .style('font-family', this.config.typography.fontFamily)
            .text('✅ Séquence Complète | Système Opérationnel | Surveillance Active 24h/7j')
            .style('opacity', 0)
            .transition()
            .delay((this.config.animations.duration / 2) / this.config.animationSpeed)
            .duration(this.config.animations.duration / this.config.animationSpeed)
            .style('opacity', 1);
    }

    /**
     * Méthode pour adapter le diagramme - vue complète sans zoom (désactivée)
     */
    fitToContainer() {
        // Méthode désactivée pour éviter les conflits de zoom
        // Le diagramme utilise maintenant une taille fixe sans redimensionnement
        console.log('📐 fitToContainer: méthode désactivée pour maintenir vue fixe');
        return;
    }

    /**
     * Méthode pour mettre à jour les positions des modules
     */
    updateModulePositions() {
        const totalWidth = 1600; // Largeur réduite pour espacement optimisé
        const spacing = totalWidth / 6; // 6 intervalles pour 7 éléments
        const offset = 80; // Décalage du bord gauche
        
        this.modules.forEach((module, index) => {
            if (module.id === 'detection') {
                module.x = offset;
            } else if (module.id === 'camera') {
                module.x = offset + spacing * 1;
            } else if (module.id === 'start') {
                module.x = offset + spacing * 2.2; // Position optimisée
            } else if (module.id === 'filtrage') {
                module.x = offset + spacing * 3.1;
            } else if (module.id === 'ia') {
                module.x = offset + spacing * 4.1;
            } else if (module.id === 'decision') {
                module.x = offset + spacing * 5.1;
            } else if (module.id === 'reaction') {
                module.x = offset + spacing * 6;
            }
        });
    }
}

// Export pour utilisation globale
window.SequenceDiagram = SequenceDiagram;

/**
 * Fonction d'initialisation globale avec adaptation automatique
 * @param {string} containerId - ID du conteneur HTML
 * @param {Object} options - Options de configuration
 * @returns {SequenceDiagram|null} Instance du diagramme ou null en cas d'erreur
 */
window.initSequenceDiagram = function(containerId, options = {}) {
    if (typeof d3 === 'undefined') {
        console.error('❌ D3.js n\'est pas chargé. Veuillez inclure D3.js v7+ avant ce script.');
        return null;
    }
    
    try {
        // Forcer une largeur fixe pour éviter le zoom
        options.width = 1800;
        options.height = 1800;
        
        const diagram = new SequenceDiagram(containerId, options);
        
        // Plus d'adaptation automatique pour éviter les conflits
        console.log('✅ Diagramme initialisé avec dimensions fixes (1800x1800)');
        
        return diagram;
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation du diagramme:', error);
        return null;
    }
};

/**
 * Fonction utilitaire pour vérifier la compatibilité
 * @returns {Object} Informations sur la compatibilité
 */
window.checkSequenceDiagramCompatibility = function() {
    const compatibility = {
        d3Available: typeof d3 !== 'undefined',
        d3Version: typeof d3 !== 'undefined' ? d3.version : null,
        browserSupport: {
            svg: !!document.createElementNS,
            css3: !!window.CSS && !!CSS.supports,
            es6: typeof Symbol !== 'undefined'
        }
    };
    
    compatibility.isCompatible = compatibility.d3Available && 
                                compatibility.browserSupport.svg && 
                                compatibility.browserSupport.css3 && 
                                compatibility.browserSupport.es6;
    
    return compatibility;
};
