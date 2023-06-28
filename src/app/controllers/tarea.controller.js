const tareaModel = require('../models/Tarea');
const HttpError = require('../../utils/http-error');
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const colaboradorModel = require('../models/Colaborador');
const estadoModel = require('../models/Estado');
const prioridadModel = require('../models/Prioridad');
const sequelize = require('../../database/config');
const { Op } = require('sequelize');

//metodo que carga los atributos de las tareas, para evitar la repeticion de codigo.
const atributosTarea = () => {
    return [
        'id',
        'descripcion',
        [sequelize.fn('DATE', sequelize.col('fecha_inicio')), 'fecha_inicio'],
        [sequelize.fn('DATE', sequelize.col('fecha_fin')), 'fecha_fin'],
        'notas'
    ]
};

const includes = () => {
    return [
        {
            model: colaboradorModel,
            attributes: ['id', 'nombre'],
            required: false
        },
        {
            model: estadoModel,
            attributes: ['id', 'descripcion'],
            required: false
        },
        {
            model: prioridadModel,
            attributes: ['id', 'descripcion'],
            required: false
        },
    ]
}

//obtener datos para editar y agregar tareas
const datosTareas = (req) => {
    return {
        descripcion: req.body.descripcion,
        colab_id: req.body.colab_id,
        estado_id: req.body.estado_id,
        prioridad_id: req.body.prioridad_id,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        notas: req.body.notas
    };
};


//cargar todas la tareas de la basde de datos
const cargarTareas = async (req, res, next) => {
    try {
        const tareas = await tareaModel.findAll({
            //atributos de la tarea
            attributes:
                atributosTarea(),
            order: [['fecha_inicio', 'ASC']],
            include: includes(),
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

const cargarTareaPorId = async (req, res, next) => {
    try {
        const id = req.params.tarea_id;

        const tarea = await tareaModel.findByPk(id, {
            attributes: atributosTarea(),
            include: includes(),
        });

        if (!tarea) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Tarea no encontrada",
            });
        }

        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: tarea,
        });
    } catch (error) {
        return next(new HttpError(error, 500));
    }
};


//crear una nueva tarea
const crearTarea = async (req, res, next) => {
    try {
        const nuevaTarea = await tareaModel.create(datosTareas(req));
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
        const eTarea = await tareaModel.update(datosTareas(req), {
            where: {
                'id': tarea_id,
                'estado_id': {
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
};


//eliminar tareas si unicamente estas se ecuentran en estado != En proceso
const eliminarTarea = async (req, res, next) => {
    try {
        const tarea_id = req.params.tarea_id;
        const elimTarea = await tareaModel.destroy({
            where: {
                'id': tarea_id,
                'estado_id': {
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
};


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

//filtro de busqueda de tareas, por colaborador, prioridad, estado, rango de fechas
const filtroTareas = async (req, res, next) => {

    try {
        const whereCondition = {
            'colab_id': req.body.colab_id || { [Op.ne]: null },
            'estado_id': req.body.estado || { [Op.ne]: null },
            'prioridad_id': req.body.prioridad || { [Op.ne]: null }
        };

        if (req.body.fecha_inicio || req.body.fecha_fin) {
            whereCondition[Op.or] = [
                { 'fecha_inicio': req.body.fecha_inicio, 'fecha_fin': req.body.fecha_fin },
                { 'fecha_inicio': null, 'fecha_fin': null }
            ];
        }
        const tareas = await tareaModel.findAll({
            attributes: atributosTarea(),
            order: [['fecha_inicio', 'ASC']],
            include:atributosTarea(),
            where: whereCondition
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

exports.cargarTareas = cargarTareas;
exports.crearTareas = crearTarea;
exports.editarTarea = editarTarea;
exports.eliminarTarea = eliminarTarea;
exports.cambiarEstadoTarea = cambiarEstadoTarea;
exports.filtroTareas = filtroTareas;
exports.cargarTareaPorId = cargarTareaPorId;
