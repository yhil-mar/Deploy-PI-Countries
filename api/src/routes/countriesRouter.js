const { Router } = require('express');
const getHandler = require('../handlers/countriesHandlers/getHandler');
const getByIdHandler = require('../handlers/countriesHandlers/getByIdHandler');
const validateId = require('../middlewares/validateId');

const router = Router();

router.get('/', getHandler);

router.get('/:idPais', validateId, getByIdHandler);

module.exports = router;
