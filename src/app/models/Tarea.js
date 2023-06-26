const { DataTypes } = require('sequelize');
const sequelize = require('../../database/config');
const Nota = require('./Nota');

const Tarea = sequelize.define('tarea', {
    //Atribitos
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        allowNull: false,
        type: DataTypes.STRING(255),
    },
    colab_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: 'colaborador',
            key: 'id'
        }
    },
    estado: {
        allowNull: false,
        type: DataTypes.INTEGER,
        comment: 'Estado de la tarea (1: Pendiente, 2: En proceso, 3: Finalizada)',
        defaultValue: 1
    },
    prioridad: {
        allowNull: false,
        type: DataTypes.INTEGER,
        comment: 'Prioridad de la tarea (1: Alta, 2: Media, 3: Baja)'
    },
    fecha_inicio: {
        allowNull: false,
        type: DataTypes.DATE
    },
    fecha_fin: {
        allowNull: false,
        type: DataTypes.DATE
    }
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'tarea'
});

Tarea.hasMany(Nota, {
    foreignKey: 'tarea_id',
    sourceKey: 'id'
});

Nota.belongsTo(Tarea, {
    foreignKey: 'tarea_id',
    targetKey: 'id'
});

module.exports = Tarea;