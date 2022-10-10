//https://api.openweathermap.org/data/2.5/weather?q=bremerton&appid=acbbc10a0169525fd8385d8afc492ff3 this is the api url with key

// var requestUrl = 'https://api.github.com/orgs/nodejs/repos?per_page=5';

//var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=bremerton&appid=acbbc10a0169525fd8385d8afc492ff3"

var responseText = document.getElementById('response-text');
var city = document.getElementById('city');
var Wind = document.getElementById('Wind');
var Humidity = document.getElementById('Humidity');

function getApi(cityName) {
  var requestUrl ="https://api.openweathermap.org/data/2.5/weather?q=" +cityName+"&appid=acbbc10a0169525fd8385d8afc492ff3"

  fetch(requestUrl) //the computer copies the URL then "hits enter"
    .then(function (response) {
      console.log(response);
      if (response.status === 200) {
        responseText.textContent = response.status;
      }
      return response.json();
  }).then(function (response) {
    console.log(response)
    city.textContent = response.name
    Wind.textContent = "Wind Speed: " + response.wind.speed
    Humidity.textContent ="Humidity: " + response.main.humidity


    var lat = response.coord.lat
    var lon = response.coord.lon

    fiveDayForecast(lat, lon)
  })
}

function fiveDayForecast(lat,lon) {
    var request = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=acbbc10a0169525fd8385d8afc492ff3`

    fetch(request).then(function (response) {
      return response.json()
    }).then(function (response)  {
      console.log(response)
      console.log(response.list[3].main.temp)
    })
}



function search(){
  //console.log("search");
  var searchText = document.getElementById('searchbar').value
  //this grabs the searchbar element by ID in the HTML. .value gets the text that is inside the text box
  console.log(searchText);
  getApi(searchText);
} //the above allows a text to go live inside of the search bar 




//getApi(requestUrl);

