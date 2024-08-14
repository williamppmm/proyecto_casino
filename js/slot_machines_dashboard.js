document.addEventListener('DOMContentLoaded', function () {
    // Inicializar los elementos select
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);

    // Inicializar el datepicker
    var datepickers = document.querySelectorAll('.datepicker');
    M.Datepicker.init(datepickers, {
        format: 'yyyy-mm-dd',
        yearRange: [1950, 2024],
        defaultDate: new Date(),
        selectMonths: true,
        selectYears: true
    });

    // Verificar si los elementos del DOM existen
    const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');

    if (userNameElement && userEmailElement) {
        console.log('Elementos del DOM encontrados');
        
        fetch('get_user_info.php')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error en la respuesta del servidor');
                }
            })
            .then(data => {
                console.log('Datos recibidos:', data);
                if (data.success) {
                    // Actualizar el contenido del dashboard con la información del usuario
                    userNameElement.textContent = data.full_name;
                    userEmailElement.textContent = data.email;
                } else {
                    console.error('Error al obtener la información del usuario:', data.message);
                    // Mostrar un mensaje de error en el dashboard
                    userNameElement.textContent = 'Error';
                    userEmailElement.textContent = 'Error al cargar la información del usuario';
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                // Mostrar un mensaje de error en el dashboard
                userNameElement.textContent = 'Error';
                userEmailElement.textContent = 'Error al cargar la información del usuario';
            });
    } else {
        console.error('Elementos del DOM no encontrados');
    }
});