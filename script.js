let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let resultCountriesEl = document.getElementById("resultCountries");

let searchInputValue = "";
let countryList = [];

function createAndAppend(country) {
    let countryCard = document.createElement("div");
    countryCard.classList.add("country-card", "col-11", "col-md-5", "d-flex", "flex-row", "mr-auto", "ml-auto");
    resultCountriesEl.appendChild(countryCard);

    let imgEl = document.createElement("img");
    imgEl.src = country.flag;
    imgEl.classList.add("country-flag", "mt-auto", "mb-auto");
    countryCard.appendChild(imgEl);

    let countryInfo = document.createElement("div");
    countryInfo.classList.add("d-flex", "flex-column", "ml-4");
    countryCard.appendChild(countryInfo);


    let countryNameEl = document.createElement("p");
    countryNameEl.textContent = country.name;
    countryNameEl.classList.add("country-name");
    countryInfo.appendChild(countryNameEl);

    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.textContent = country.population;
    countryPopulationEl.classList.add("country-population");
    countryInfo.appendChild(countryPopulationEl);
}

function displaySearchResult() {
    resultCountriesEl.textContent = "";
    for (let country of countryList) {
        let countryName = country.name;
        if (countryName.includes(searchInputValue)) {
            createAndAppend(country);
        }
    }
}

function getCountries() {
    let url = "https://apis.ccbp.in/countries-data";

    let options = {
        method: "GET"
    };
    spinnerEl.classList.remove("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            console.log(jsonData);
            countryList = jsonData;
            displaySearchResult();
        })
}

function searchCountries(event) {
    searchInputValue = event.target.value;
    console.log(searchInputValue);
    displaySearchResult();
}

getCountries();

searchInputEl.addEventListener("keyup", searchCountries);
