const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estado.controller');

router.get('/estados', estadoController.cargarEstados);

module.exports = router;