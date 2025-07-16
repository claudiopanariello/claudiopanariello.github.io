// zoom-transitions.js - Advanced zoom through letter transition

class ZoomLetterTransitions {
    constructor() {
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.addTransitionStyles();
        
        // Intercept clicks on internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && this.isInternalLink(link)) {
                e.preventDefault();
                this.zoomThroughLetter(link);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.fadeInPage();
        });

        // Fade in current page on load
        this.fadeInPage();
    }

    addTransitionStyles() {
        const style = document.createElement('style');
        style.textContent = `
            body {
                opacity: 0;
                transition: opacity 0.6s ease-in-out;
                overflow-x: hidden;
            }
            
            body.page-loaded {
                opacity: 1;
            }
            
            /* Zoom overlay */
            .zoom-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: #000;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            }
            
            .zoom-overlay.active {
                opacity: 1;
                pointer-events: all;
            }
            
            /* The letter that gets zoomed into */
            .zoom-letter {
                font-size: 20vw;
                font-weight: bold;
                color: white;
                font-family: 'Arial', sans-serif;
                transform: scale(1);
                transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                text-shadow: 0 0 50px rgba(255, 255, 255, 0.5);
                opacity: 1;
            }
            
            .zoom-letter.zoom-in {
                transform: scale(50);
                opacity: 0;
            }
            
            /* Page content animation */
            .page-content {
                transform: scale(0.8);
                opacity: 0;
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .page-content.zoom-out {
                transform: scale(50);
                opacity: 0;
            }
            
            .page-content.visible {
                transform: scale(1);
                opacity: 1;
            }
            
            /* Tunnel effect */
            .tunnel {
                position: absolute;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle, transparent 0%, transparent 30%, #000 70%);
                opacity: 0;
                transition: opacity 0.6s ease;
            }
            
            .tunnel.active {
                opacity: 1;
            }
            
            /* Particle effect */
            .particle {
                position: absolute;
                width: 2px;
                height: 2px;
                background: white;
                border-radius: 50%;
                opacity: 0;
                animation: particle-fly 1s ease-out forwards;
            }
            
            @keyframes particle-fly {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(var(--dx), var(--dy)) scale(0);
                }
            }
            
            /* Glow effect */
            .glow {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 200px;
                height: 200px;
                background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: glow-expand 1.2s ease-out forwards;
            }
            
            @keyframes glow-expand {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    isInternalLink(link) {
        return link.hostname === window.location.hostname && 
               !link.hasAttribute('target') &&
               !link.href.includes('#') &&
               !link.href.includes('mailto:') &&
               !link.href.includes('tel:');
    }

    async zoomThroughLetter(link) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Get the letter to zoom into (first letter of link text or page name)
        const linkText = link.textContent.trim();
        const letter = linkText.charAt(0).toUpperCase();
        
        // Create zoom overlay
        const overlay = this.createZoomOverlay(letter);
        document.body.appendChild(overlay);
        
        // Wrap existing content
        const content = document.querySelector('main, .content, #content, body > *:not(script):not(style):not(.zoom-overlay)');
        if (content && content.tagName !== 'SCRIPT' && content.tagName !== 'STYLE') {
            content.classList.add('page-content');
        }
        
        // Start the animation sequence
        await this.animateZoomSequence(overlay, link.href);
    }

    createZoomOverlay(letter) {
        const overlay = document.createElement('div');
        overlay.className = 'zoom-overlay';
        
        overlay.innerHTML = `
            <div class="tunnel"></div>
            <div class="glow"></div>
            <div class="zoom-letter">${letter}</div>
        `;
        
        return overlay;
    }

    async animateZoomSequence(overlay, targetUrl) {
        // Phase 1: Show overlay and zoom out current page
        overlay.classList.add('active');
        const tunnel = overlay.querySelector('.tunnel');
        tunnel.classList.add('active');
        
        const pageContent = document.querySelector('.page-content');
        if (pageContent) {
            pageContent.classList.add('zoom-out');
        }
        
        await this.sleep(300);
        
        // Phase 2: Create particles and start zooming into letter
        this.createParticles(overlay);
        
        const letter = overlay.querySelector('.zoom-letter');
        letter.classList.add('zoom-in');
        
        await this.sleep(600);
        
        // Phase 3: Navigate to new page
        window.location.href = targetUrl;
    }

    createParticles(overlay) {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position around the center
            const angle = (Math.PI * 2 * i) / particleCount;
            const radius = 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            particle.style.left = `calc(50% + ${x}px)`;
            particle.style.top = `calc(50% + ${y}px)`;
            
            // Random flight direction
            const dx = (Math.random() - 0.5) * 1000;
            const dy = (Math.random() - 0.5) * 1000;
            particle.style.setProperty('--dx', `${dx}px`);
            particle.style.setProperty('--dy', `${dy}px`);
            
            // Random delay
            particle.style.animationDelay = `${Math.random() * 0.3}s`;
            
            overlay.appendChild(particle);
        }
    }

    fadeInPage() {
        // Remove any existing overlays
        const existingOverlay = document.querySelector('.zoom-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        // Fade in the new page
        document.body.classList.add('page-loaded');
        
        // Animate content in
        const content = document.querySelector('main, .content, #content');
        if (content) {
            content.classList.add('page-content', 'visible');
        }
        
        this.isTransitioning = false;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ZoomLetterTransitions();
    });
} else {
    new ZoomLetterTransitions();
}