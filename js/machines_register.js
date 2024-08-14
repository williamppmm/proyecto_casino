// Obtener referencias a los elementos del DOM
const registroMaquinaForm = document.getElementById('registroMaquinaForm');
const tablaMaquinas = document.getElementById('tablaMaquinas');

// Cargar las máquinas existentes al cargar la página
document.addEventListener('DOMContentLoaded', cargarMaquinas);

// Escuchar el evento de envío del formulario
registroMaquinaForm.addEventListener('submit', registrarMaquina);

// Función para cargar las máquinas existentes desde la base de datos
function cargarMaquinas() {
  fetch('php/machines_register.php')
    .then(response => response.json())
    .then(maquinas => {
      const tbody = tablaMaquinas.querySelector('tbody');
      tbody.innerHTML = '';

      maquinas.forEach(maquina => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${maquina.id_maquina}</td>
          <td>${maquina.serie}</td>
          <td>${maquina.descripcion}</td>
          <td>${maquina.denominacion}</td>
          <td>${maquina.operador_asignado}</td>
          <td>${maquina.seccion}</td>
          <td>${maquina.estado}</td>
          <td>${maquina.ultimo_mantenimiento}</td>
          <td>
            <button class="btn-accion" data-id="${maquina.id_maquina}" data-accion="editar">Editar</button>
            <button class="btn-accion" data-id="${maquina.id_maquina}" data-accion="eliminar">Eliminar</button>
          </td>
        `;
        tbody.appendChild(fila);
      });
    })
    .catch(error => {
      console.error('Error al cargar las máquinas:', error);
    });
}

// Función para registrar una nueva máquina
function registrarMaquina(evento) {
  evento.preventDefault();

  const serie = document.getElementById('serie').value;
  const descripcion = document.getElementById('descripcion').value;
  const denominacion = document.getElementById('denominacion').value;
  const operador = document.getElementById('operador').value;
  const seccion = document.getElementById('seccion').value;

  const datos = {
    serie: serie,
    descripcion: descripcion,
    denominacion: denominacion,
    operador: operador,
    seccion: seccion
  };

  fetch('registrar_maquina.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  })
    .then(response => response.json())
    .then(resultado => {
      if (resultado.success) {
        // La máquina se registró correctamente
        alert('Máquina registrada exitosamente');
        // Limpiar los campos del formulario
        registroMaquinaForm.reset();
        // Recargar la tabla de máquinas
        cargarMaquinas();
      } else {
        // Ocurrió un error al registrar la máquina
        alert('Error al registrar la máquina. Por favor, intenta nuevamente.');
      }
    })
    .catch(error => {
      console.error('Error al registrar la máquina:', error);
    });
}

// Función para manejar las acciones de edición y eliminación de máquinas
function manejarAccionMaquina(evento) {
  if (evento.target.classList.contains('btn-accion')) {
    const idMaquina = evento.target.dataset.id;
    const accion = evento.target.dataset.accion;

    if (accion === 'editar') {
      // Lógica para editar la máquina con el idMaquina
      console.log('Editar máquina con ID:', idMaquina);
    } else if (accion === 'eliminar') {
      // Lógica para eliminar la máquina con el idMaquina
      console.log('Eliminar máquina con ID:', idMaquina);
    }
  }
}

// Escuchar el evento de clic en la tabla de máquinas
tablaMaquinas.addEventListener('click', manejarAccionMaquina);