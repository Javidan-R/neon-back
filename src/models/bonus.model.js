const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Bonus = sequelize.define('Bonus', {
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  used: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Bonus;
