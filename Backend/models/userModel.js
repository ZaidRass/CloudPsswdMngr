const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { encrypt, decrypt } = require('./encDecModel.js');
const uuid = require('uuid').v4;
require('dotenv').config();

const TABLE_NAME = 'Users';


// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const docClient = new AWS.DynamoDB.DocumentClient();

//
class User {
  static async generateAuthToken(userId) {
    const token = jwt.sign({ userId: userId }, process.env.SECRET_KEY, { expiresIn: '1h' });

    const params = {
      TableName: TABLE_NAME,
      Key: {
        userId: userId
      },
      UpdateExpression: 'SET #t = list_append(if_not_exists(#t, :empty_list), :token)',
      ExpressionAttributeNames: {
        '#t': 'tokens'
      },
      ExpressionAttributeValues: {
        ':token': [token],
        ':empty_list': []
      },
      ConditionExpression: 'attribute_exists(userId)'
    };

    try {
      await docClient.update(params).promise();
      return token;
    } catch (error) {
      console.error('Error updating tokens list:', error);
      throw error;
    }
  }

  static async addNewPassword(userId, userPass, iv, platform, platEmail) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        userId: userId
      },
      UpdateExpression: 'SET #p = list_append(if_not_exists(#p, :empty_list), :passwordObj)',
      ExpressionAttributeNames: {
        '#p': 'passwords'
      },
      ExpressionAttributeValues: {
        ':passwordObj': [{ password: userPass, platform: platform, platEmail: platEmail, iv: iv }],
        ':empty_list': []
      },
      ConditionExpression: 'attribute_exists(userId)'
    };

    try {
      await docClient.update(params).promise();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  static async getUserById(userId) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        userId: userId
      }
    };

    try {
      const data = await docClient.get(params).promise();
      return data.Item;
    } catch (err) {
      console.error('Error getting user from DynamoDB', err);
      throw err;
    }
  }

  static async getUserByEmail(email) {
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: 'email = :email',
      IndexName: 'email-index',
      ExpressionAttributeValues: {
        ':email': email
      }
    };
    try {
      const data = await docClient.query(params).promise();
      return data.Items[0];
    } catch (err) {
      return null;
    }
  }

  static async getUserByUsername(username) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        username: username
      }
    };

    try {
      const data = await docClient.get(params).promise();
      return data.Item;
    } catch (error) {
      console.error('Error getting user by username', error);
      throw error;
    }
  }

  static async createUser(username, password, email) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const params = {
      TableName: TABLE_NAME,
      Item: {
        userId: uuid(),
        email: email,
        username: username,
        salt: salt,
        platformPassword: hashedPassword,
        tokens: [],
        savedPasswords: []
      }
    };
    try {
      await docClient.put(params).promise();
    } catch (err) {
      console.error('Error adding user to DynamoDB', err);
      throw err;
    }
  }

  static async deleteUser(userId) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        userId: userId
      }
    };

    try {
      await docClient.delete(params).promise();
    } catch (err) {
      console.error('Error deleting user from DynamoDB', err);
      throw err;
    }
  }

  static async updateUserPassword(userId, password) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        userId: userId
      },
      UpdateExpression: 'SET #p = :password',
      ExpressionAttributeNames: {
        '#p': 'password'
      },
      ExpressionAttributeValues: {
        ':password': password
      }
    };

    try {
      await docClient.update(params).promise();
    } catch (err) {
      console.error('Error updating user in DynamoDB', err);
      throw err;
    }
  }

  static async updateUserEmail(userId, email) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        userId: userId
      },
      UpdateExpression: 'SET #e = :email',
      ExpressionAttributeNames: {
        '#e': 'email'
      },
      ExpressionAttributeValues: {
        ':email': email
      }
    };

    try {
      await docClient.update(params).promise();
    } catch (err) {
      console.error('Error updating user in DynamoDB', err);
      throw err;
    }
  }

  static async updateUserProfilePicture(userId, profilePicture) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        userId: userId
      },
      UpdateExpression: 'SET #p = :profilePicture',
      ExpressionAttributeNames: {
        '#p': 'profilePicture'
      },
      ExpressionAttributeValues: {
        ':profilePicture': profilePicture
      }
    };

    try {
      await docClient.update(params).promise();
    } catch (err) {
      console.error('Error updating user in DynamoDB', err);
      throw err;
    }
  }






  static async deleteProfile(userId) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        userId: userId
      }
    };

    try {
      await docClient.delete(params).promise();
    } catch (err) {
      console.error('Error deleting user from DynamoDB', err);
      throw err;
    }
  }
}

module.exports = User;
