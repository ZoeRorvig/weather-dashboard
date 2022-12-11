var apiKey = "ce95c0b37caa62e1aa9677a221191ebc";

var searchBtnEl = document.querySelector("#search-button");
var cityInputEl = document.querySelector("#cityInput");
var savedCitiesEl = document.querySelector("#saved-cities");

var cities = [];
var savedCities = [];
var btn;

searchBtnEl.addEventListener("click", function(event){
    var cityInput = cityInputEl.value;
    cities.push(cityInput);
    localStorage.setItem("cities",JSON.stringify(cities));
    displayCity();
});

var displayCity = function(){
    savedCities = JSON.parse(localStorage.getItem("cities"));

    savedCitiesEl.innerHTML = null;

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
    
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