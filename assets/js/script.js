// Search Function

searchFunction() {
    // Search Variable
    
    var searchHolder = document.querySelector('#searchInput').value;

// fetch
fetch(
    ''
)

.then(function(response) {
    return response.json();
})

.then(function(response) {
    console.log(response.data[0]);

    var currentContainerEl = document.querySelector('#currentContainer');

    currentContainerEl.innerHTML = '';
    var currentTemp = document.createElement('h3');
    currentTemp.setAttribute('innerHtml', "Current Tempererature" + response. );
    currentContainerEl.appendChild(currentTemp);
    
})

}