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

        // Ajusta la ruta del archivo PHP según la estructura de tu proyecto
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

    // Manejar el registro de entradas
    document.querySelector('#inputs form').addEventListener('submit', function (event) {
        event.preventDefault();
        const product = document.getElementById('product').value;
        const quantity = document.getElementById('quantity').value;
        const date = document.getElementById('date').value;

        // Agregar la lógica para enviar los datos al servidor
        // fetch('tu_endpoint_para_registrar_entradas', {
        //     method: 'POST',
        //     body: JSON.stringify({ product, quantity, date }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(response => {
        //     if (response.ok) {
        //         // Lógica de éxito
        //     } else {
        //         // Lógica de error
        //     }
        // }).catch(error => {
        //     console.error('Error en la solicitud:', error);
        // });

        // Resetear el formulario después de enviar los datos
        this.reset();
        M.updateTextFields();  // Actualizar los campos del formulario
        M.FormSelect.init(elems);  // Actualizar los select
    });

    // Manejar el registro de salidas
    document.querySelector('#outputs form').addEventListener('submit', function (event) {
        event.preventDefault();
        const product = document.getElementById('product').value;
        const quantity = document.getElementById('quantity').value;
        const date = document.getElementById('date').value;

        // Agregar la lógica para enviar los datos al servidor
        // fetch('tu_endpoint_para_registrar_salidas', {
        //     method: 'POST',
        //     body: JSON.stringify({ product, quantity, date }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(response => {
        //     if (response.ok) {
        //         // Lógica de éxito
        //     } else {
        //         // Lógica de error
        //     }
        // }).catch(error => {
        //     console.error('Error en la solicitud:', error);
        // });

        // Resetear el formulario después de enviar los datos
        this.reset();
        M.updateTextFields();  // Actualizar los campos del formulario
        M.FormSelect.init(elems);  // Actualizar los select
    });
});