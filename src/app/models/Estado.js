const { DataTypes } = require('sequelize');
const sequelize = require('../../database/config');
const Tarea = require('./Tarea');

const Estado = sequelize.define('estado', {
    //Atributos
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        allowNull: false,
        type: DataTypes.STRING(15)
    }
}, {
    //configuraciones de la tabla
    timestamps: false,
    freezeTableName: true,
    tableName: 'estado'
});

//relaciones de tablas
Estado.hasMany(Tarea, {
    foreignKey: 'estado_id',
    sourceKey: 'id'
});

Tarea.belongsTo(Estado, {
    foreignKey: 'estado_id',
    targetKey: 'id'
});

module.exports = Estado;

