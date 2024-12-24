console.log("¡Hola desde JavaScript!");

document.addEventListener('DOMContentLoaded', () => {
    const ejerciciosList = document.getElementById('ejercicios-list');
    const ejercicioForm = document.getElementById('ejercicio-form');
    const ejercicioNameInput = document.getElementById('ejercicio-name');

    // Función para obtener y mostrar los ejercicios
    const fetchEjercicios = async () => {
        const response = await fetch('/ejercicios');
        const data = await response.json();
        ejerciciosList.innerHTML = '';
        data.ejercicios.forEach(ejercicio => {
            const li = document.createElement('li');
            li.textContent = ejercicio.name;
            ejerciciosList.appendChild(li);
        });
    };

    // Función para agregar un nuevo ejercicio
    ejercicioForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newName = ejercicioNameInput.value;
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