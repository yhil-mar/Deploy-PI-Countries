const { Op } = require('sequelize');

module.exports = (query) => {
    if (query) {
        query = {
            name: {
                [Op.iLike]: `%${query}%`
            },
        };
    };
    return query;
};