var apiKey = "ce95c0b37caa62e1aa9677a221191ebc";

var searchBtnEl = document.querySelector("#search-button");
var cityInputEl = document.querySelector("#cityInput");
var savedCitiesEl = document.querySelector("#saved-cities");

var cities = [];
var savedCities = [];
var btn;
var city;

// link: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

searchBtnEl.addEventListener("click", function(event){
    var cityInput = cityInputEl.value;
    cities.push(cityInput);
    localStorage.setItem("cities",JSON.stringify(cities));
    displayCity();
    getCoords(city);
});

var displayCity = function(){
    savedCities = JSON.parse(localStorage.getItem("cities"));

    savedCitiesEl.innerHTML = null;

    for (var i = 0; i < cities.length; i++) {
        city = cities[i];
    
        btn = document.createElement("button");
        btn.textContent = city;
        btn.setAttribute("data-index", i);
        btn.setAttribute("id", "cityBtn");
        btn.type = "button";
        btn.name = "cityBtn";
        savedCitiesEl.appendChild(btn);
      };
      return;
};

var getCoords = function(city){
    var coordsApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

    fetch(coordsApi)
        .then(function(response){
            if (response.ok){
            response.json()
                .then(function (data) {
                console.log('city', data);
                console.log(data[0].lat);
                console.log(data[0].lon);
            });
            } else {
                alert('Error: ' + response.statusText);
            }
        });
};
