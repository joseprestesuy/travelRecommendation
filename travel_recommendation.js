// Variable para almacenar las recomendaciones
let recommendations = [];

// Tarea 6: Obtener los datos del archivo JSON usando fetch
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        recommendations = data;
        console.log('Recomendaciones obtenidas:', recommendations);
    })
    .catch(error => console.error('Error al obtener los datos:', error));

    fetch('travel_recommendation_api.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Step 2: Log the data to the console
      displayRecommendations(data); // Step 3: Pass the data to a function to display
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  

// Tarea 6: Función para mostrar las recomendaciones filtradas
function displayRecommendations(results) {
    const container = document.getElementById('results-container');
    container.innerHTML = ''; // Limpiar resultados anteriores
    
    if (results.length > 0) {
        results.forEach(rec => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            card.innerHTML = `
                <h2>${rec.name}</h2>
                <img src="${rec.imageUrl}" alt="${rec.name}">
                <p>${rec.description}</p>
            `;
            container.appendChild(card);
        });
    } else {
        container.innerHTML = '<p>No se encontraron recomendaciones.</p>';
    }
}

// Tarea 7: Manejador para el botón de búsqueda
document.getElementById('search-button').addEventListener('click', function() {
    const searchQuery = document.getElementById('search').value.toLowerCase();

    // Filtrar las recomendaciones basadas en la palabra clave y sus variaciones
    const filteredResults = recommendations.filter(rec => 
        rec.category.toLowerCase().includes(searchQuery)
    );

    // Mostrar los resultados filtrados
    displayRecommendations(filteredResults);
});

// Tarea 8: Mostrar dos recomendaciones por cada categoría (beach, temple, country)
function displayRecommendationsByKeyword(keyword) {
    const filteredResults = recommendations.filter(rec => 
        rec.category.toLowerCase() === keyword.toLowerCase()
    );

    // Limitar a dos resultados por categoría
    displayRecommendations(filteredResults.slice(0, 2));
}

// Tarea 9: Manejador para el botón de reset
document.getElementById('reset-button').addEventListener('click', function() {
    document.getElementById('results-container').innerHTML = ''; // Limpiar resultados
    document.getElementById('search').value = ''; // Limpiar el campo de búsqueda
});

// Tarea 10: Mostrar la hora actual en la zona horaria del lugar recomendado
function displayTimeForRecommendation(timeZone) {
    const options = { timeZone: timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const currentTime = new Date().toLocaleTimeString('en-US', options);
    console.log(`Hora actual en la zona ${timeZone}: ${currentTime}`);

    // Mostrar la hora en el HTML
    const timeContainer = document.getElementById('time-container');
    timeContainer.innerHTML = `<p>Hora actual en ${timeZone}: ${currentTime}</p>`;
}

// Ejemplo: Mostrar la hora para una recomendación seleccionada
document.getElementById('search-button').addEventListener('click', function() {
    const searchQuery = document.getElementById('search').value.toLowerCase();

    const filteredResults = recommendations.filter(rec => 
        rec.category.toLowerCase().includes(searchQuery)
    );

    displayRecommendations(filteredResults);

    // Tarea 10: Si hay resultados, mostrar la hora del primer resultado (puedes ajustar esto según sea necesario)
    if (filteredResults.length > 0) {
        const timeZone = getTimeZoneByCountry(filteredResults[0].name); // Función para obtener la zona horaria basada en el país
        displayTimeForRecommendation(timeZone);
    }
});

// Función auxiliar para obtener la zona horaria según el país (debes implementar esto según tus necesidades)
function getTimeZoneByCountry(country) {
    const timeZones = {
        "Brazil": "America/Sao_Paulo",
        "Japan": "Asia/Tokyo",
        // Agrega más países y sus zonas horarias según sea necesario
    };
    return timeZones[country] || "UTC"; // Valor predeterminado UTC si no se encuentra el país
}
