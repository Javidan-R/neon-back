const Bonus = require('../models/bonus.model');
const User = require('../models/user.model');
const QRCode = require('qrcode');

exports.generateQRCode = async (req, res) => {
  try {
    const { code } = req.body;
    const qrCode = await QRCode.toDataURL(code);
    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ error: 'Error generating QR code' });
  }
};

exports.addBonus = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findByPk(userId);
    if (user) {
      user.bonus += 1;
      await user.save();
      res.json({ message: 'Bonus added successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error adding bonus' });
  }
};
