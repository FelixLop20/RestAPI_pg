const tareaModel = require('../models/Tarea');
const HttpError = require('../../utils/http-error');
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const colaboradorModel = require('../models/Colaborador');
const notaModel = require('../models/Nota');

const cargarTareas = async (req, res, next) => {

    let tareas;

    try {
        tareas = await tareaModel.findAll(
            {
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
    } catch (error) {
        return next(new HttpError(error, 500));
    }
    res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        data: tareas
    });
};

exports.cargarTareas = cargarTareas;
