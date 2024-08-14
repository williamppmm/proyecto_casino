document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('profile-form');
    form.onsubmit = function(event) {
        event.preventDefault();
        var formData = new FormData(form);
        fetch('update_profile.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                window.location.href = 'superadmin_dashboard.html';
            }
        })
        .catch(error => console.error('Error:', error));
    };
});