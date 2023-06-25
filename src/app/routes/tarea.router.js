const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tarea.controller');

router.get('/tareas', tareaController.cargarTareas);

module.exports = router;