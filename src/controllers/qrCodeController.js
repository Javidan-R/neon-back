
const QRCode = require('qrcode');
const generateQRCodeForUser = async (userId) => {
  const qrCode = await QRCode.toDataURL(`UserID:${userId}`);
  return qrCode;
};

module.exports = { generateQRCodeForUser };
