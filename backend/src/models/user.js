const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../database/connection');

const User = connection.define('user', {

    username: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }

  });

User.sync({ force: false });

module.exports = User;