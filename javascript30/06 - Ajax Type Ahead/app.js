const endpoint =  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
fetch(endpoint).then( object => object.json()).then( function(data){
   cities.push(...data);
});

function findMatch(stringToMatch, data){
    return data.filter(place => {
    const regEx = new RegExp(stringToMatch,'gi');
    return (place.city.match(regEx) || place.state.match(regEx));
    });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    const matchedCities = findMatch(this.value, cities);
    const html = matchedCities.map(place => {
        
    const regEx = new RegExp(this.value, 'gi');    
    const cityName = place.city.replace(regEx, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regEx, `<span class="hl">${this.value}</span>`);
    
    return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
      
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);