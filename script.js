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
