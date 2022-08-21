var citySearch = document.querySelector("button");
var city = document.querySelector("input");
var currentCity = document.querySelector("#current-city");
var currentTemp = document.querySelector("#current-temp");
var currentWind = document.querySelector("#current-wind");
var currentHumidity = document.querySelector("#current-humidity");
var forecast = document.querySelector(".future-forecast");
var forecastText = document.querySelector("#five-day");

citySearch.addEventListener("click", function() {
    var cityName = city.value;
    weatherData(cityName);
    forecastData(cityName);
    city.value = "";
})

// fetch for current data
var weatherData = function(location) {
     var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&APPID=5a42b591b4bd6478adc5120147487428"

     fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // changes text to data from fetch
                currentCity.textContent = data.name;
                currentTemp.textContent = "Current temperature: " + data.main.temp + " °F";
                currentWind.textContent = "Current wind speed: " + data.wind.speed + " MPH";
                currentHumidity.textContent = "Current humidity: " + data.main.humidity + "%";
            })
        } else {
            alert("Something went wrong with your request.");
        }
     })
}

// fetch for forecast data
var forecastData = function(location) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&APPID=5a42b591b4bd6478adc5120147487428"

    fetch(apiUrl).then(function(response) {
       if (response.ok) {
           response.json().then(function(data) {
                forecastText.textContent = "5 day forecast";
                // creates a seperate div for each day in 5-day forecast
                for (i = 0; i < data.length; i = i + 8) {
                    console.log(data);
                    // div for each day
                    var forecastBox = document.createElement("div");
                    forecastBox.className = "forecast-day";
                    forecast.appendChild(forecastBox);
                    // span for date
                    var date = document.createElement("span");
                    date.textContent = data[i].dt_txt;
                    forecastBox.appendChild(date);
                    // icon will go here
                    // span for temp
                    var temp = document.createElement("span");
                    temp.textContent = "Temp: " + data[i].main.temp + " °F";
                    forecastBox.appendChild(temp);
                    // span for wind speed
                    var wind = document.createElement("span");
                    wind.textContent = "Wind: " + data[i].wind.speed + " MPH";
                    forecastBox.appendChild(wind);
                    // span for humidity
                    var humidity = document.createElement("span");
                    humidity.textContent = "Humidity: " + data[i].main.humidity + "%";
                    forecastBox.appendChild(humidity);
                }
           })
       }
    })
}