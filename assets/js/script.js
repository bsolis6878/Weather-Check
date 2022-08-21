var weatherData = function(location) {
     var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&APPID=5a42b591b4bd6478adc5120147487428"

     fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            })
        }
     })
}

var forecastData = function(location) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&APPID=5a42b591b4bd6478adc5120147487428"

    fetch(apiUrl).then(function(response) {
       if (response.ok) {
           response.json().then(function(data) {
               console.log(data);
           })
       }
    })
}

weatherData("San Antonio")
forecastData("San Antonio")