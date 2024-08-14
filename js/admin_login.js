document.addEventListener('DOMContentLoaded', function () {
    // Inicializar el selector de Materialize
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);

    // Cargar departamentos
    fetch('get_departments.php?action=get_departments')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const departmentSelect = document.getElementById('department');
                departmentSelect.innerHTML = '<option value="" disabled selected>Seleccione su Departamento</option>';
                data.data.forEach(dept => {
                    let option = new Option(dept.departamento, dept.departamento);
                    departmentSelect.appendChild(option);
                });
                M.FormSelect.init(departmentSelect);
            } else {
                alert('Error: No se encontraron departamentos.');
            }
        })
        .catch(error => {
            console.error('Error al cargar departamentos:', error);
            alert('Error al cargar departamentos');
        });

    // Mostrar/Ocultar Contraseña
    const passwordInput = document.getElementById('password');
    const togglePasswordIcon = document.getElementById('toggle-password-icon');

    togglePasswordIcon.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? 'visibility_off' : 'visibility';
    });

    // Manejar el envío del formulario
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const department = document.getElementById('department').value;

        fetch('admin_login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, department })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = data.dashboard_url;
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                alert('Error: ' + error.message);
            });
    });
});