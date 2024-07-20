// config/db.config.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('neon', 'postgres', '2121', {
  host: 'localhost',
  dialect: 'postgres',
   logging: false, 
});

module.exports = sequelize;
