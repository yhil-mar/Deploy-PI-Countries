const getCountrieById = require('../../controllers/getCountryById');

module.exports = async (req, res) => {

    const { idPais } = req.params;

    try {

        const country = await getCountrieById(idPais);

        res.status(200).json(country);

    } catch (error) {

        res.status(500).json({ error: error.message });

    };
    
};