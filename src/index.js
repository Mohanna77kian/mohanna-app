let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

let currentResult;
async function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#weather-app-city");
  let temp = document.querySelector(".weather-temperature");
  let icon = document.querySelector(".weather-icon");
  let condition = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let timeElement = document.querySelector("#time");


  let currentWeatherApi = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=6bdb310086a38f79b2oc40bdd04tdc66`;
  currentResult = await fetch(currentWeatherApi);

  currentResult = await currentResult.json();

  let date = new Date(currentResult.time * 1000);
  timeElement.innerHTML = formatDay(date);

  cityElement.innerHTML = currentResult.city;
  temp.innerHTML = Math.round(currentResult.temperature.current);
  icon.src = currentResult.condition.icon_url;
  icon.classList.remove("aaa");
  condition.innerHTML = currentResult.condition.description;
  humidityElement.innerHTML =  `${currentResult.temperature.humidity}%`;
  speedElement.innerHTML = `${currentResult.wind.speed}km/h`;
}

function formatDay(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();
  
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let day = days[date.getDay()];
  if (minute<10) {
    minute = `0${minute}`
  }
  if (hour<10) {
    hour = `0${hour}`
  }

  return `${day} ${hour}:${minute}`;
}


