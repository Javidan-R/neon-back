const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { generateQRCode, scanQRCode } = require('../utils/qrCodeUtils');
const userController = require('../controllers/user.controller'); 
router.get('/users', userController.getUsers);

router.get('/user/:id', userController.getUser);

router.post('/generate-qr/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const qrCode = generateQRCode(userId);
    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ error: 'Error generating QR code' });
  }
});

// Scan QR code and add bonus
router.post('/scan-qr', async (req, res) => {
  try {
    const { qrCode } = req.body;
    const userId = scanQRCode(qrCode);
    const user = await User.findByPk(userId);
    if (user) {
      user.bonus += 1;
      await user.save();
      res.json({ message: 'Bonus added successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error scanning QR code' });
  }
});

module.exports = router;
