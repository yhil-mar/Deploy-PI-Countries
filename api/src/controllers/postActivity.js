const { Activity } = require('../db.js');

module.exports = async (name, difficult, duration, season, countries) => {

    const newActivity = await Activity.findOrCreate({

        where: { name: name },

        defaults: {
            difficult: difficult,
            duration: duration,
            season: season,
        },
        
    });

    newActivity[1] && await newActivity[0].addCountries(countries);   // Agrega los países ingresados a la actividad a postear si la actividad no existe

    return newActivity;

};