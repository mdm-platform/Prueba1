const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos como id ' + connection.threadId);
});

app.get('/ejercicios', (req, res) => {
    const query = 'SELECT * FROM ejercicios';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ ejercicios: results });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
