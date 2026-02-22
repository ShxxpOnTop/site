// 1. Installation immédiate
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// 2. Activation et prise de contrôle
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// 3. Gestion du clic sur la notification (Version améliorée)
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    // Cherche si le dashboard est déjà ouvert pour éviter d'ouvrir 10 onglets
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            if (clientList.length > 0) {
                let client = clientList[0];
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) {
                        client = clientList[i];
                    }
                }
                return client.focus();
            }
            // Si rien n'est ouvert, on ouvre le dashboard
            return clients.openWindow('./dashboard.html');
        })
    );
});

// 4. Gestion des notifications Push (Optionnel, au cas où tu en aurais besoin plus tard)
self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'Nouvelle mise à jour.',
        icon: 'https://cdn-icons-png.flaticon.com/512/825/825561.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/825/825561.png',
        vibrate: [200, 100, 200],
        data: { dateOfArrival: Date.now() }
    };
    event.waitUntil(self.registration.showNotification('New Order', options));
});
