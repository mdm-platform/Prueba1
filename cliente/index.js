console.log("¡Hola desde js!");  //verfica conexion 

document.addEventListener('DOMContentLoaded', () => {     //ejecuta el cidigo cuando carga 
    const ejerciciosList = document.getElementById('ejercicios-list');  //selecciona el html con el id y lo almacena en la variable
    const ejercicioForm = document.getElementById('ejercicio-form'); //selecciona el formulario con el id
    const ejercicioNameInput = document.getElementById('ejercicio-name');   //selecciona el campo de entrada con el id

    // Función para obtener y mostrar los ejercicios
    async function fetchEjercicios() {
        const response = await fetch('/ejercicios');  //solicita un get a la ruta ejercicios en el servidor
        const data = await response.json();  //convierte la respuesta en json

        // Limpiar la lista antes de agregar nuevos elementos
        ejerciciosList.innerHTML = '';

        // Iterar sobre los datos y crear elementos de lista
        data.ejercicios.forEach(ejercicio => {
            const li = document.createElement('li'); //crea un elemento de lista
            li.textContent = ejercicio.name;  //agrega el nombre del ejercicio
            ejerciciosList.appendChild(li);  //agrega el elemento de lista a la lista
        });
    }

    // Función para agregar un nuevo ejercicio
    ejercicioForm.addEventListener('submit', async (e) => {    //cuando se envia el formulario
        e.preventDefault();     //previene el comportamiento por defecto
        const newName = ejercicioNameInput.value;  //obtiene el valor del campo de entrada
        const response = await fetch('/ejercicios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName })
        });
        if (response.ok) {
            fetchEjercicios();
            ejercicioNameInput.value = '';
        }
    });

    // Inicializar la lista de ejercicios
    fetchEjercicios();
});

    