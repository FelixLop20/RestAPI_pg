const { DataTypes } = require('sequelize');
const sequelize = require('../../database/config');
const Tarea = require('./Tarea');

const Colaborador = sequelize.define('colaborador', {
    //Atributos
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING(55)
    }
}, {
    //configuraciones de la tabla
    timestamps: false,
    freezeTableName: true,
    tableName: 'colaborador'
});

//relaciones de tablas
Colaborador.hasMany(Tarea, {
    foreignKey: 'colab_id',
    sourceKey: 'id'
});

Tarea.belongsTo(Colaborador, {
    foreignKey: 'colab_id',
    targetKey: 'id'
});

module.exports = Colaborador;

