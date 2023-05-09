const { Country } = require('../db.js');
const getAllCountries = require('../controllers/allCountries.js');

module.exports = async () => {

        const countries = await getAllCountries()

        await Country.bulkCreate(countries)

        return console.log('data cargada con éxito');

};