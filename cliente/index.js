console.log("¡Hola desde js!");  // Verifica conexión

document.addEventListener('DOMContentLoaded', () => {  // Ejecuta el código cuando carga
    const ejerciciosList = document.getElementById('ejercicios-list');  // Selecciona el HTML con el id y lo almacena en la variable

    // Función para obtener y mostrar los ejercicios
    async function fetchEjercicios() {
        const response = await fetch('http://localhost:3001/ejercicios');  // Solicita un GET a la ruta ejercicios en el servidor
        const data = await response.json();  // Convierte la respuesta en JSON


        // Iterar sobre los datos y crear elementos de lista
        data.ejercicios.forEach(ejercicio => {
            const li = document.createElement('li');  // Crea un elemento de lista
          li.textContent = ejercicio.name;
           ejerciciosList.appendChild(li);  // Agrega el elemento de lista a la lista
        });
    }

    // Inicializar la lista de ejercicios
    fetchEjercicios();
 
});