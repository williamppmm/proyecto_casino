document.addEventListener('DOMContentLoaded', function() {
    const sidenavElems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavElems);

    // Función para actualizar el tiempo de sesión
    function updateSessionTime(sessionStartTime) {
        const sessionTimeElement = document.getElementById('session-time');
        setInterval(() => {
            const currentTime = new Date().getTime();
            const elapsed = Math.floor((currentTime - sessionStartTime) / 1000);
            const hours = Math.floor(elapsed / 3600).toString().padStart(2, '0');
            const minutes = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
            const seconds = (elapsed % 60).toString().padStart(2, '0');
            sessionTimeElement.textContent = `Tiempo en línea: ${hours}:${minutes}:${seconds}`;
        }, 1000);
    }

    // Cargar información del cliente
    fetch('get_customer_info.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('customer-name').textContent = data.full_name;
                const sessionStartTime = new Date().getTime() - (data.session_time_seconds * 1000);
                updateSessionTime(sessionStartTime);
            } else {
                console.error('Error:', data.message);
            }
        })
        .catch(error => console.error('Error fetching customer info:', error));
});