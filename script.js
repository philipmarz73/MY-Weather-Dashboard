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