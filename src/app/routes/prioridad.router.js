const express = require('express');
const router = express.Router();
const prioridadController = require('../controllers/prioridad.controller');

router.get('/prioridades', prioridadController.cargarPrioridades);

module.exports = router;