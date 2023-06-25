const colaboradorModel = require('../models/Colaborador');
const HttpError = require('../../utils/http-error');
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const cargarColaboradores = async (req, res, next) => {

    let colaboradores;

    try {
        colaboradores = await colaboradorModel.findAll();
    } catch (error) {
        return next(new HttpError(error, 500));
    }
    res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        data: colaboradores
    });
};

exports.cargarColaboradores = cargarColaboradores;



