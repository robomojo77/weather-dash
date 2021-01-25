function loadSearches () {
    // Oldest Search

    var oldestSearch = localStorage.getItem("oldestSave");
    if (oldestSearch != undefined) {
        var searchContainerEl = document.querySelector('#searchHistory')
        var oldestSearchBox = document.createElement("button");
        oldestSearchBox.innerHTML = oldestSearch;
        $(oldestSearchBox).addClass("searchBox");
        searchContainerEl.appendChild(oldestSearchBox);
    }

    // Old Search

    var oldSearch = localStorage.getItem("oldSave");
    if (oldSearch != undefined) {
        var searchContainerEl = document.querySelector('#searchHistory')
        var oldSearchBox = document.createElement("button");
        oldSearchBox.innerHTML = oldSearch;
        $(oldSearchBox).addClass("searchBox");
        searchContainerEl.appendChild(oldSearchBox);
    }

    // Last Search

    var lastSearch = localStorage.getItem("lastSave");
    if (lastSearch != undefined) {
        var searchContainerEl = document.querySelector('#searchHistory')
        var lastSearchBox = document.createElement("button");
        lastSearchBox.innerHTML = lastSearch;
        $(lastSearchBox).addClass("searchBox");
        searchContainerEl.appendChild(lastSearchBox);
    }

}

loadSearches();

// Search Function

function searchFunction() {
    // Search Variable

    var searchHolder = document.querySelector('#searchInput').value;

    // fetch
    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        searchHolder +
        '&units=imperial&appid=a49467f838c4b2f44e490a0eaf64a7dc'
    )

        .then(function (response) {
            return response.json();
        })

        .then(function (response) {
            console.log(response.name);

            // Current Weather Container

            var currentContainerEl = document.querySelector('#currentContainer');

            // Clear Container
            currentContainerEl.innerHTML = '';

            // City Name and Date
            var currentCityName = document.createElement("p");
            currentCityName.innerHTML = "Current City: " + response.name;
            $(currentCityName).addClass("currentCityName");
            currentContainerEl.appendChild(currentCityName);
            var currentCityDate = document.createElement("p");
            currentCityDate.innerHTML = moment().format('dddd, MMMM Do YYYY');
            currentContainerEl.appendChild(currentCityDate);

            // Current Weather Data
            // Temp
            var currentCityTemp = document.createElement("p");
            currentCityTemp.innerHTML = "Temperature: " + response.main.temp;
            currentContainerEl.appendChild(currentCityTemp);

            // Humidity
            var currentCityHumid = document.createElement("p");
            currentCityHumid.innerHTML = "Humidity: " + response.main.humidity;
            currentContainerEl.appendChild(currentCityHumid);

            // Wind
            var currentCityWind = document.createElement("p");
            currentCityWind.innerHTML = "Wind Speed: " + response.wind.speed;
            currentContainerEl.appendChild(currentCityWind);

            // UV Index
            var currentCityLat = response.coord.lat;
            var currentCityLon = response.coord.lon;
            console.log(currentCityLon);
            // UV Fetch
            return fetch(
                'https://api.openweathermap.org/data/2.5/onecall?lat=' +
                currentCityLat +
                '&lon=' +
                currentCityLon +
                '&exclude=current,minutely,hourly,alerts&units=imperial&appid=a49467f838c4b2f44e490a0eaf64a7dc'
            );
        })

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            console.log(data.daily[0].uvi);
            var currentContainerEl = document.querySelector('#currentContainer');
            var currentCityUV = document.createElement("p");
            currentCityUV.innerHTML = "UV Index: " + data.daily[0].uvi;
            if (data.daily[0].uvi < 3) {
                $(currentCityUV).addClass("uvLow");
            } else if (data.daily[0].uvi < 7) {
                $(currentCityUV).addClass("uvMod");
            } else {
                $(currentCityUV).addClass("uvHi");
            }
            currentContainerEl.appendChild(currentCityUV);

            // 5 Day Forecast
            // Forecast Title

            var forecastContainerEl = document.querySelector('#forecastTitleDiv');

            // Clear Container
            forecastContainerEl.innerHTML = '';

            var forecastTitle = document.createElement("h3");
            forecastTitle.innerHTML = "5 Day Forecast";
            $(forecastTitle).addClass("forecastTitle");
            forecastContainerEl.appendChild(forecastTitle);

            // Forecast Loop
            for (i = 0; i < 5; i++) {

                // Day Container

                var dayContainerEl = document.querySelector('#day_' + i);

                // Clear Container
                dayContainerEl.innerHTML = '';

                // Date

                var forecastDate = document.createElement("p");
                forecastDate.innerHTML = moment().add(i, 'days').format('dddd');
                $(forecastDate).addClass("forecastDate");
                dayContainerEl.appendChild(forecastDate);

                // Condition

                var forecastCondition = document.createElement("img");
                forecastCondition.setAttribute('src', "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");
                $(forecastCondition).addClass("forecastCondition");
                dayContainerEl.appendChild(forecastCondition);

                // Temp

                var forecastTemp = document.createElement("p");
                forecastTemp.innerHTML = "Temp: " + data.daily[i].temp.max;
                $(forecastTemp).addClass("forecastTemp");
                dayContainerEl.appendChild(forecastTemp);

                // Humidity

                var forecastHumidity = document.createElement("p");
                forecastHumidity.innerHTML = "Humidity: " + data.daily[i].humidity;
                $(forecastHumidity).addClass("forecastHumidity");
                dayContainerEl.appendChild(forecastHumidity);

            }

        })
        .then(function () {
            var oldSaveTest = localStorage.getItem("oldSave");
            if (oldSaveTest != undefined) {             
                localStorage.setItem("oldestSave", oldSaveTest);
            }
            var lastSaveTest = localStorage.getItem("lastSave");
            if (lastSaveTest != undefined) {
                localStorage.setItem("oldSave", lastSaveTest);
            }
            localStorage.setItem("lastSave", searchHolder);
        });

        

}

// Search Button Listener

$(document).on('click', '.searchBox', function () {
    var searchText = this.innerHTML;
    var searchInputEl = document.querySelector('#searchInput');
    searchInputEl.value = searchText;
    searchFunction();
})