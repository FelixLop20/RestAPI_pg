const express = require('express');
const router = express.Router();
const notaController = require('../controllers/nota.controller');

router.get('/notas/:tarea_id', notaController.cargarNotas);

module.exports = router;