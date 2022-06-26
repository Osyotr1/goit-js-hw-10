import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

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
            .catch(wrongCountryName);
                // input.value = '',
                // Notiflix.Notify.failure('Oops, there is no country with that name')
            
};

fetchCountries(name);

function renderCountriesCard(country) {

    if (country.length > 10) {
        input.value = '';
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }
    else if (country.length >= 2 && country.length <= 10) {
        console.log("more countries");
        countryInfo.innerHTML = '';
        countryList.innerHTML = country.map(el => 
            `<li class="list country-lists"><img src =${el.flags.svg} alt=${el.name.official} width="30px" height="20px"><h2 class="country-name">${el.name.official}</h2></li>`
        ).join('');
        input.value = '';
    } else {
        console.log("1 country");
        countryList.innerHTML = '';
        countryInfo.innerHTML = country.map(el => 
            `<li class="list country-card"><img src =${el.flags.svg} alt=${el.name.official} width="200px" height="100px"><h2>${el.name.official}</h2><p><span class="bold-text">Capital: </span>${el.capital}</p><p><span class="bold-text">Population: </span>${el.population}</p><p><span class="bold-text">Languages: </span>${Object.values(el.languages)}</p></li>`
        ).join('');
        input.value = '';
    }
      console.log(country);
}
  



function wrongCountryName() {
    input.value = ''
    Notiflix.Notify.failure('Oops, there is no country with that name');
};

