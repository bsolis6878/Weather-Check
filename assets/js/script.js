var citySearch = document.querySelector("button");
var city = document.querySelector("input");
var currentCity = document.querySelector("#current-city");
var currentTemp = document.querySelector("#current-temp");
var currentWind = document.querySelector("#current-wind");
var currentHumidity = document.querySelector("#current-humidity");
var forecast = document.querySelector(".future-forecast");
var forecastText = document.querySelector("#five-day");
var searchBox = document.querySelector("#previous-searches");

// search button
citySearch.addEventListener("click", function() {
    var cityName = city.value;
    weatherData(cityName);
    searchHistory(cityName);
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
                forecastData(location);
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
           response.json().then(function(data) {
                // clears forecast div before every search
                forecast.innerHTML="";

                forecastText.textContent = "5 day forecast";

                // creates a seperate div for each day in 5-day forecast
                for (i = 0; i < data.list.length; i = i + 8) {
                    // div for each day
                    var forecastBox = document.createElement("div");
                    forecastBox.className = "forecast-day";
                    forecast.appendChild(forecastBox);
                    // span for date
                    var date = document.createElement("span");
                    date.textContent = data.list[i].dt_txt.split(" ")[0];
                    forecastBox.appendChild(date);
                    // icon will go here
                    // span for temp
                    var temp = document.createElement("span");
                    temp.textContent = "Temp: " + data.list[i].main.temp + " °F";
                    forecastBox.appendChild(temp);
                    // span for wind speed
                    var wind = document.createElement("span");
                    wind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
                    forecastBox.appendChild(wind);
                    // span for humidity
                    var humidity = document.createElement("span");
                    humidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
                    forecastBox.appendChild(humidity);
                }
           })
    })
}


var searchHistory = function(location) {
    // for each search, adds a button and appends it
    var historyButton = document.createElement("button")
    historyButton.className = "history";
    historyButton.textContent = location;
    searchBox.appendChild(historyButton);

    // on button click updates weather data with that locatin's data
    historyButton.onclick = function() {
        weatherData(location);
    }
}