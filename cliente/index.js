console.log("¡Hola desde js!");  // Verifica conexión

document.addEventListener('DOMContentLoaded', () => {  // Ejecuta el código cuando carga
    const ejerciciosList = document.getElementById('ejercicios-list');  // Selecciona el HTML con el id y lo almacena en la variable
     
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


 // Crear botón de editar
 const editButton = document.createElement('button');
 editButton.textContent = 'Editar';
 editButton.classList.add('edit');
 editButton.addEventListener('click', () => editEjercicio(ejercicio.id, ejercicio.name));

 // Agregar botón al elemento de lista
 li.appendChild(editButton);


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

 

    // Inicializar la lista de ejercicios
    fetchEjercicios();
 
    // Agregar un evento de envío al formulario
    ejercicioForm.addEventListener('submit', addEjercicio);

}
});