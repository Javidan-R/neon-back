const express = require('express');
const router = express.Router();
const { generateQRCodeForUser } = require('../controllers/qrCodeController');

router.post('/generate-qr/:id', async (req, res) => {
  try {
    const qrCode = await generateQRCodeForUser(req.params.id);
    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ message: 'Error generating QR code' });
  }
});

router.post('/scan-qr', async (req, res) => {
  try {
    const { qrCode } = req.body;
    const userId = qrCode; // Assuming QR code directly gives user ID for simplicity
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
