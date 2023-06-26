const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tarea.controller');

router.get('/tareas', tareaController.cargarTareas);
router.post('/creartarea', tareaController.crearTareas);
router.put('/editartarea/:tarea_id', tareaController.editarTarea);
router.delete('/eliminartarea/:tarea_id', tareaController.eliminarTarea);
router.put('/estado/:tarea_id', tareaController.cambiarEstadoTarea);

module.exports = router;