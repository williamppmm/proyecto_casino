const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'casinolafortuna'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Ruta para obtener las máquinas tragamonedas
app.get('/api/slot-machines', (req, res) => {
    const sql = 'SELECT * FROM maquinas_tragamonedas';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Ruta para agregar una nueva máquina tragamonedas
app.post('/api/slot-machines', (req, res) => {
    const { serie, descripcion, denominacion, operador, seccion } = req.body;

    const newMachine = {
        serie,
        descripcion,
        denominacion,
        operador_asignado: operador, // Ajuste aquí
        seccion: seccion // Ajuste aquí
    };

    const sql = 'INSERT INTO maquinas_tragamonedas SET ?';
    db.query(sql, newMachine, (err, result) => {
        if (err) {
            console.error('Error inserting new machine:', err);
            res.status(500).send('Error registering the machine.');
        } else {
            res.send('Máquina agregada...');
        }
    });
});

// Ruta para obtener todos los operadores
app.get('/api/operadores', (req, res) => {
    const sql = 'SELECT * FROM operadores';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Ruta para obtener todas las secciones
app.get('/api/secciones', (req, res) => {
    const sql = 'SELECT * FROM secciones';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));