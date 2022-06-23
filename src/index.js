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
    const inputValue = input.value.trim();
    // console.log(inputValue);
    fetchCountries(inputValue)
        .then(renderCountriesCard)
        .catch(error => console.log(error));
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

    if (country.length > 9) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else {
        country.map(el => {
            const {
                capital,
                flags: { svg },
                name: { official },
                population,
                languages,
            } = el
            const countryName = el.name.official;
            const markup = `<li class="list"><img src ="${el.flags.svg}" alt="${countryName}" width="100px" height="50px"><h2>${countryName}</h2></li>`
            countryList.insertAdjacentHTML('afterbegin', markup)
        });
    }
      console.log(country);
}
  





