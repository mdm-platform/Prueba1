require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

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

// para eliminar
app.delete('/ejercicios/:id', (req, res) => {
    const ejercicioId = req.params.id;
    const query = 'DELETE FROM ejercicios_lista WHERE id = ?';           //cual ejercicio eliminar
    connection.query(query, [ejercicioId], (error, results) => {
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
