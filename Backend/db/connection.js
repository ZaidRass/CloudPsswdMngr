const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const bcrypt = require('bcryptjs');
require('dotenv').config();


AWS.config.update({
    "region": process.env.AWS_REGION,
    "endpoint": process.env.AWS_ENDPOINT,
    "accessKeyId": process.env.ACCESS_KEY_ID,
    "secretAccessKey": process.env.SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

// Function to get all passwords from DynamoDB
async function getPasswords() {
  const params = {
    TableName: 'Passwords'
  };

  try {
    const data = await dynamodb.scan(params).promise();
    return data.Items;
  } catch (err) {
    console.error('Error getting passwords from DynamoDB', err);
    throw err;
  }
}

// Function to add a new password to DynamoDB
async function addPassword(password) {
  const params = {
    TableName: 'Passwords',
    Item: {
      'passId': {s:uuid()},
      'username': {S: password.username},
      'password': {S: password.password},
      'userId' : {S: password.userId}
    }
  };

  try {
    await dynamodb.putItem(params).promise();
  } catch (err) {
    console.error('Error adding password to DynamoDB', err);
    throw err;
  }
}

// Function to update a password in DynamoDB
async function updatePassword(id, password) {
  const params = {
    TableName: 'Passwords',
    Key: {
      'passId': {S: id}
    },
    UpdateExpression: 'SET #p = :password',
    ExpressionAttributeNames: {
      '#p': 'password'
    },
    ExpressionAttributeValues: {
      ':password': {S: password}
    }
  };

  try {
    await dynamodb.updateItem(params).promise();
  } catch (err) {
    console.error('Error updating password in DynamoDB', err);
    throw err;
  }
}

// Function to delete a password from DynamoDB
async function deletePassword(id) {
  const params = {
    TableName: 'Passwords',
    Key: {
      'passId': {S: id}
    }
  };

  try {
    await dynamodb.deleteItem(params).promise();
  } catch (err) {
    console.error('Error deleting password from DynamoDB', err);
    throw err;
  }
}




module.exports = {
  dynamodb,
  getPasswords,
  addPassword,
  updatePassword,
  deletePassword
  // updateUserProfilePicture
};