const { Country, Activity } = require('../db.js');

module.exports = async (id) => {

    const country = await Country.findByPk(id, {

        include: {
            model: Activity,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },

    });

    if (country !== null) return country;

    else return { message: 'ID no válido' };
    
};