require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');



const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'cliente')));
//para conectar con cliente 
const port = 3001;

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos como id ' + connection.threadId);
});


// para leer
app.get('/ejercicios', (req, res) => {
    const query = 'SELECT * FROM ejercicios_lista';        //selecciona
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ ejercicios: results });
    });
});


// para leer un registro específico

// preguntar si se tiene que poner un nuevo registo en la carpeta de crud en postman 
app.get('/ejercicios/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM ejercicios_lista WHERE id = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ ejercicio: results[0] });
    });
});


// para eliminar
app.delete('/ejercicios/:id', (req, res) => {
    const ejerciciosid = req.params.id;
    const query = 'DELETE FROM ejercicios_lista WHERE id = ?';           //cual ejercicio eliminar
    connection.query(query, [ejerciciosid], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });       //por si hay algun error
        }
        res.json({ message: 'Ejercicio eliminado correctamente' });
    });
});

// para insertar un record
app.post('/ejercicios', async (req, res) => {
    const { name } = req.body;

    try {
        const insertQuery = 'INSERT INTO ejercicios_lista (name) VALUES (?)';
        await handleDatabaseOperation(insertQuery, [name]);
        res.json({ message: 'Ejercicio insertado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// para actualizar un record que ya existe
app.put('/ejercicios', async (req, res) => {
    const { name, newName } = req.body;

    try {
        const updateQuery = 'UPDATE ejercicios_lista SET name = ? WHERE name = ?';
        await handleDatabaseOperation(updateQuery, [newName, name]);
        res.json({ message: 'Ejercicio actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// para actualizar un registro específico
app.put('/ejercicios/:id', async (req, res) => {
    const { id } = req.params;
    const { newName } = req.body;

    try {
        const updateQuery = 'UPDATE ejercicios_lista SET name = ? WHERE id = ?';
        await handleDatabaseOperation(updateQuery, [newName, id]);
        res.json({ message: 'Ejercicio actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// extraemos la operaciones en la base de datos
const handleDatabaseOperation = async (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
