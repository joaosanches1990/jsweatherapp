const apikey = "9220d147dcaf8d0bb5262195d3247f18";

const weatherData = document.getElementById("weather-data")
const cityInput = document.getElementById("city-input")

const formEl = document.querySelector("form")

formEl.addEventListener("submit", (e) => {
  e.preventDefault()
  const city = cityInput.value
  getWeatherData(city)
});

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
    )
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()

    const temperature = Math.round(data.main.temp)
    const description = data.weather[0].description
    const icon = data.weather[0].icon
    const details = [
      `Feels like ${Math.round(data.main.feels_like)}°C`,
      `Humidity ${data.main.humidity}%`,
      `Wind ${data.wind.speed}m/s`
    ]

    weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
    weatherData.querySelector(
      ".temperature").textContent = `${temperature}°C`
    weatherData.querySelector(
      ".description").textContent = description
    weatherData.querySelector(".details").innerHTML = details.map(
      (detail) => `<div>${detail}</div>`).join("")

  } catch (error) {
    weatherData.querySelector(".icon").innerHTML = ""
    weatherData.querySelector(
      ".temperature").textContent = ""
    weatherData.querySelector(
      ".description").textContent = "An error happen try again"
    weatherData.querySelector(".details").innerHTML = ""
  }
}
