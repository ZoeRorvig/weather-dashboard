var apiKey = "ce95c0b37caa62e1aa9677a221191ebc";

var searchBtnEl = document.querySelector("#search-button");
var cityInputEl = document.querySelector("#cityInput");

var cities = [];

searchBtnEl.addEventListener("click", function(event){
    city = cityInputEl.value;
    cities.push(city);
    localStorage.setItem("cities",JSON.stringify(cities));
});