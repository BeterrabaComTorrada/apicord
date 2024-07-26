document.addEventListener('DOMContentLoaded', () => {
    fetchMessages();
    
    document.getElementById('messageForm').addEventListener('submit', (event) => {
        event.preventDefault();
        
        const messageText = document.getElementById('messageText').value;
        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;

        fetch('/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: messageText,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            })
        }).then(response => response.json())
          .then(() => fetchMessages())
          .catch(error => console.error('Error:', error));
    });

    function fetchMessages() {
        fetch('/messages')
            .then(response => response.json())
            .then(data => {
                const messagesList = document.getElementById('messagesList');
                messagesList.innerHTML = '';
                data.forEach(message => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `ID: ${message.id}, Text: ${message.text}, Latitude: ${message.latitude}, Longitude: ${message.longitude}`;
                    messagesList.appendChild(listItem);
                });
            });
    }
});
