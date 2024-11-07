// Importa el módulo Express
const express = require('express');
console.log('Express module imported');

// Crea una instancia de una aplicación Express
const app = express();
console.log('Express app created');

// Define el puerto en el que el servidor escuchará
const port = 3000;

// Define una ruta que responde a las solicitudes GET en /ejercicios
app.get('/ejercicios', (req, res) => {
    console.log('GET / ejercicios called');
    // Define una lista de ejercicios de ejemplo con el formato especificado
    const ejercicios = {
        "ejercicios": [
            {
                "usuario": "Manuel",
                "ejercicio": "Squat",
                "peso": {
                    "kilogramos": 45.36,
                    "libras": 100.00
                },
                "cantidad": 20,
                "fechaHora": "2024-11-01 03:45:00"
            },
            {
                "usuario": "Goreti",
                "ejercicio": "Squat",
                "peso": {
                    "kilogramos": 45.36,
                    "libras": 100.00
                },
                "cantidad": 25,
                "fechaHora": "2024-11-02 03:45:00"
            }
        ]
    };

    res.json(ejercicios);
});
// Configura el servidor para que escuche en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});



