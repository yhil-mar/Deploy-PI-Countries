const { Country } = require('../db.js');
const { Op } = require('sequelize');
const paramsFixer = require('../helpers/paramsFixer');


module.exports = async (req, res, next) => {

    try {

        const { countries } = req.body;

        const findCountries = await Country.findAll({

            where: {
                id: {
                    [Op.in]: paramsFixer(countries, 3),
                },
            },

        });

        if (findCountries.length !== countries.length) {

            return res.status(400).json({ error: 'Error en la validación, países ingresados no válidos' });

        } else next();

    } catch (error) {

        res.status(500).json({ error: error.message });

    };

};