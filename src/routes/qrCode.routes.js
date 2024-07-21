
const express = require('express');
const router = express.Router();
const qrCodeController = require('../controllers/qrCode.controller');

router.post('/generate-qr', qrCodeController.generateQRCode);
router.post('/scan-qr', qrCodeController.scanQRCode);

module.exports = router;