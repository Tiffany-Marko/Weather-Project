//https://api.openweathermap.org/data/2.5/weather?q=bremerton&appid=acbbc10a0169525fd8385d8afc492ff3 this is the api url with key

// var requestUrl = 'https://api.github.com/orgs/nodejs/repos?per_page=5';

//var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=bremerton&appid=acbbc10a0169525fd8385d8afc492ff3"

var responseText = document.getElementById('response-text');
var city = document.getElementById('city');
var Wind = document.getElementById('Wind');
var Humidity = document.getElementById('Humidity');
var Temperature = document.getElementById('Temperature');
var Icon = document.getElementById("Icon");
var fiveday = document.getElementsByClassName("fivedaydata");

function getApi(cityName) {
  var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=acbbc10a0169525fd8385d8afc492ff3"

  fetch(requestUrl) //the computer copies the URL then "hits enter"
    .then(function (response) {
      console.log(response);
      if (response.status === 200) {
        responseText.textContent = response.status;
      }
      return response.json();
    }).then(function (response) {
      console.log(response);
      city.textContent = response.name;
      Wind.textContent = "Wind Speed: " + response.wind.speed + "MPH";
      Humidity.textContent = "Humidity: " + response.main.humidity + "%";
      var temp = 1.8 * (response.main.temp - 273) + 32;
      Temperature.textContent = "Temperature: " + Math.round(temp) + "°F";

      Icon.src = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";




      var lat = response.coord.lat;
      var lon = response.coord.lon;

      fiveDayForecast(lat, lon);
    })
}

function fiveDayForecast(lat, lon) {
  var request = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=acbbc10a0169525fd8385d8afc492ff3`

  fetch(request).then(function (response) {
    return response.json();
  }).then(function (response) {
    console.log(response);
    console.log(response.list[3].main.temp);
    

    for (var i = 0; i < fiveday.length; i++) {

      var temp = 1.8 * (response.list[i].main.temp - 273) + 32;
      fiveday[i].innerHTML = "<img src='https://openweathermap.org/img/wn/"+response.list[i].weather[0].icon+"@2x.png'><p>Temperature: " + Math.round(temp) + "°F</p><p>Wind: "+response.list[i].wind.speed+"MPH</p><p>Humidity: "+response.list[i].main.humidity+"%</p>";

    }
  })
}



function search() {
  //console.log("search");
  var searchText = document.getElementById('searchbar').value
  //this grabs the searchbar element by ID in the HTML. .value gets the text that is inside the text box
  console.log(searchText);
  getApi(searchText);
} //the above allows a text to go live inside of the search bar 




//getApi(requestUrl);

