const { Router } = require('express');

// Importación de los routers

const countriesRouter = require('./countriesRouter');
const activitiesRouter = require('./activitiesRouter');

const router = Router();

// Configuración de los routers

router.use('/countries', countriesRouter);
router.use('/activities', activitiesRouter);

module.exports = router;
