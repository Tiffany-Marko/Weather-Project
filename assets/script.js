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
var dateElement = document.getElementById("date")
var searchHistoryElement = document.getElementById("searchhistory");

var searchHistory = {
  history: []

}
// keep variables organized above for quick reference. 

function createSearchButton(name) {
  var searchButtonItem = document.createElement("button")
  searchButtonItem.textContent = name
  searchButtonItem.classList.add("city")
  searchHistoryElement.appendChild(searchButtonItem)

  for (var i=0; i<searchHistoryElement.children.length; i++){
    searchButtonItem.onclick = function(){
      getApi(searchButtonItem.textContent)
    }

  }
  
}
function displaySearchHistory() {
  var savedSearchHistory = localStorage.getItem("searchHistory")
  if (!savedSearchHistory) {
    var defaultCitiesArray = ["Ventura", "Santa Maria", "Bremerton", "Seattle", "San Diego", "Everett"]
    // storing city info until cleared

    searchHistory.history = defaultCitiesArray
      localStorage.setItem ("searchHistory",  JSON.stringify(searchHistory))
  }
  else if (savedSearchHistory){
    searchHistory = JSON.parse(savedSearchHistory) 
  }
  for (var i=0; i<searchHistory.history.length; i++){
    createSearchButton(searchHistory.history[i])
  }

}
function getApi(cityName) {
  var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=acbbc10a0169525fd8385d8afc492ff3"

  fetch(requestUrl) //the computer copies the URL then "hits enter"
    .then(function (response) {
      console.log(response);
      // if (response.status === 200) {
      //   responseText.textContent = response.status;
      // }
      return response.json();
    }).then(function (response) {
      console.log(response);
      console.log(response.dt_txt, response.dt)
      var date = new Date(1000*response.dt);
      var formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
      dateElement.textContent = formattedDate;
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
    

    for (var i = 0; i < response.list.length; i+=8) {
      console.log(response.list[i])
      var temp = 1.8 * (response.list[i].main.temp - 273) + 32;
      var date = new Date(response.list[i].dt_txt);
      var formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
      fiveday[i/8].innerHTML = `<p>${formattedDate}</p><img src='https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png'><p>Temperature:${Math.round(temp)}°F</p><p>Wind:${response.list[i].wind.speed}MPH</p><p>Humidity:${response.list[i].main.humidity}%</p>`;



    }
  })
}



function search() {
  //console.log("search");
  var searchText = document.getElementById('searchbar').value
  //this grabs the searchbar element by ID in the HTML. .value gets the text that is inside the text box
  console.log(searchText);
  searchHistory.history.push(searchText)
  localStorage.setItem ("searchHistory",  JSON.stringify(searchHistory))
  createSearchButton(searchText)
  getApi(searchText);
} //the above allows a text to go live inside of the search bar 

displaySearchHistory()





//getApi(requestUrl);

