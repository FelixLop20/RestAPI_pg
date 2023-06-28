const prioridadModel = require('../models/Prioridad');
const HttpError = require('../../utils/http-error');
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

//cargar los estados preinsertardos en la base de datos
const cargarPrioridades = async (req, res, next) => {

    let estados;
    try {
        estados = await prioridadModel.findAll();
    } catch (error) {
        return next(new HttpError(error, 500));
    }
    res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        data: estados
    });
};

exports.cargarPrioridades = cargarPrioridades;