const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../database/connection');

const Category = connection.define('category', {

    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });

Category.sync({ force: false });

module.exports = Category;