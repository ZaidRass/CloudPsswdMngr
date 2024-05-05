const CryptoJS = require('crypto-js');
require('dotenv').config();

const encrypt = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(data, process.env.CRYPTO_SECRET_KEY).toString();
  return encryptedData;
};

const decrypt = (encryptedData) => {
  try {
    console.log('encryptedData:', encryptedData);
    // Decrypt data using AES decryption with the provided secret key
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, process.env.CRYPTO_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decryptedData;
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
};
module.exports = { encrypt, decrypt };
