const { DataTypes } = require('sequelize');
const sequelize = require('../../database/config');

const Nota = sequelize.define('nota', {
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        allowNull: false,
        type: DataTypes.STRING(255)
    },
    tarea_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
       /* references: {
            model: 'tarea',
            key: 'id'
        }*/
    }
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'nota'
});

module.exports = Nota;