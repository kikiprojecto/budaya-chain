/**
 * Wallet Modal Position Fix
 * Forces the modal to center after it renders
 */

export function initWalletModalFix() {
  if (typeof window === 'undefined') return;

  // Watch for modal to appear and force center it
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          // Check if this is the wallet modal wrapper
          if (node.classList.contains('wallet-adapter-modal-wrapper') ||
              node.querySelector('.wallet-adapter-modal-wrapper')) {
            
            const wrapper = node.classList.contains('wallet-adapter-modal-wrapper') 
              ? node 
              : node.querySelector('.wallet-adapter-modal-wrapper') as HTMLElement;
            
            if (wrapper) {
              // Force center styles
              wrapper.style.position = 'fixed';
              wrapper.style.inset = '0';
              wrapper.style.top = '0';
              wrapper.style.left = '0';
              wrapper.style.right = '0';
              wrapper.style.bottom = '0';
              wrapper.style.display = 'flex';
              wrapper.style.alignItems = 'center';
              wrapper.style.justifyContent = 'center';
              wrapper.style.zIndex = '99999';
              wrapper.style.width = '100vw';
              wrapper.style.height = '100vh';
              
              // Force container to center
              const container = wrapper.querySelector('.wallet-adapter-modal-container') as HTMLElement;
              if (container) {
                container.style.margin = 'auto';
                container.style.position = 'relative';
                container.style.transform = 'none';
                container.style.left = 'auto';
                container.style.right = 'auto';
                container.style.top = 'auto';
                container.style.bottom = 'auto';
              }
            }
          }
        }
      });
    });
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => observer.disconnect();
}
