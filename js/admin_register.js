document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    var datepickers = document.querySelectorAll('.datepicker');
    M.Datepicker.init(datepickers, {
        format: 'yyyy-mm-dd',
        yearRange: [1950, 2024],
        defaultDate: new Date(),
        selectMonths: true,
        selectYears: true
    });

    // Validación del formulario
    document.getElementById('admin-register-form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Enviar los datos del formulario al servidor
        const formData = new FormData(this);
        fetch('admin_register.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    this.reset();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});