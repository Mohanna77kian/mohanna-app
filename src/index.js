let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

let result;
async function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#weather-app-city");
  let temp = document.querySelector(".weather-temperature");
  let icon = document.querySelector(".weather-icon");

  let apiAddress = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=6bdb310086a38f79b2oc40bdd04tdc66`;
  result = await fetch(apiAddress);

  result = await result.json();
  console.log(result);

  cityElement.innerHTML = result.city;
  temp.innerHTML = result.temperature.current;
  icon.src = result.condition.icon_url;
  icon.classList.remove("aaa");
}
