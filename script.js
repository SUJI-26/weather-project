const apiKey = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API Key
const searchBtn = document.querySelector('.search-btn');
const placeInput = document.getElementById('placeInput');
const weatherInfo = document.getElementById('weatherInfo');
const placeName = document.getElementById('placeName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');
const errorMsg = document.getElementById('errorMsg');

searchBtn.addEventListener('click', getWeather);
placeInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') getWeather();
});

function getWeather() {
  const place = placeInput.value.trim();
  if (place === '') return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod === 200) {
        weatherInfo.classList.remove('d-none');
        placeName.textContent = data.name;
        temperature.textContent = `${data.main.temp} °C`;
        description.textContent = data.weather[0].description;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        errorMsg.textContent = "";
      } else {
        weatherInfo.classList.add('d-none');
        errorMsg.textContent = "Place not found!";
      }
    })
    .catch(() => {
      weatherInfo.classList.add('d-none');
      errorMsg.textContent = "Something went wrong!";
    });
}
