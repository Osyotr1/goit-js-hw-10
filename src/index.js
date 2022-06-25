import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const list = document.querySelector(".list")
const DEBOUNCE_DELAY = 300;

input.addEventListener(
  "input",
  debounce(() => {
    getInputValue()
  }, DEBOUNCE_DELAY)
);

function getInputValue() {
    countryList.innerHTML = '';

    let inputValue = input.value.trim();
    // console.log(inputValue);
    fetchCountries(inputValue)
        .then(renderCountriesCard)
        .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));
    
}

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=capital,population,languages,name,flags`).then(
        response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json();
        },
    );
}

function renderCountriesCard(country) {

    if (country.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }
    else if (country.length >= 2 && country.length <= 10) {
        console.log("more countries");

        countryList.innerHTML = country.map(el => 
            `<li class="list"><img src =${el.flags.svg} alt=${el.name.official} width="100px" height="50px"><h2>${el.name.official}</h2></li>`
        ).join('');
        input.value = '';
    } else {
        console.log("1 country");

        countryInfo.innerHTML = country.map(el => 
            `<li class="list"><img src =${el.flags.svg} alt=${el.name.official} width="100px" height="50px"><h2>${el.name.official}</h2><p><span class="bold-text">Capital: </span>${el.capital}</p><p><span class="bold-text">Population: </span>${el.population}</p><p><span class="bold-text">Languages: </span>${Object.values(el.languages)}</p></li>`
        ).join('');
        input.value = '';
    }
      console.log(country);
}
  





