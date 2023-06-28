const { DataTypes } = require('sequelize');
const sequelize = require('../../database/config');
const Tarea = require('./Tarea');

const Prioridad = sequelize.define('prioridad', {
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
    tableName: 'prioridad'
});

//relaciones de tablas
Prioridad.hasMany(Tarea, {
    foreignKey: 'prioridad_id',
    sourceKey: 'id'
});

Tarea.belongsTo(Prioridad, {
    foreignKey: 'prioridad_id',
    targetKey: 'id'
});

module.exports = Prioridad;
