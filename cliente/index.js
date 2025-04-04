console.log("¡Hola desde js!");  // Verifica conexión

document.addEventListener('DOMContentLoaded', () => {  // Ejecuta el código cuando carga
    const ejerciciosList = document.getElementById('ejercicios-list');  // Selecciona el HTML con el id y lo almacena en la variable  
    const ejercicioForm = document.getElementById('ejercicio-form');  // Selecciona el formulario
    const ejercicioNameInput = document.getElementById('ejercicio-name');  // Selecciona el campo de entrada del nombre del ejercicio


    // Función para obtener y mostrar los ejercicios
    async function fetchEjercicios() {
        const response = await fetch('http://localhost:3003/ejercicios');  // Solicita un GET a la ruta ejercicios en el servidor
        const data = await response.json();  // Convierte la respuesta en JSON


        // Iterar sobre los datos y crear elementos de lista
        data.ejercicios.forEach(ejercicio => {
            const li = document.createElement('li');  // Crea un elemento de lista
          li.textContent = ejercicio.name;
          li.setAttribute('data-id', ejercicio.id);  // Añade un atributo data-id al elemento de lista


 // Crear botón de eliminar
 const deleteButton = document.createElement('button');  // Crea un nuevo botón
 deleteButton.textContent = 'Eliminar';  // Establece el texto del botón a "Eliminar"
 deleteButton.classList.add('delete');  // Añade la clase 'delete' al botón para aplicar los estilos CSS
 deleteButton.addEventListener('click', () => deleteEjercicio(ejercicio.id));  // Añade un evento de clic

// Crear botón de editar
const editButton = document.createElement('button');  // Crea un nuevo botón
editButton.textContent = 'Editar';  // Establece el texto del botón a "Editar"
editButton.classList.add('edit');  // Añade la clase 'edit' al botón para aplicar los estilos CSS
editButton.addEventListener('click', () => editEjercicio(ejercicio.id, ejercicio.name));  // Añade un evento de clic

 // Agregar botón al elemento de lista
 li.appendChild(deleteButton);
 li.appendChild(editButton);  // Añade el botón de eliminar al elemento de lista
 
          ejerciciosList.appendChild(li);  // Agrega el elemento de lista a la lista
        });
    }

// Función para editar un ejercicio
function editEjercicio(id, currentName) {
    const newName = prompt('Edita el nombre del ejercicio:', currentName);  // Pregunta al usuario el nuevo nombre

    if (newName && newName !== currentName) {  // Verifica que el nuevo nombre no esté vacío y sea diferente al actual
        updateEjercicio(id, newName);  // Llama a la función para actualizar el ejercicio
    }
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

    const response = await fetch('http://localhost:3003/ejercicios', {  // Solicita un POST a la ruta ejercicios en el servidor
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    });

    if (response.ok) {
        ejercicioNameInput.value = '';  // Limpia el campo de entrada
        const newEjercicio = await response.json();  // Obtiene el nuevo ejercicio agregado
        addEjercicioToList(newEjercicio);  // Agrega el nuevo ejercicio a la lista sin recargar toda la lista
        fetchEjercicios();  // Actualiza la lista de ejercicios
    } else {
        alert('Hubo un problema al agregar el ejercicio. Por favor, intenta nuevamente.');
    }


}


  // Función para eliminar un ejercicio
  async function deleteEjercicio(id) {
  const isConfirmed = confirm('¿Estás seguro de que quieres eliminar este ejercicio?');  // Pregunta al usuario si está seguro

    if (!isConfirmed) {
        return;  // Si el usuario cancela, no hace nada
    }

    const response = await fetch(`http://localhost:3003/ejercicios/${id}`, {  // Solicita un DELETE a la ruta ejercicios en el servidor
        method: 'DELETE'
    });

    if (response.ok) {  // Verifica que la respuesta sea exitosa
        document.querySelector(`li[data-id='${id}']`).remove();  // Elimina el elemento de la lista del DOM
    } else {
        alert('Hubo un problema al eliminar el ejercicio. Por favor, intenta nuevamente.');
    }
}

// Función para actualizar un ejercicio
async function updateEjercicio(id, name) {
    const response = await fetch(`http://localhost:3003/ejercicios/${id}`, {  // Solicita un PUT a la ruta ejercicios en el servidor
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    });

    if (response.ok) {
        fetchEjercicios();  // Recarga la lista de ejercicios
    } else {
        alert('Hubo un problema al actualizar el ejercicio. Por favor, intenta nuevamente.');
    }
}



    // Inicializar la lista de ejercicios
    fetchEjercicios();
 
    // Agregar un evento de envío al formulario
    ejercicioForm.addEventListener('submit', addEjercicio);

});