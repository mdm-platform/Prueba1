require('dotenv').config();
console.log(process.env);

const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

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

app.get('/ejercicios', (req, res) => {
    const query = 'SELECT * FROM ejercicios_lista';
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
    const query = 'DELETE FROM ejercicios_lista WHERE id = ?';
    connection.query(query, [ejercicioId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ message: 'Ejercicio eliminado correctamente' });
    });
});


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
