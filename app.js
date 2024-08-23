// app.js

const express = require('express');
const mysql = require('mysql2');

// Crear una instancia de Express
const app = express();

// Configurar una ruta simple
app.get('/', (req, res) => {
  res.send('Bienvenidos al servidor del Casino la Fortuna');
});

// Configurar el servidor para escuchar en un puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});