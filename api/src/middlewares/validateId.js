const paramsFixer = require('../helpers/paramsFixer');

module.exports = (req, res, next) => {

    const { idPais } = req.params;

    req.params = { ...req.params, idPais: paramsFixer(idPais, 2) };

    next();
    
};