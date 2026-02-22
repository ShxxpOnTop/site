self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'Mise à jour du coffre.',
        icon: 'https://img.icons8.com/ios-filled/512/8b5cf6/flash-on.png',
        vibrate: [100, 50, 100],
        data: { dateOfArrival: Date.now() }
    };
    event.waitUntil(self.registration.showNotification('Alex Vault', options));
});

// Permet de cliquer sur la notif pour ouvrir l'appli
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('/dashboard.html'));
});
