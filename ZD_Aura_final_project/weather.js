// Replace with your OpenWeatherMap API key
const apiKey = "89641437ff755ff5cd065604bdb30e0f";

// Example location: change to your desired city
const city = "Astana";

// Fetch weather data
async function fetchWeather() {
    const weatherInfo = document.getElementById('weather-info');
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();

        // Update weather information
        weatherInfo.innerHTML = `
            <p><strong>${data.name}</strong></p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;
    } catch (error) {
        weatherInfo.innerHTML = `<p>Unable to fetch weather data. ${error.message}</p>`;
    }
}

// Load weather data on page load
document.addEventListener("DOMContentLoaded", fetchWeather);