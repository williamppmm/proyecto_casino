// Función para agregar una fila a la tabla de máquinas
function agregarFila() {
    const tabla = document.getElementById('tablaMaquinas').getElementsByTagName('tbody')[0];
    const fila = tabla.insertRow();
    
    const celdaMaquina = fila.insertCell();
    celdaMaquina.innerHTML = `
      <select name="maquina[]" required>
        <option value="">Seleccione una máquina</option>
        <!-- Opciones de máquinas generadas dinámicamente desde la base de datos -->
      </select>
    `;
    
    const celdaCoinIn = fila.insertCell();
    celdaCoinIn.innerHTML = '<input type="number" name="coinIn[]" required>';
    
    const celdaCoinOut = fila.insertCell();
    celdaCoinOut.innerHTML = '<input type="number" name="coinOut[]" required>';
    
    const celdaJackpot = fila.insertCell();
    celdaJackpot.innerHTML = '<input type="number" name="jackpot[]" required>';
  }
  
  // Evento click para el botón "Agregar Fila"
  document.getElementById('agregarFila').addEventListener('click', agregarFila);
  
  // Evento submit para el formulario de registro
  document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const fecha = document.getElementById('fecha').value;
    const maquinas = document.getElementsByName('maquina[]');
    const coinIn = document.getElementsByName('coinIn[]');
    const coinOut = document.getElementsByName('coinOut[]');
    const jackpot = document.getElementsByName('jackpot[]');
    
    // Crear un objeto con los datos a enviar al servidor
    const datos = {
      fecha: fecha,
      maquinas: [],
    };
    
    for (let i = 0; i < maquinas.length; i++) {
      datos.maquinas.push({
        maquina: maquinas[i].value,
        coinIn: coinIn[i].value,
        coinOut: coinOut[i].value,
        jackpot: jackpot[i].value,
      });
    }
    
    // Enviar los datos al servidor mediante una petición HTTP (por ejemplo, usando fetch)
    fetch('guardar_registro.php', {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Mostrar el resumen de ventas en la tabla correspondiente
      const tablaResumen = document.getElementById('tablaResumen').getElementsByTagName('tbody')[0];
      tablaResumen.innerHTML = '';
      
      data.resumen.forEach(registro => {
        const fila = tablaResumen.insertRow();
        fila.innerHTML = `
          <td>${registro.fecha}</td>
          <td>${registro.totalCoinIn}</td>
          <td>${registro.totalCoinOut}</td>
          <td>${registro.totalJackpot}</td>
          <td>${registro.totalYield}</td>
          <td>${registro.gananciaPerdida}</td>
        `;
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });