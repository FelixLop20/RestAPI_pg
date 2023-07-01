require('dotenv').config();
const HttpError = require('./utils/http-error');
const sequelize = require('./database/config');
const express = require('express');
const cors = require('cors');

const colaboradorRouter = require('./app/routes/colaborador.router');
const tareaRouter = require('./app/routes/tarea.router');
const estadoRouter = require('./app/routes/estado.router');
const prioridadRouter = require('./app/routes/prioridad.router');

const app = express();

app.use(cors());
app.use(express.json());

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//routes
app.get('/', (req, res) => {
    res.send('App is runnig now');
});

//rutas de los endpoints
app.use('/api/colaborador', colaboradorRouter);
app.use('/api/tarea', tareaRouter);
app.use('/api/estado', estadoRouter);
app.use('/api/prioridad', prioridadRouter);

//controlar si una url no existe
app.use((req, res) => {
    const error = new HttpError("No se puede econtrar la ruta", 404);
    throw error;
});

//middlware manejo de erroes
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        status: error.status,
        message: error.message || 'Internal Server Error',
        code : error.code
    });
});

const port = process.env.APP_PORT;

//
app.listen(port, async () => {
    await sequelize.sync({ alter: true });
    console.log(`App listening on port ${port}`);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});