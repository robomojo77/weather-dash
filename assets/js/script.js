// Search Function

function searchFunction() {
    // Search Variable
    
    var searchHolder = document.querySelector('#searchInput').value;

// fetch
fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=' +
     searchHolder + 
     '&appid=a49467f838c4b2f44e490a0eaf64a7dc'
)

.then(function(response) {
    return response.json();
})

.then(function(response) {
    console.log(response.name);

// Current Weather Container

    var currentContainerEl = document.querySelector('#currentContainer');

    currentContainerEl.innerHTML = '';
    var currentCityName = document.createElement("p");
    currentCityName.innerHTML = "Current City: " + response.name;
    currentContainerEl.appendChild(currentCityName);
    var currentCityDate = document.createElement("p");
    currentCityDate.innerHTML = moment().format('dddd, MMMM Do YYYY');
    currentContainerEl.appendChild(currentCityDate);
    
});

}