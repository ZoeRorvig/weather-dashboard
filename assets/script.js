// Variables
var apiKey = "ce95c0b37caa62e1aa9677a221191ebc";

var searchBtnEl = document.querySelector("#search-button");
var clearBtnEl = document.querySelector("#clear-button");
var cityInputEl = document.querySelector("#cityInput");
var savedCitiesEl = document.querySelector("#saved-cities");
var firstCard = document.querySelector(".card-0");

var todaysDate = dayjs().format("M/D/YYYY");
var cities = [];
var savedCities = [];
var fiveDayTemp = [0];
var fiveDayWind = [0];
var fiveDayHumidity = [0];
var fiveDayIcon = [0];
var btn;
var city;
var lat;
var lon;

// Initial display for dates
displayTime();
displayCity();

// Function to display dates
function displayTime() {
    firstCard.children[0].children[0].textContent = todaysDate;

    for (var i = 1; i <= 5; i++) {
        var cardSelector = ".card-" + i;
        var card = document.querySelector(cardSelector);
        var date = dayjs().add(i, "day").format("M/D/YYYY");
        card.children[0].children[0].textContent = date;
    }
};

// Clears the page and local Storage
clearBtnEl.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Function to store cities when the search button is clicked
searchBtnEl.addEventListener("click", function (event) {
    event.preventDefault();
    var cityInput = cityInputEl.value;
    cityInputEl.value = "";
    cities.push(cityInput);
    localStorage.setItem("cities", JSON.stringify(cities));
    displayCity();
    getCoords(city);
});

// Function to display cities
function displayCity () {
    cities = JSON.parse(localStorage.getItem("cities")) || [];

    savedCitiesEl.innerHTML = null;

    for (var i = 0; i < cities.length; i++) {
        city = cities[i];


        button = document.createElement("button");
        button.textContent = city;
        button.setAttribute("data-index", i);
        button.setAttribute("id", "cityBtn");
        button.type = "button";
        savedCitiesEl.appendChild(button);
    };
    return;
};

// Function to get coordinates from city input
var getCoords = function (city) {
    var coordsApi = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

    fetch(coordsApi)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        lat = data[0].lat;
                        lon = data[0].lon;
                        getWeather(lat, lon);
                    });
            }
        });
};

// Function to get the weather data
var getWeather = function (lat, lon) {
    var dailyWeatherApi = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
    var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

    fetch(dailyWeatherApi)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        displayTodaysWeather(data);
                    });
            }
        });

    fetch(weatherApi)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        displayFiveDayWeather(data);
                    })
            }
        });

};

// Function to display todays weather
var displayTodaysWeather = function (data) {
    firstCard.children[0].children[0].textContent = data.name + " (" + todaysDate + ")";
    firstCard.children[2].children[0].textContent = "Temp: " + data.main.temp + "°F";
    firstCard.children[2].children[1].textContent = "Wind: " + data.wind.speed + "MPH";
    firstCard.children[2].children[2].textContent = "Humidity: " + data.main.humidity + "%";
    firstCard.children[1].src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
};

// Function to display the five day weather forecast
var displayFiveDayWeather = function (data) {
    for (var i = 1, x = 0; i <= 5, x < 40; i++, x += 8) {
        var cardSelector = ".card-" + i;
        var card = document.querySelector(cardSelector);

        fiveDayTemp[i] = data.list[x]?.main.temp;
        fiveDayWind[i] = data.list[x]?.wind.speed;
        fiveDayHumidity[i] = data.list[x]?.main.humidity;
        fiveDayIcon[i] = data.list[x]?.weather[0].icon;

        card.children[2].children[0].textContent = "Temp: " + fiveDayTemp[i] + "°F";
        card.children[2].children[1].textContent = "Wind: " + fiveDayWind[i] + "MPH";
        card.children[2].children[2].textContent = "Humidity: " + fiveDayHumidity[i] + "%";
        card.children[1].src = "http://openweathermap.org/img/wn/" + fiveDayIcon[i] + "@2x.png";
    };
};

// Function and event listener to display information for saved cities
var savedCityClick = function (event) {
    if (event.target.matches("button")) {
        getCoords(event.target.textContent);
    }
};

savedCitiesEl.addEventListener("click", savedCityClick);