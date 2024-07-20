const QRCode = require('qrcode');

const generateQRCode = async (data) => {
  try {
    const qrCode = await QRCode.toDataURL(data);
    return qrCode;
  } catch (err) {
    throw new Error('Error generating QR code');
  }
};

const scanQRCode = (qrCode) => {
  // Implement QR code scanning logic, decoding it to get the user ID
  // For now, we assume the QR code directly contains the user ID
  return qrCode;
};

module.exports = { generateQRCode, scanQRCode };
