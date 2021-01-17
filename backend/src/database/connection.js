const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dev_blog', 'root', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    timezone: "-03:00"
  });

module.exports = sequelize;
