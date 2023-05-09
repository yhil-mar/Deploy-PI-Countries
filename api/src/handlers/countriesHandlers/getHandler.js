const getCountries = require('../../controllers/getCountries');

module.exports = async (req, res) => {

    const { name } = req.query;

    try {

        const allCountries = name

            ? await getCountries(name)

            : await getCountries();

        res.status(200).json(allCountries);

    } catch (error) {

        res.status(500).json({ error: error.message });

    };

};