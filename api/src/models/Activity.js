const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('activity', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficult: {
            type: DataTypes.ENUM('1', '2', '3', '4', '5'),
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        season: {
            type: DataTypes.ENUM('Summer', 'Fall', 'Winter', 'Spring'),
            allowNull: false
        }
    },
        { timestamps: false }
    );
};