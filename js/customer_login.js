document.addEventListener('DOMContentLoaded', function () {
    // Mostrar/Ocultar Contraseña
    const passwordInput = document.getElementById('customer-password');
    const togglePasswordIcon = document.getElementById('toggle-customer-password-icon');

    togglePasswordIcon.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? 'visibility_off' : 'visibility';
    });

    // Manejar el envío del formulario
    const loginForm = document.getElementById('customer-login-form');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('customer-username').value;
        const password = document.getElementById('customer-password').value;

        fetch('customer_login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'customer_dashboard.html';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                alert('Error: ' + error.message);
            });
    });
});