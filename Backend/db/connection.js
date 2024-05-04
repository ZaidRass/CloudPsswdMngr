const AWS = require('aws-sdk');

// Create DynamoDB service object
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Function to get all passwords from DynamoDB
async function getPasswords() {
  const params = {
    TableName: 'your-table-name'
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
    TableName: 'your-table-name',
    Item: {
      'id': {S: password.id},
      'username': {S: password.username},
      'password': {S: password.password}
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
    TableName: 'your-table-name',
    Key: {
      'id': {S: id}
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
    TableName: 'your-table-name',
    Key: {
      'id': {S: id}
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
  getPasswords,
  addPassword,
  updatePassword,
  deletePassword
};
