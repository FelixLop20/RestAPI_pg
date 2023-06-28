const { DataTypes } = require('sequelize');
const sequelize = require('../../database/config');

const Tarea = sequelize.define('tarea', {
    //Atribitos
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        allowNull: true,
        type: DataTypes.STRING(255),
    },
    colab_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'colaborador',
            key: 'id'
        }
    },
    estado_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'estado',
            key: 'id'
        },
        comment: 'Estado de la tarea (1: Pendiente, 2: En proceso, 3: Finalizada)',
    },
    prioridad_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'prioridad',
            key: 'id'
        },
        comment: 'Prioridad de la tarea (1: Alta, 2: Media, 3: Baja)'
    },
    fecha_inicio: {
        allowNull: false,
        type: DataTypes.DATE
    },
    fecha_fin: {
        allowNull: false,
        type: DataTypes.DATE
    },
    notas: {
        allowNull: true,
        type: DataTypes.STRING(255)
    }
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'tarea'
});

module.exports = Tarea;