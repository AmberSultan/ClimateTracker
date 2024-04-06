let API_KEY = "ecf426fc7ef68f8d0f071b9c77413a4a";
// let URL = `https://api.openweathermap.org/data/2.5/weather?q=Lahore&appid=${API_KEY}`;
let baseURL = "https://api.openweathermap.org/data/2.5/weather";

let searchCity = document.querySelector('.enter');
let cityName = document.querySelector('.city_name');
let searchBtn = document.querySelector('.search');
let weatherIconContainer = document.querySelector('.weather_icon');
let weatherIcon = weatherIconContainer.querySelector('.weather_img');

searchBtn.addEventListener('click',function(event){
    event.preventDefault();
    console.log( searchCity.value);
    // cityName.innerText = `${searchCity.value}`;

    if(searchCity.value === "" || !isNaN(searchCity.value)){
        alert('Please enter valid city name');
        return;
    }
    
    updateWeather();
});



async function updateWeather (){
    let URL = `${baseURL}?q=${searchCity.value}&appid=${API_KEY}`;
    let update_w = await fetch (URL);
    var data = await update_w.json();

    if (data.cod === "404") {
        alert("City not found. Please enter a valid city name.");
        return;
    }

    function kelvinToCelsius(kelvin) {
        // Formula: Celsius = Kelvin - 273.15
        return kelvin - 273.15;
    }

    document.querySelector(".temp").innerText = kelvinToCelsius(data.main.temp).toFixed(1) + "°C";
    document.querySelector(".city_name").innerText = data.name;
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".windSpeed").innerText = data.wind.speed + "km/h";
    document.querySelector(".wCondition").innerText = data.weather[0].main;

    console.log(data);
    updateWeatherIcon(data.weather[0].main); 
    
    document.querySelector(".showWeather").style.display = "block";
}
function updateWeatherIcon(weatherCondition) {
    switch (weatherCondition) {
        case "Clouds":
            weatherIcon.src = "images/clouds.png";
            break;
        case "Clear":
            weatherIcon.src = "images/sun.png";
            break;
        case "Rain":
            weatherIcon.src = "images/rain.png";
            break;
        case "Drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
        case "Mist":
            weatherIcon.src = "images/mist.png";
            break;
        case "Snow":
            weatherIcon.src = "images/snow.png";
            break;
        case "Haze":
            weatherIcon.src = "images/haze.png";
            break;
        case "Smoke":
            weatherIcon.src = "images/smoke.png";
            break;
        default:
            weatherIcon.src = "images/mist.png";
            break;
    }

}


   
