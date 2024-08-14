document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los selects de Materialize
    var selectElements = document.querySelectorAll('select');
    M.FormSelect.init(selectElements);

    // Cargar los departamentos desde el servidor
    fetch('get_departments.php?action=get_departments')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let departmentSelect = document.getElementById('departmentSelect');
                data.data.forEach(dept => {
                    let option = document.createElement('option');
                    option.value = dept.id_seccion;
                    option.textContent = `${dept.departamento} (${dept.estado == 1 ? 'Habilitado' : 'Deshabilitado'})`;
                    departmentSelect.appendChild(option);
                });
                M.FormSelect.init(departmentSelect);
            } else {
                console.error('Error fetching departments:', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // Manejar el envío del formulario de administración de departamentos
    document.getElementById('department-operator-form').addEventListener('submit', function(event) {
        event.preventDefault();

        let departmentId = document.getElementById('departmentSelect').value;
        let action = document.getElementById('actionSelect').value;

        fetch('department_operator.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: departmentId, action: action })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                M.toast({html: 'Acción realizada con éxito', classes: 'red'});
                // Recargar los departamentos para reflejar los cambios
                fetch('get_departments.php?action=get_departments')
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            let departmentSelect = document.getElementById('departmentSelect');
                            departmentSelect.innerHTML = '<option value="" disabled selected>*Selecciona un departamento</option>';
                            data.data.forEach(dept => {
                                let option = document.createElement('option');
                                option.value = dept.id_seccion;
                                option.textContent = `${dept.departamento} (${dept.estado == 1 ? 'Habilitado' : 'Deshabilitado'})`;
                                departmentSelect.appendChild(option);
                            });
                            M.FormSelect.init(departmentSelect);
                        } else {
                            console.error('Error fetching departments:', data.message);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                M.toast({html: 'Error: ' + data.message, classes: 'red'});
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Cargar los códigos de autorización existentes desde la base de datos
    fetch('department_operator.php?action=get_authorization_codes')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                var codeSelect = document.getElementById('authorization-code-select');
                codeSelect.innerHTML = '<option value="" disabled selected>Seleccione un código</option>';
                data.data.forEach(code => {
                    var option = document.createElement('option');
                    option.value = code.codigo_autorizacion;
                    option.textContent = code.codigo_autorizacion + ' - ' + code.descripcion;
                    codeSelect.appendChild(option);
                });
                M.FormSelect.init(codeSelect);
            } else {
                console.error('Error fetching authorization codes:', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // Generar un código aleatorio de 10 caracteres
    function generateRandomCode() {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var result = '';
        for (var i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    // Manejar el envío del formulario de generación de código de autorización
    document.getElementById('authorization-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var authorizationCode = generateRandomCode();
        var authorizationDescription = document.getElementById('authorization-description').value;

        fetch('department_operator.php?action=generate_authorization_code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ authorizationCode: authorizationCode, authorizationDescription: authorizationDescription })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            document.getElementById('authorization-form').reset();
            // Actualizar el select de códigos de autorización
            fetch('department_operator.php?action=get_authorization_codes')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        var codeSelect = document.getElementById('authorization-code-select');
                        codeSelect.innerHTML = '<option value="" disabled selected>Seleccione un código</option>';
                        data.data.forEach(code => {
                            var option = document.createElement('option');
                            option.value = code.codigo_autorizacion;
                            option.textContent = code.codigo_autorizacion + ' - ' + code.descripcion;
                            codeSelect.appendChild(option);
                        });
                        M.FormSelect.init(codeSelect);
                    } else {
                        console.error('Error fetching authorization codes:', data.message);
                    }
                });
            // Mostrar el botón de envío de correo electrónico
            var emailButton = document.getElementById('email-button');
            emailButton.style.display = 'inline-block';

            var emailSubject = encodeURIComponent("Código de Registro");
            var emailBody = encodeURIComponent(
                "Buenas tardes,\n\n" +
                "Desde Casino la Fortuna te damos la bienvenida. Nos encanta saber que pronto pertenecerás a nuestro equipo de trabajo, " +
                "por eso te hemos enviado el código de autorización para que te registres a través de http://localhost/proyecto_casino/admin_register.html.\n\n" +
                "Tu código de autorización es: " + authorizationCode + "\n\n" +
                "No olvides verificar tu información personal antes de registrarte. Es muy importante para que pueda ser asignada tu mesa de trabajo.\n\n" +
                "Cordialmente,\n\n" +
                "Equipo administrativo\n" +
                "Casino la Fortuna"
            );

            emailButton.href = 'mailto:?subject=' + emailSubject + '&body=' + emailBody;

            // Agregar un evento para recargar la página después de que se haga clic en el botón de enviar correo
            emailButton.addEventListener('click', function() {
                setTimeout(function() {
                    location.reload();
                }, 1000); // Esperar 1 segundo antes de recargar la página
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Manejar el envío del formulario de administración de código de autorización
    document.getElementById('activate-code-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var authorizationCode = document.getElementById('authorization-code-select').value;
        var actionType = document.getElementById('authorization-action').value;

        fetch('department_operator.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ authorizationCode: authorizationCode, action: actionType })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                M.toast({html: 'Acción realizada con éxito', classes: 'red'});
            } else {
                M.toast({html: 'Error: ' + data.message, classes: 'red'});
            }
            // Actualizar el select de códigos de autorización
            fetch('department_operator.php?action=get_authorization_codes')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        var codeSelect = document.getElementById('authorization-code-select');
                        codeSelect.innerHTML = '<option value="" disabled selected>Seleccione un código</option>';
                        data.data.forEach(code => {
                            var option = document.createElement('option');
                            option.value = code.codigo_autorizacion;
                            option.textContent = code.codigo_autorizacion + ' - ' + code.descripcion;
                            codeSelect.appendChild(option);
                        });
                        M.FormSelect.init(codeSelect);
                    } else {
                        console.error('Error fetching authorization codes:', data.message);
                    }
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});