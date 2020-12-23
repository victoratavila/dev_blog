const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dev_blog', 'root', 'Vi@k5e82w43', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    timezone: "-03:00"
  });

module.exports = sequelize;