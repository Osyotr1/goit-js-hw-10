import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import { makeCard } from './makeCard';
import { makeList } from './makeList';

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
    
        fetchCountries(inputValue)
            .then(renderCountriesCard)
            .catch(wrongCountryName);
};


function renderCountriesCard(country) {

    if (country.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }
    else if (country.length >= 2 && country.length <= 10) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = makeList(country)
        input.value = '';
    } else {
        countryList.innerHTML = '';
        countryInfo.innerHTML = makeCard(country)
        input.value = '';
    }
};

function wrongCountryName() {
    input.value = ''
    Notiflix.Notify.failure('Oops, there is no country with that name');
};





