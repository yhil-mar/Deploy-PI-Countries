const axios = require('axios');

module.exports = async () => {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data.map(country => {
        return {
            id: country.cca3,
            name: country.name.common,
            image: country.flags[0],
            continent: country.continents[0],
            capital: country.capital ? country.capital[0] : "Has no capital",
            subregion: country.subregion,
            area: country.area,
            population: country.population
        };
    });
    return countries;
};