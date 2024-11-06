// Importa el módulo Express
const express = require('express');

// Crea una instancia de una aplicación Express
const app = express();

// Define el puerto en el que el servidor escuchará
const port = 3000;




// Define una ruta que responde a las solicitudes GET en /ejercicios
app.get('/ejercicios', (req, res) => {
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

    // Envía la lista de ejercicios como respuesta en formato JSON
    res.json(ejercicios);
});
