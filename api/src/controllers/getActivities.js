const { Country, Activity } = require('../db.js');

module.exports = async () => {

    const activities = await Activity.findAll({
        include: {
            model: Country,
            attributes: ['id'],
            through: {
                attributes: [],
            },
        },
    });

    if (activities.length) return activities;

    else return { message: 'No hay actividades registradas' };

};