// Task 6: Recommendation results

// Paso 1: Crear una función asíncrona para obtener los datos del archivo JSON
async function fetchRecommendations() {
    try {
        // Paso 2: Usar el método fetch para obtener los datos del archivo JSON
        const response = await fetch('travel_recommendation_api.json');

        // Paso 3: Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }

        // Paso 4: Convertir la respuesta a formato JSON
        const data = await response.json();

        // Paso 5: Usar console.log para verificar que los datos se han obtenido correctamente
        console.log(data);

        // Llamar a la función displayRecommendations basada en la palabra clave ingresada
        document.getElementById('search-button').addEventListener('click', function () {
            const searchInput = document.getElementById('search').value.toLowerCase();
            const beachKeywords = ['beach', 'beaches'];
            const templeKeywords = ['temple', 'temples'];
            const countryKeywords = ['country', 'countries'];

            if (beachKeywords.includes(searchInput)) {
                displayRecommendations('beaches', data);
            } else if (templeKeywords.includes(searchInput)) {
                displayRecommendations('temples', data);
            } else if (countryKeywords.includes(searchInput)) {
                displayRecommendations('countrys', data);
            } else {
                console.log('No se encontró ninguna coincidencia para la palabra clave ingresada.');
            }
        });

    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Task 8: Recommendations

function displayRecommendations(keyword, data) {
    console.log('Keyword:', keyword);
    console.log('Data:', data);
    
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    if (keyword === 'beach') {
        console.log('Displaying beaches');
        data.beaches.forEach(beach => {
            createRecommendationCard(beach.name, beach.imageUrl, beach.description, resultsContainer);
        });
    } else if (keyword === 'temple') {
        console.log('Displaying temples');
        data.temples.forEach(temple => {
            createRecommendationCard(temple.name, temple.imageUrl, temple.description, resultsContainer);
        });
    } else if (keyword === 'country') {
        console.log('Displaying countries');
        data.countries.forEach(country => {
            country.cities.forEach(city => {
                createRecommendationCard(city.name, city.imageUrl, city.description, resultsContainer);
            });
        });
    }

    console.log('Results container:', resultsContainer.innerHTML);
}

// Helper function: Create recommendation card
function createRecommendationCard(name, imageUrl, description, container) {
    const recommendationCard = document.createElement('div');
    recommendationCard.className = 'recommendation-card';

    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = name;

    const title = document.createElement('h3');
    title.textContent = name;

    const desc = document.createElement('p');
    desc.textContent = description;

    recommendationCard.appendChild(image);
    recommendationCard.appendChild(title);
    recommendationCard.appendChild(desc);

    container.appendChild(recommendationCard);
}

// Task 7: Keyword searches

document.getElementById('search-button').addEventListener('click', function () {
    const searchInput = document.getElementById('search').value;
    const searchKeyword = searchInput.toLowerCase();

    const beachKeywords = ['beach', 'beaches'];
    const templeKeywords = ['temple', 'temples'];
    const countryKeywords = ['country', 'countries'];

    if (beachKeywords.includes(searchKeyword)) {
        console.log('Se ingresó una palabra clave relacionada con playas.');
    } else if (templeKeywords.includes(searchKeyword)) {
        console.log('Se ingresó una palabra clave relacionada con templos.');
    } else if (countryKeywords.includes(searchKeyword)) {
        console.log('Se ingresó una palabra clave relacionada con países.');
    } else {
        console.log('No se encontró ninguna coincidencia para la palabra clave ingresada.');
    }
});

// Task 9: Clear button

document.getElementById('reset-button').addEventListener('click', function () {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
    document.getElementById('search').value = '';

    console.log('Se han limpiado los resultados y el campo de búsqueda.');
});

// Iniciar el proceso al cargar la página
fetchRecommendations();