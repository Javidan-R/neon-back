const express = require('express');
const QRCode = require('qrcode');
const Bonus = require('../../models/bonus.model');
const router = express.Router();

router.post('/bonus/:code/qr', async (req, res) => {
  try {
    const bonusCode = req.params.code;
    const bonus = await Bonus.findOne({ where: { code: bonusCode } });

    if (!bonus) {
      return res.status(404).json({ message: 'Bonus not found' });
    }

    QRCode.toDataURL(bonusCode, (err, url) => {
      if (err) {
        return res.status(500).json({ message: 'Error generating QR code' });
      }
      res.json({ qrCode: url });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
