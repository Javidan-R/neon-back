const QRCode = require('qrcode');
const sequelize = require('../config/db.config');
const Bonus = require('../models/bonus.model');
const User = require('../models/user.model');

exports.generateQRCode = async (req, res) => {
  try {
    const { code } = req.body;
    const qrCode = await QRCode.toDataURL(code);
    res.json({ qrCode });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Error generating QR code' });
  }
};

exports.scanQRCode = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { qrCode } = req.body;
    const userId = qrCode.replace('UserID:', ''); 
    const user = await User.findByPk(userId, { transaction });
    if (user) {
      await User.update(
        { bonus: sequelize.literal(`bonus + 1`) }, 
        { where: { id: userId }, transaction }
      );
      await transaction.commit();
      res.json({ message: 'Bonus added successfully' });
    } else {
      await transaction.rollback();
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    await transaction.rollback();
    console.error('Error scanning QR code:', error);
    res.status(500).json({ error: 'Error scanning QR code' });
  }
};


exports.scanQRCode = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { qrCode } = req.body;
    const userId = qrCode.replace('UserID:', ''); 
    const user = await User.findByPk(userId, { transaction });
    if (user) {
      await User.update(
        { bonus: sequelize.literal(`bonus + 5`) }, 
        { where: { id: userId }, transaction }
      );
      await transaction.commit();
      res.json({ message: 'Bonus added successfully' });
    } else {
      await transaction.rollback();
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    await transaction.rollback();
    console.error('Error scanning QR code:', error);
    res.status(500).json({ error: 'Error scanning QR code' });
  }
};


