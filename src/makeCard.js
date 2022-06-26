export function makeCard(country) {
    return country.map(el => 
            `<li class="list country-card"><img src =${el.flags.svg} alt=${el.name.official} width="200px" height="100px"><h2>${el.name.official}</h2><p><span class="bold-text">Capital: </span>${el.capital}</p><p><span class="bold-text">Population: </span>${el.population}</p><p><span class="bold-text">Languages: </span>${Object.values(el.languages)}</p></li>`
        ).join('');
};