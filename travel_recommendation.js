const API_URL= "https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json"

//6 fetch basico
fetch(API_URL)
    .then(response => {
        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Convertir la respuesta en formato JSON
        return response.json();
    })
    .then(data => {
        // Hacer algo con los datos (por ejemplo, mostrar en la consola)
        console.log(data);
    })
    .catch(error => {
        // Manejar errores
        console.error('There was a problem with the fetch operation:', error);
    });
























//9
// Función para limpiar los resultados y el campo de búsqueda
function clearResults() {
    // Limpiar el campo de búsqueda
    document.getElementById('search').value = '';
    
    // Limpiar el contenedor de resultados
    document.getElementById('results-container').innerHTML = '';
}