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
                '&exclude=current,minutely,hourly,alerts&appid=a49467f838c4b2f44e490a0eaf64a7dc'
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
            
            var forecastContainerEl = document.querySelector('#forecastContainer')
            var forecastTitle = document.createElement("h3");
            forecastTitle.innerHTML = "5 Day Forecast";
            $(forecastTitle).addClass("forecastTitle");
            forecastContainerEl.appendChild(forecastTitle);

            // Day 1

            // Day 1 - Date

            var day1Date

            // Day 1 - Condition

            var day1Condition

            // Day 1 - Temp

            var day1Temp

            // Day 1 - Humidity

            var day1Humidity

            // Day 2
            // Day 2 - Date
            // Day 2 - Condition
            // Day 2 - Temp
            // Day 2 - Humidity
            // Day 3
            // Day 3 - Date
            // Day 3 - Condition
            // Day 3 - Temp
            // Day 3 - Humidity
            // Day 4
            // Day 4 - Date
            // Day 4 - Condition
            // Day 4 - Temp
            // Day 4 - Humidity
            // Day 5
            // Day 5 - Date
            // Day 5 - Condition
            // Day 5 - Temp
            // Day 5 - Humidity

        });

}