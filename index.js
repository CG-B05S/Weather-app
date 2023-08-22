const apiKey = '093fd8046da39156d466db22cbbc1bbc';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const weatherIcon = document.getElementById('weather-icon');
const temperatureElement = document.getElementById('temperature');
const locationElement = document.getElementById('location');

searchButton.addEventListener('click', () => {
    const city = searchInput.value;
    if (city) {
        getWeatherData(city);
    }
});

function getWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const temperature = (data.main.temp - 273.15).toFixed(2); // Convert temperature to Celsius
            const weatherDescription = data.weather[0].description;
            const iconCode = data.weather[0].icon;

            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
            temperatureElement.textContent = `${temperature}°C, ${weatherDescription}`;
            locationElement.textContent = data.name;
        })
        .catch(error => {
            console.error(error);
            alert('Error fetching weather data. Please try again.');
        });
}