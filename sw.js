self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'Nouvelle mise à jour système.',
        icon: 'https://img.icons8.com/ios-filled/512/8b5cf6/flash-on.png',
        badge: 'https://img.icons8.com/ios-filled/512/8b5cf6/flash-on.png'
    };

    event.waitUntil(
        self.registration.showNotification('Alex Vault', options)
    );
});
