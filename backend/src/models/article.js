const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../database/connection');
const category = require('./category');

const Article = connection.define('article', {

    article_title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    author: {
        type: DataTypes.STRING,
        allowNull: false
    },

    content: {
      type: DataTypes.STRING,
      allowNull: false
  },

  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

  });

Article.sync({ force: false });

module.exports = Article;