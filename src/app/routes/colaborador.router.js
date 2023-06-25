const express = require('express');
const router = express.Router();
const colaboradorController = require('../controllers/colaborador.controller');

router.get('/colaboradores', colaboradorController.cargarColaboradores);

module.exports = router;