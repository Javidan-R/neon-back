const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
