class GitHubPagesTransitions {
    constructor() {
        this.isTransitioning = false;
        this.init();
    }

    init() {
        // Add CSS for transitions
        this.addTransitionStyles();
        
        // Intercept clicks on internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && this.isInternalLink(link)) {
                e.preventDefault();
                this.transitionToPage(link.href);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.transitionToPage(window.location.href, false);
        });

        // Fade in current page on load
        document.body.classList.add('page-loaded');
    }

    addTransitionStyles() {
        const style = document.createElement('style');
        style.textContent = `
            body {
                opacity: 0;
                transition: opacity 0.4s ease-in-out;
            }
            
            body.page-loaded {
                opacity: 1;
            }
            
            body.page-transitioning {
                opacity: 0;
            }
            
            /* Optional: Add slide effect */
            main, .content, #content {
                transition: transform 0.4s ease-in-out;
            }
            
            body.page-transitioning main,
            body.page-transitioning .content,
            body.page-transitioning #content {
                transform: translateX(-30px);
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

    async transitionToPage(url, updateHistory = true) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Start fade out
        document.body.classList.add('page-transitioning');
        document.body.classList.remove('page-loaded');
        
        // Wait for fade out
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Navigate to new page
        if (updateHistory) {
            window.location.href = url;
        } else {
            window.location.reload();
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new GitHubPagesTransitions();
    });
} else {
    new GitHubPagesTransitions();
}