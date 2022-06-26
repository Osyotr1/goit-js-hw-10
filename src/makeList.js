export function makeList(country) {
   return country.map(el => 
            `<li class="list country-lists"><img src =${el.flags.svg} alt=${el.name.official} width="30px" height="20px"><h2 class="country-name">${el.name.official}</h2></li>`
        ).join('');
};