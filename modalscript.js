  // Register the service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }

  // PWA install prompt
  let deferredPrompt;
  const installModal = document.getElementById('installModal');
  const installButton = document.getElementById('installBtn');
  const closeModalButton = document.getElementById('closeBtn');
  const cancelButton = document.getElementById('cancelBtn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installModal.style.display = 'flex';  // Show the modal
  });

  installButton.addEventListener('click', () => {
    installModal.style.display = 'none';  // Hide the modal
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });

  closeModalButton.addEventListener('click', () => {
    installModal.style.display = 'none';  // Hide the modal
  });

  cancelButton.addEventListener('click', () => {
    installModal.style.display = 'none';  // Hide the modal
  });

  window.addEventListener('click', (e) => {
    if (e.target === installModal) {
      installModal.style.display = 'none';  // Close modal if user clicks outside of it
    }
  });