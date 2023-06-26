const notaModel = require('../models/Nota');
const HttpError = require('../../utils/http-error');
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const sequelize = require('../../database/config');
const tareaModel = require('../models/Tarea');

//cargar todas las notas asociadas a una tarea.
const cargarNotas = async (req, res, next) => {
    try {
        const notas = await notaModel.findAll({
            where: {
                'tarea_id': req.params.tarea_id
            }
        });
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: notas
        });

    } catch (error) {
        return next(new HttpError(error, 500));
    }
};

exports.cargarNotas = cargarNotas;