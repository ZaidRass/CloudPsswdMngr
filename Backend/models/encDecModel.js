const crypto = require('crypto');
const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;
const CryptoJS = require('crypto-js');
require('dotenv').config();

const TABLE_NAME = "Passwords";
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});
const docClient = new AWS.DynamoDB.DocumentClient();


const encrypt= (data) =>{
  // Encrypt data using AES encryption with the provided secret key
  const encryptedData = CryptoJS.AES.encrypt(data, process.env.CRYPTO_SECRET_KEY).toString();
  return encryptedData;
}

const decrypt = (encryptedData) => {
  try {
    console.log('encryptedData:', encryptedData)
    // Decrypt data using AES decryption with the provided secret key
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, process.env.CRYPTO_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decryptedData;
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null; // Return null or handle the error as appropriate
  }
}
module.exports = { encrypt, decrypt };
