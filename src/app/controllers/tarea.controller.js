const tareaModel = require('../models/Tarea');
const HttpError = require('../../utils/http-error');
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const colaboradorModel = require('../models/Colaborador');
const notaModel = require('../models/Nota');
const sequelize = require('../../database/config');
const { Op } = require('sequelize');


//cargar todas la tareas de la basde de datos
const cargarTareas = async (req, res, next) => {
    try {
        const tareas = await tareaModel.findAll({
            //atributos de la tarea
            attributes: [
                'id',
                'descripcion',
                [sequelize.literal("CASE estado WHEN 1 THEN 'Pendiente' WHEN 2 THEN 'En proceso' WHEN 3 THEN 'Finalizada' END"), 'Estado'],
                [sequelize.literal("CASE prioridad WHEN 1 THEN 'Alta' WHEN 2 THEN 'Media' WHEN 3 THEN 'Baja' END"), 'Prioridad'],
                'fecha_inicio',
                'fecha_fin'
            ], order: [['fecha_inicio', 'ASC']],
            include: [
                {
                    model: colaboradorModel,
                    attributes: ['nombre'],
                    required: false
                },
                {
                    model: notaModel,
                    attributes: ['descripcion'],
                    required: false
                }
            ]
        });
        //respuesta del servidor
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: tareas
        });
    } catch (error) {
        //error
        return next(new HttpError(error, 500));
    }
};

//crear una nueva tarea
const crearTarea = async (req, res, next) => {
    try {
        const nuevaTarea = await tareaModel.create({
            descripcion: req.body.descripcion,
            colab_id: req.body.colab_id,
            estado: req.body.estado,
            prioridad: req.body.prioridad,
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin
        });

        res.status(StatusCodes.OK).json({
            message: 'Nueva tarea creada',
            data: nuevaTarea
        });

    } catch (error) {
        return next(new HttpError(error, 500));
    }
};

//editar las tareas que se encuentren unicamente en estado = Pendientes o en Proceso
const editarTarea = async (req, res, next) => {
    try {
        const tarea_id = req.params.tarea_id;
        const eTarea = await tareaModel.update({
            descripcion: req.body.descripcion,
            colab_id: req.body.colab_id,
            estado: req.body.estado,
            prioridad: req.body.prioridad,
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin
        }, {
            where: {
                'id': tarea_id,
                'estado': {
                    [Op.ne]: 3
                }
            }
        });

        res.status(eTarea > 0 ? StatusCodes.OK : StatusCodes.BAD_REQUEST.OK).json({
            message: eTarea > 0 ? '¡Tarea Editada!' : 'No es posible editar esta tarea'
        });

    } catch (error) {
        return next(new HttpError(error, 500));
    }
}


//eliminar tareas si unicamente estas se ecuentran en estado != En proceso
const eliminarTarea = async (req, res, next) => {
    try {
        const tarea_id = req.params.tarea_id;
        const elimTarea = await tareaModel.destroy({
            where: {
                'id': tarea_id,
                'estado': {
                    [Op.ne]: 2
                }
            }
        });
        res.status(elimTarea > 0 ? StatusCodes.OK : StatusCodes.BAD_REQUEST).json({
            message: elimTarea > 0 ? '¡Tarea Eliminada!' : 'No es posible eliminar  esta tarea'
        });
    } catch (error) {
        return next(new HttpError(error, 500));
    }
}


//cambiar el estado de la tarea, ya sea comenzar la tarea o finalizarla.
const cambiarEstadoTarea = async (req, res, next) => {
    try {
        const tarea_id = req.params.tarea_id;

        const tarea = await tareaModel.findByPk(tarea_id);
        const estadoTarea = tarea && tarea.estado !== 3 ? await tarea.update({ estado: req.body.estado }) : null;

        res.status(estadoTarea ? StatusCodes.OK : StatusCodes.BAD_REQUEST).json({
            message: estadoTarea ? '¡Estado Cambiado!' : 'No se pude cambiar el estado'
        });

    } catch (error) {
        return next(new HttpError(error, 500));
    }
}

exports.cargarTareas = cargarTareas;
exports.crearTareas = crearTarea;
exports.editarTarea = editarTarea;
exports.eliminarTarea = eliminarTarea;
exports.cambiarEstadoTarea = cambiarEstadoTarea;
