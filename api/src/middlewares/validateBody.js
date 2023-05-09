const paramsFixer = require('../helpers/paramsFixer');

module.exports = async (req, res, next) => {
    const { name, difficult, duration, season, countries } = req.body;

    if (!name || !season || !duration || !season || !countries.length)
        return res.status(400).json({ error: 'Error en la validación, falta información' });

    if (!['1', '2', '3', '4', '5'].includes(difficult))
        return res.status(400).json({ error: 'Error en la validación, dificultad no válida' });

    if (!['Summer', 'Fall', 'Winter', 'Spring'].includes(paramsFixer(season, 1)))
        return res.status(400).json({ error: 'Error en la validación, estación no válida' });

    req.body = {
        ...req.body,
        name: paramsFixer(name, 1),
        season: paramsFixer(season, 1),
        countries: paramsFixer(countries, 3),
    };

    next();
    
};
