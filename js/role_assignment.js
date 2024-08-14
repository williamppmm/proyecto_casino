document.addEventListener('DOMContentLoaded', function() {
    // Inicialización de elementos de selección en el formulario
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);

    // Inicialización del datepicker
    var datepickers = document.querySelectorAll('.datepicker');
    M.Datepicker.init(datepickers, {
        format: 'yyyy-mm-dd',
        yearRange: [1950, 2024],
        defaultDate: new Date(),
        selectMonths: true,
        selectYears: true
    });

    // Carga inicial de datos de usuarios y departamentos
    fetchUsers();
    fetchDepartments();

    // Gestión del evento de envío de formulario
    document.getElementById('role-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = {
            user: document.getElementById('user-select').value,
            position: document.getElementById('position').value,
            entryDate: document.getElementById('entryDate').value,
            department: document.getElementById('department-select').value
        };
        // Invocar función para asignar rol y enviar datos al servidor
        assignRole(formData);
    });
});

// Función para cargar usuarios desde el servidor
function fetchUsers() {
    fetch('get_users.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const userSelect = document.getElementById('user-select');
                userSelect.innerHTML = '<option value="" disabled selected>Elija un usuario</option>';
                data.data.forEach(user => {
                    let option = new Option(user.primer_nombre + " " + user.primer_apellido + " - " + user.correo_electronico, user.id_operador);
                    userSelect.appendChild(option);
                });
                M.FormSelect.init(userSelect);
            } else {
                console.error('Error al cargar usuarios:', data.message);
            }
        })
        .catch(error => console.error('Error al cargar usuarios:', error));
}

// Función para cargar departamentos desde el servidor
function fetchDepartments() {
    fetch('get_departments.php?action=get_departments')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const departmentSelect = document.getElementById('department-select');
                departmentSelect.innerHTML = '<option value="" disabled selected>Seleccione un departamento</option>';
                data.data.forEach(dept => {
                    let option = new Option(dept.departamento, dept.departamento);
                    departmentSelect.appendChild(option);
                });
                M.FormSelect.init(departmentSelect);
            } else {
                console.error('Error al cargar departamentos:', data.message);
            }
        })
        .catch(error => console.error('Error al cargar departamentos:', error));
}

// Función para asignar roles y manejar la lógica post-asignación
function assignRole(formData) {
    fetch('role_assignment.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            var userEmail = document.getElementById('user-select').selectedOptions[0].textContent.split(' - ')[1];
            var emailButton = document.getElementById('email-button');
            var emailSubject = encodeURIComponent("Información de Asignación de Rol");
            var emailBody = encodeURIComponent(
                "Para Casino la Fortuna es un orgullo contar con tus capacidades y compromiso para ser parte de nuestro equipo, " +
                "por eso te hemos asignado el cargo de " + formData.position + ", en el departamento de " + formData.department + ".\n\n" +
                "Tu contraseña de ingreso al sistema es: " + data.password + "\n" +
                "Podrás ingresar a partir del " + formData.entryDate + ".\n\n" +
                "Cordialmente,\n\n" +
                "Equipo administrativo\n" +
                "Casino la Fortuna"
            );
            emailButton.href = 'mailto:' + userEmail + '?subject=' + emailSubject + '&body=' + emailBody;
            emailButton.style.display = 'inline-block';

            // Agregar un evento para recargar la página después de que se haga clic en el botón de enviar correo
            emailButton.addEventListener('click', function() {
                setTimeout(function() {
                    location.reload();
                }, 1000); // Esperar 1 segundo antes de recargar la página
            });

            M.toast({html: 'Rol asignado y correo preparado para enviar.', classes: 'green'});
        } else {
            console.error('Error en la asignación de roles:', data.message);
            M.toast({html: data.message, classes: 'red'});
        }
    })
    .catch(error => console.error('Error al asignar rol:', error));
}