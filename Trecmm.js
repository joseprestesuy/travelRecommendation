// Manejador de eventos para el botón de búsqueda
document.getElementById('search-button').addEventListener('click', function() {
    // Obtener el valor del campo de búsqueda y convertirlo a minúsculas
    const query = document.getElementById('search').value.toLowerCase();
    // Llamar a la función para obtener y mostrar recomendaciones
    fetchRecommendations(query);
});

// Manejador de eventos para el botón de limpiar
document.getElementById('reset-button').addEventListener('click', function() {
    // Llamar a la función para limpiar los resultados
    clearResults();
});

// Función para obtener recomendaciones basadas en la palabra clave
async function fetchRecommendations(keyword) {
    try {
        // Hacer una solicitud para obtener el archivo JSON con las recomendaciones
        const response = await fetch('https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json');
        
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Convertir la respuesta en formato JSON
        const data = await response.json();
        
        // Filtrar las recomendaciones basadas en la palabra clave
        const recommendations = data[keyword] || [];
        
        // Llamar a la función para mostrar las recomendaciones
        displayRecommendations(recommendations);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error('Error fetching recommendations:', error);
    }
}

// Función para mostrar las recomendaciones en el contenedor de resultados
function displayRecommendations(recommendations) {
    // Obtener el contenedor de resultados
    const resultsContainer = document.getElementById('results-container');
    
    // Limpiar el contenido del contenedor
    resultsContainer.innerHTML = '';

    // Verificar si hay recomendaciones
    if (recommendations.length === 0) {
        resultsContainer.innerHTML = 'No recommendations found';
        return;
    }

    // Crear y agregar un elemento para cada recomendación
    recommendations.forEach(rec => {
        const recommendationElement = document.createElement('div');
        recommendationElement.classList.add('recommendation');

        recommendationElement.innerHTML = `
            <h3>${rec.name}</h3>
            <img src="${rec.image}" alt="${rec.name}" style="width: 200px; height: 150px;">
            <p>${rec.description}</p>
        `;

        resultsContainer.appendChild(recommendationElement);
    });
}

// Función para limpiar los resultados y el campo de búsqueda
function clearResults() {
    // Limpiar el campo de búsqueda
    document.getElementById('search').value = '';
    
    // Limpiar el contenedor de resultados
    document.getElementById('results-container').innerHTML = '';
}
