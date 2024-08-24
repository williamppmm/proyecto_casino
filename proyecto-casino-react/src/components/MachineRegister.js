import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MachineRegister = () => {
    const [serie, setSerie] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [denominacion, setDenominacion] = useState('');
    const [operador, setOperador] = useState('');
    const [seccion, setSeccion] = useState('');
    const [estado, setEstado] = useState('1');  // 1 para Operativa por defecto
    const [ultimoMantenimiento, setUltimoMantenimiento] = useState('');
    const [operadores, setOperadores] = useState([]);
    const [secciones, setSecciones] = useState([]);

    useEffect(() => {
        axios.get('/api/operadores')
            .then(response => setOperadores(response.data))
            .catch(error => console.error('Error fetching operadores:', error));

        axios.get('/api/secciones')
            .then(response => setSecciones(response.data))
            .catch(error => console.error('Error fetching secciones:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMachine = { serie, descripcion, denominacion, operador, seccion, estado, ultimoMantenimiento };
        
        axios.post('/api/slot-machines', newMachine)
            .then(response => {
                console.log(response.data);
                setSerie('');
                setDescripcion('');
                setDenominacion('');
                setOperador('');
                setSeccion('');
                setEstado('1');  // Reset to Operativa
                setUltimoMantenimiento('');
            })
            .catch(error => {
                console.error('There was an error registering the machine!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="serie">Serie:</label>
            <input type="text" id="serie" value={serie} onChange={(e) => setSerie(e.target.value)} required />
            
            <label htmlFor="descripcion">Descripción:</label>
            <input type="text" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
            
            <label htmlFor="denominacion">Denominación:</label>
            <input type="number" id="denominacion" value={denominacion} onChange={(e) => setDenominacion(e.target.value)} required />
            
            <label htmlFor="operador">Operador Asignado:</label>
            <select id="operador" value={operador} onChange={(e) => setOperador(e.target.value)} required>
                <option value="">Seleccione un operador</option>
                {operadores.map(op => (
                    <option key={op.id_operador} value={op.id_operador}>{op.primer_nombre} {op.primer_apellido}</option>
                ))}
            </select>
            
            <label htmlFor="seccion">Sección:</label>
            <select id="seccion" value={seccion} onChange={(e) => setSeccion(e.target.value)} required>
                <option value="">Seleccione una sección</option>
                {secciones.map(sec => (
                    <option key={sec.id_seccion} value={sec.id_seccion}>{sec.departamento}</option>
                ))}
            </select>

            <label htmlFor="estado">Estado:</label>
            <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} required>
                <option value="1">Operativa</option>
                <option value="0">Dañada</option>
            </select>

            <label htmlFor="ultimo_mantenimiento">Último Mantenimiento:</label>
            <input type="date" id="ultimo_mantenimiento" value={ultimoMantenimiento} onChange={(e) => setUltimoMantenimiento(e.target.value)} required />

            <button type="submit">Registrar Máquina</button>
        </form>
    );
};

export default MachineRegister;