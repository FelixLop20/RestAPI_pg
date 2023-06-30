const estadoModel = require('../models/Estado');
const HttpError = require('../../utils/http-error');
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

//cargar los estados preinsertardos en la base de datos
const cargarEstados = async (req, res, next) => {

    let estados;
    try {
        estados = await estadoModel.findAll();
    } catch (error) {
        return next(new HttpError(error.message, 404));
    }
    res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        data: estados
    });
};

exports.cargarEstados = cargarEstados;