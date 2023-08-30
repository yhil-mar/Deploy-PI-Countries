const { Country } = require('../db.js');
const getAllCountries = require('../controllers/allCountries.js');

module.exports = async () => {

        try {
                const countries = await getAllCountries();

                await Country.bulkCreate(countries);

                return console.log('Data cargada con éxito');

        } catch (error) {

                return console.log('Ocurrió un error: ' + error);;

        }

};