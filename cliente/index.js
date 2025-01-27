console.log("¡Hola desde js!");  // Verifica conexión

document.addEventListener('DOMContentLoaded', () => {  // Ejecuta el código cuando carga
    const ejerciciosList = document.getElementById('ejercicios_lista');  // Selecciona el HTML con el id y lo almacena en la variable
     
    const ejercicioForm = document.getElementById('ejercicio-form');  // Selecciona el formulario
    const ejercicioNameInput = document.getElementById('ejercicio-name');  // Selecciona el campo de entrada del nombre del ejercicio


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



// Función para agregar un nuevo ejercicio
async function addEjercicio(e) {
    e.preventDefault();  // Previene el comportamiento por defecto del formulario
    const name = ejercicioNameInput.value;  // Obtiene el valor del campo de entrada

    // Validación de datos
    if (!name) {  // Verifica que el campo no esté vacío
        alert('Por favor, completa el campo de nombre del ejercicio.');
        return;
    }

    const response = await fetch('http://localhost:3001/ejercicios', {  // Solicita un POST a la ruta ejercicios en el servidor
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })  // Envía los datos como JSON
    });

    if (response.ok) {  // Verifica que la respuesta sea exitosa
        const newEjercicio = await response.json();  // Convierte la respuesta en JSON
        const li = document.createElement('li');  // Crea un elemento de lista
        li.textContent = newEjercicio.name;  // Establece el contenido del elemento de lista
        ejerciciosList.appendChild(li);  // Agrega el elemento de lista a la lista
        ejercicioNameInput.value = '';  // Limpia el campo de entrada
    } else {
        alert('Hubo un problema al agregar el ejercicio. Por favor, intenta nuevamente.');
    }
}



    // Inicializar la lista de ejercicios
    fetchEjercicios();
 
    // Agregar un evento de envío al formulario
    ejercicioForm.addEventListener('submit', addEjercicio);

});