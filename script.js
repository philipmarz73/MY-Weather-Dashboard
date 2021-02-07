function createCityList(citySearchList) {
    $("#city-list").empty();
    
    var keys = Object.keys(citySearchList);
    for (var i = 0; i < keys.length; i++) {
       var cityListEntry = $("<button>");
      
       cityListEntry.addClass("list-group-item list-group-item-action");

       var splitStr = keys[i].toLowerCase().split(" ");
       for (var j = 0; j < splitStr.length; j++) {
         splitStr[j] =
           splitStr[j].charAt(0).toUpperCase() + splitStr[j].substring(1);
       }
       var titleCasedCity = splitStr.join(" ");
       cityListEntry.text(titleCasedCity);
       $("#city-list").append(cityListEntry);
     }
   }

   function populateCityWeather(city, citySearchList) {
    createCityList(citySearchList);
   
    var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=aaf4ebe95bfbef423b2ba1a39922ee77&q=" +
    city;
  
    var queryURL2 =
    "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=aaf4ebe95bfbef423b2ba1a39922ee77&q=" +
    city;

    var latitude;
    var longitude;

  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .then(function(weather) {
    // Log the queryURL
    console.log(queryURL);
    // Log the resulting object
    console.log(weather);

    var presentMoment = moment()

    var displayMoment = $("<h3>");
      $("#city-name").empty();
      $("#city-name").append(
        displayMoment.text("(" + presentMoment.format("M/D/YYYY") + ")")
      );
    var cityName = $("<h3>").text(weather.name);
    $("#city-name").prepend(cityName);

    var weatherIcon = $("<img>");
      weatherIcon.attr(
        "src",
        "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
      );
      $("#current-icon").empty();
      $("#current-icon").append(weatherIcon);

      $("#current-temp").text("Temperature: " + weather.main.temp + " °F");
      $("#current-humidity").text("Humidity: " + weather.main.humidity + "%");
      $("#current-wind").text("Wind Speed: " + weather.wind.speed + " MPH");

      latitude = weather.coord.lat;
      longitude = weather.coord.lon;

    var queryURL3 =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=aaf4ebe95bfbef423b2ba1a39922ee77&q=" +
        "&lat=" +
        latitude +
        "&lon=" +
        longitude;

        $.ajax({
            url: queryURL3,
            method: "GET"
            // Store all of the retrieved data inside of an object called "uvIndex"
          }).then(function(uvIndex) {
            console.log(uvIndex);
    
    var uvIndexDisplay = $("<button>");
        uvIndexDisplay.addClass("btn btn-danger");
    
    $("#current-uv").text("UV Index: ");
    $("#current-uv").append(uvIndexDisplay.text(uvIndex[0].value));
        console.log(uvIndex[0].value);

        $.ajax({
            url: queryURL2,
            method: "GET"
                // Store all of the retrieved data inside of an object called "forecast"
          }).then(function(forecast) {
            console.log(queryURL2);   
            console.log(forecast);
                // Loop through forecast list array and display a single forecast entry/time for each of 5 days
            for (var i = 6; i < forecast.list.length; i += 8) {
                  // 6, 14, 22, 30, 38
                var forecastDate = $("<h5>");
      
                var forecastPosition = (i + 2) / 8;
      
                console.log("#forecast-date" + forecastPosition);
                // adding date, humidity, temp and icon data to forecast panels 
    $("#forecast-date" + forecastPosition).empty();
    $("#forecast-date" + forecastPosition).append(
            forecastDate.text(nowMoment.add(1, "days").format("M/D/YYYY"))
    );
    $("#forecast-humidity" + forecastPosition).text(
        "Humidity: " + forecast.list[i].main.humidity + "%"
    );
    $("#forecast-temp" + forecastPosition).text(
        "Temp: " + forecast.list[i].main.temp + " °F"
    );
    $("#forecast-icon" + forecastPosition).empty();
    $("#forecast-icon" + forecastPosition).append(forecastIcon);
                console.log(forecast.list[i].weather[0].icon)

    );

    // add styling (colors) to forecast panels
    $(".forecast").attr(
        "style",
        "background-color:dodgerblue; color:white"
      );
    }
  });
});
});

// retrieve city search list from localstorage
$(document).ready(function() {
    var citySearchListStringified = localStorage.getItem("citySearchList");
    var citySearchList = JSON.parse(citySearchListStringified);

  if (citySearchList == null) {
    citySearchList = {};
  }
  var citySearchList = JSON.parse(citySearchListStringified);

  if (citySearchList == null) {
    citySearchList = {};
  }

//    create city search list
  