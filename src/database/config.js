require('dotenv').config();

const { Sequelize } = require('sequelize');

//parametros de conexion
const database = process.env.DATABASE;
const username = process.env.USER;
const password = process.env.PASSWORD;

module.exports = new Sequelize(
    database,
    username,
    password,
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);
