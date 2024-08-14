document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes de Materialize
    M.Modal.init(document.querySelectorAll('.modal'));
    M.Carousel.init(document.querySelectorAll('.carousel'), {
      fullWidth: true,
      indicators: true
    });
    M.Tabs.init(document.querySelectorAll('.tabs'));
  
    // Obtener altura de la barra de navegación
    const navHeight = document.querySelector('.nav-extended').offsetHeight;

    // Manejar clics en enlaces del menú con desplazamiento suave
    const menuLinks = document.querySelectorAll('.tabs .tab a');
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: 'smooth'
                });

                // Actualizar la clase 'active' en los enlaces del menú
                menuLinks.forEach(link => link.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
  
    // Manejar el formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
  
        if (!nombre || !email || !mensaje) {
          showAlert('Por favor, completa todos los campos.', 'error');
          return;
        }
  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showAlert('Por favor, ingresa un correo electrónico válido.', 'error');
          return;
        }
  
        const subject = encodeURIComponent('Nuevo mensaje de contacto');
        const body = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\n\n${mensaje}`);
  
        window.location.href = `mailto:info@casinolafortuna.com?subject=${subject}&body=${body}`;
  
        showAlert('¡Gracias por tu mensaje! Te contactaremos pronto.', 'success');
        contactForm.reset();
      });
    }
  });
  
  // Función para mostrar alertas
  function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type}`;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
  
    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  }