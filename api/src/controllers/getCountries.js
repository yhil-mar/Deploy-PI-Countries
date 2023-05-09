const { Country } = require('../db.js');
const queryFixer = require('../helpers/queryFixer.js');

module.exports = async (query) => {

    const fixedQuery = queryFixer(query);

    const countries = await Country.findAll({ where: fixedQuery });

    if (!countries.length) return { message: 'No se encontraron resultados' };

    return countries;

};