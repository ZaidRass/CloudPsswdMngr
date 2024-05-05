const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const bcrypt = require('bcryptjs');


let awsConfig = {
    "region": "eu-north-1",
    "endpoint": "http://dynamodb.eu-north-1.amazonaws.com",
    "accessKeyId": "AKIA5FTZE6U33M6P63X2", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let dynamodb = new AWS.DynamoDB.DocumentClient();

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
//*------------------------- User Functions--------------------------------*//
// Create User Function
async function createUser(user)
{
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  const params = {
    TableName: 'Users',
    Item: {
      'userID': {S: uuid()},
      'username': {S: user.username},
      'password': {S: hashedPassword},
      'email' : {S: user.email}
    }
  };
  try {

    await dynamodb.putItem(params).promise();
  } catch (err) {
    console.error('Error adding user to DynamoDB', err);
    throw err;
  }
}
//Get User Function
async function getUser(userId){
  const params = {
    TableName: 'Users',
    Key: {
      'userId': {S: userId}
    }
  };

  try {
    const data = await dynamodb.getItem(params).promise();
    return data.Item;
  } catch (err) {
    console.error('Error getting user from DynamoDB', err);
    throw err;
  }

}
//Delete User Function
async function deleteUser(userId){
  const params = {
    TableName: 'Users',
    Key: {
      'userId': {S: userId}
    }
  };

  try {
    await dynamodb.deleteItem(params).promise();
  } catch (err) {
    console.error('Error deleting user from DynamoDB', err);
    throw err;
  }
}

//Update User Function
async function updateUserPassword(userId, user){
  const params = {
    TableName: 'Users',
    Key: {
      'userId': {S: userId}
    },
    UpdateExpression: 'SET #p = :password',
    ExpressionAttributeNames: {
      '#p': 'password'
    },
    ExpressionAttributeValues: {
      ':password': {S: user.password}
    }
  };

  try {
    await dynamodb.updateItem(params).promise();
  } catch (err) {
    console.error('Error updating user in DynamoDB', err);
    throw err;
  }
}
async function updateUserEmail(userId, user){
  const params = {
    TableName: 'Users',
    Key: {
      'userId': {S: userId}
    },
    UpdateExpression: 'SET #e = :email',
    ExpressionAttributeNames: {
      '#e': 'email'
    },
    ExpressionAttributeValues: {
      ':email': {S: user.email}
    }
  };

  try {
    await dynamodb.updateItem(params).promise();
  } catch (err) {
    console.error('Error updating user in DynamoDB', err);
    throw err;
  }
}

//update User profile picture
// async function updateUserProfilePicture(userId, user){
//   const params = {
//     TableName: 'Users',
//     Key: {
//       'userId': {S: userId}
//     },
//     UpdateExpression: 'SET #p = :profilePicture',
//     ExpressionAttributeNames: {
//       '#p': 'profilePicture'
//     },
//     ExpressionAttributeValues: {
//       ':profilePicture': {S: user.profilePicture}
//     }
//   };

//   try {
//     await dynamodb.updateItem(params).promise();
//   } catch (err) {
//     console.error('Error updating user in DynamoDB', err);
//     throw err;
//   }
// }

module.exports = {
  getPasswords,
  addPassword,
  updatePassword,
  deletePassword,
  createUser,
  getUser,
  deleteUser,
  updateUserPassword,
  updateUserEmail,
  // updateUserProfilePicture
};
