const apiKey = "YOUR_API_KEY_HERE";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const errorMessage = document.getElementById("errorMessage");

searchBtn.addEventListener("click", fetchWeather);

async function fetchWeather() {
    const city = cityInput.value;

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    errorMessage.textContent = "";
    weatherResult.classList.add("hidden");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("cityName").textContent = data.name;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
        document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} m/s`;

        weatherResult.classList.remove("hidden");

    } catch (error) {
        errorMessage.textContent = error.message;
    }
}
