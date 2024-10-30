
let searchForm = document.querySelector("#search-form");
let searchInput = document.querySelector("#search-input");
let searchButton = document.querySelector(".search-button");

searchForm.addEventListener("submit", searchSubmit);
searchInput.addEventListener("input", toggleButton);

// Toggle the button based on input value
function toggleButton() {
  searchButton.disabled = searchInput.value == "";
}

// Call the API and render the data
async function searchSubmit(event) {
  event.preventDefault();

  let cityElement = document.querySelector("#weather-app-city");
  let temp = document.querySelector(".weather-temperature");
  let icon = document.querySelector(".weather-icon");
  let condition = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let timeElement = document.querySelector("#time");

  let currentWeatherApi = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=6bdb310086a38f79b2oc40bdd04tdc66&units=metric`;
  currentResult = await fetch(currentWeatherApi);
  currentResult = await currentResult.json();

  let date = new Date(currentResult.time * 1000);
  timeElement.innerHTML = formatDay(date);

  cityElement.innerHTML = currentResult.city;
  temp.innerHTML = Math.round(currentResult.temperature.current);
  icon.src = currentResult.condition.icon_url;
  icon.classList.remove("aaa");
  condition.innerHTML = currentResult.condition.description;
  humidityElement.innerHTML = `${currentResult.temperature.humidity}%`;
  speedElement.innerHTML = `${currentResult.wind.speed}km/h`;

  let forecastWeatherApi = `https://api.shecodes.io/weather/v1/forecast?query=${searchInput.value}&key=6bdb310086a38f79b2oc40bdd04tdc66&units=metric`;
  forecastResult = await fetch(forecastWeatherApi);
  forecastResult = await forecastResult.json();

  let forecastHTML = "";
  let forecastDays = forecastResult.daily.slice(1, 5);
  console.log(forecastDays);

  forecastDays.forEach(function (day) {
    forecastHTML += `
      <div class="forecast-day">
        <div class="forecast-date">${formatDays(day.time)}</div>
        <div>
          <img src="${day.condition.icon_url}" class="forecast-icon" />
        </div>
        <div class="forecast-temperatures">
          <div class="forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minute < 10) minute = `0${minute}`;
  if (hour < 10) hour = `0${hour}`;

  return `${day} ${hour}:${minute}`;
}

function formatDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

// Trigger search for "Tehran" on page load and enable/disable button accordingly
document.addEventListener("DOMContentLoaded", async () => {
  searchInput.value = "Tehran"; // Set default city
  await searchSubmit(new Event("submit")); // Trigger the search for the default city
  searchInput.value = "";
  toggleButton(); // Set button state based on initial value
});
