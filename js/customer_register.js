document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    var datepickers = document.querySelectorAll('.datepicker');
    var instancesDatepicker = M.Datepicker.init(datepickers, {
        format: 'yyyy-mm-dd',
        yearRange: [1950, 2024],
        defaultDate: new Date(),
        selectMonths: true,
        selectYears: true
    });

    // Mostrar/Ocultar Contraseña
    function togglePasswordVisibility(passwordInput, toggleIcon) {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        toggleIcon.textContent = type === 'password' ? 'visibility_off' : 'visibility';
    }

    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePasswordIcon = document.getElementById('toggle-password-icon');
    const toggleConfirmPasswordIcon = document.getElementById('toggle-confirm-password-icon');

    togglePasswordIcon.addEventListener('click', function() {
        togglePasswordVisibility(passwordInput, togglePasswordIcon);
    });

    toggleConfirmPasswordIcon.addEventListener('click', function() {
        togglePasswordVisibility(confirmPasswordInput, toggleConfirmPasswordIcon);
    });

    // Validación del formulario
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Enviar los datos del formulario al servidor
        var formData = new FormData(this);
        fetch('customer_register.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            this.reset();
            // Mostrar el botón de inicio de sesión solo si el registro fue exitoso
            if (data.success) {
                document.getElementById('login-button').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});