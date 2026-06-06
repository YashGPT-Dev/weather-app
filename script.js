const apiKey = "9234dd43938d6334284b0f0dd06d274e";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city !== "") {
    getWeather(city);
  }
});

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    document.querySelector(".temperature").textContent =
      `${Math.round(data.main.temp)}°C`;

    document.querySelector(".weather-condition").textContent =
      data.weather[0].description;

    document.querySelector(".location-name").textContent =
      `${data.name}, ${data.sys.country}`;

    document.getElementById("wind-speed").textContent =
      `${data.wind.speed} m/s`;

    document.getElementById("humidity").textContent = `${data.main.humidity}%`;

    document.getElementById("visibility").textContent =
      `${(data.visibility / 1000).toFixed(1)} km`;

    document.getElementById("uv-index").textContent = "N/A";

    updateIcon(data.weather[0].main);
  } catch (error) {
    alert("City not found");
  }
}

function updateIcon(condition) {
  const iconDiv = document.querySelector(".weather-icon-lg");

  if (condition === "Clear") {
    iconDiv.innerHTML = '<i class="fas fa-sun"></i>';
  } else if (condition === "Clouds") {
    iconDiv.innerHTML = '<i class="fas fa-cloud"></i>';
  } else if (condition === "Rain") {
    iconDiv.innerHTML = '<i class="fas fa-cloud-rain"></i>';
  } else if (condition === "Snow") {
    iconDiv.innerHTML = '<i class="fas fa-snowflake"></i>';
  } else {
    iconDiv.innerHTML = '<i class="fas fa-smog"></i>';
  }
}

getWeather("Delhi");
