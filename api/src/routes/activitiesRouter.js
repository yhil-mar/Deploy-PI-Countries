const { Router } = require('express');
const getHandler = require('../handlers/activitiesHandlers/getHandler');
const postHandler = require('../handlers/activitiesHandlers/postHandler');
const validateBody = require('../middlewares/validateBody');
const validateCountries = require('../middlewares/validateCountries');

const router = Router();

router.post('/', validateBody, validateCountries, postHandler);

router.get('/', getHandler);

module.exports = router;
