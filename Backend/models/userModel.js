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
  static async deletePassword(user, passId) {
    try {
      const passwordIndex = user.savedPasswords.findIndex(password => password.passId === passId);
  
      if (passwordIndex === -1) {
        console.log('Password not found');
        return false;
      }
  
      const params = {
        TableName: TABLE_NAME,
        Key: {
          userId: user.userId
        },
        UpdateExpression: 'REMOVE #p[' + passwordIndex + ']',
        ExpressionAttributeNames: {
          '#p': 'savedPasswords'
        },
        ConditionExpression: 'attribute_exists(userId)',
      };
  
      await docClient.update(params).promise();
      console.log('Password deleted successfully');
      return true;
    } catch (err) {
      console.error('Error deleting password:', err);
      return false;
    }
  }
  
  static async addNewPassword(userId, platformpass, platform, platEmail) {
    
    
    let encryptedPassword = encrypt(platformpass);
    let passId = uuid();
    const params = {
      TableName: TABLE_NAME,
      Key: {
        userId: userId
      },
      UpdateExpression: 'SET #p = list_append(if_not_exists(#p, :empty_list), :passwordObj)',
      ExpressionAttributeNames: {
        '#p': 'savedPasswords'
      },
      ExpressionAttributeValues: {
        ':passwordObj': [{passId:passId, password: encryptedPassword, platform: platform, platEmail: platEmail}],
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
  static async addPlatformPassword(userId, platform, platformEmail, password) {
    try {
      const user = await this.getUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }
  
      let platPassId = uuid();
      let enc = encrypt(password);
      let iv = enc.iv;
      let encryptedPassword = enc.encryptedPassword;
  
      // Construct the saved password object
      let savedPassword = {
        platPassId,
        platform,
        platformEmail,
        iv,
        encryptedPassword
      };
  
      // Push the new saved password object to the savedPasswords array
      user.savedPasswords.push(savedPassword);
  
      // Construct an UpdateExpression to update the savedPasswords attribute
      const params = {
        TableName: TABLE_NAME,
        Key: {
          userId: userId,
        },
        UpdateExpression: 'SET #savedPasswords = :savedPasswords',
        ExpressionAttributeNames: {
          '#savedPasswords': 'savedPasswords' // Handle reserved keyword in ExpressionAttributeNames
        },
        ExpressionAttributeValues: {
          ':savedPasswords': user.savedPasswords, // Store the updated array directly
        },
      };
  
      await docClient.update(params).promise();
      console.log('Saved password added successfully');
    } catch (err) {
      console.error('Error adding saved password', err);
      throw err;
    }
  }
  static async updatePlatformEmail(user, passwordId, platEmail) {
    try {
      const passwordIndex = user.savedPasswords.findIndex(password => password.passId === passwordId);
  
      if (passwordIndex === -1) {
        console.log('Password not found');
        return false;
      }
  
      user.savedPasswords[passwordIndex].platEmail = platEmail;
  
      const params = {
        TableName: TABLE_NAME,
        Key: {
          userId: user.userId
        },
        UpdateExpression: 'SET #p = :savedPasswords',
        ExpressionAttributeNames: {
          '#p': 'savedPasswords'
        },
        ExpressionAttributeValues: {
          ':savedPasswords': user.savedPasswords
        },
        ConditionExpression: 'attribute_exists(userId)',
      };
  
      await docClient.update(params).promise();
      console.log('PlatEmail updated successfully');
      return true;
    } catch (err) {
      console.error('Error updating platEmail:', err);
      return false;
    }
  }
  
  static async updatePassword(user, passwordId, newPassword) {
    try {
      const passwordIndex = user.savedPasswords.findIndex(password => password.passId === passwordId);
  
      if (passwordIndex === -1) {
        console.log('Password not found');
        return false;
      }
  
      user.savedPasswords[passwordIndex].password = encrypt(newPassword).toString();
  
      const params = {
        TableName: TABLE_NAME,
        Key: {
          userId: user.userId
        },
        UpdateExpression: 'SET #p = :savedPasswords',
        ExpressionAttributeNames: {
          '#p': 'savedPasswords'
        },
        ExpressionAttributeValues: {
          ':savedPasswords': user.savedPasswords
        },
        ConditionExpression: 'attribute_exists(userId)',
      };
  
      await docClient.update(params).promise();
      console.log('Password updated successfully');
      return true;
    } catch (err) {
      console.error('Error updating password:', err);
      return false;
    }
  }
  
  static async updateCredentials(user, passwordId, platEmail, newPassword) {
    try {
      const passwordIndex = user.savedPasswords.findIndex(password => password.passId === passwordId);
  
      if (passwordIndex === -1) {
        console.log('Password not found');
        return false;
      }
  
      user.savedPasswords[passwordIndex].platEmail = platEmail;
      user.savedPasswords[passwordIndex].password = encrypt(newPassword).toString();
  
      const params = {
        TableName: TABLE_NAME,
        Key: {
          userId: user.userId
        },
        UpdateExpression: 'SET #p = :savedPasswords',
        ExpressionAttributeNames: {
          '#p': 'savedPasswords'
        },
        ExpressionAttributeValues: {
          ':savedPasswords': user.savedPasswords
        },
        ConditionExpression: 'attribute_exists(userId)',
      };
  
      await docClient.update(params).promise();
      console.log('Credentials updated successfully');
      return true;
    } catch (err) {
      console.error('Error updating credentials:', err);
      return false;
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

  static async updateUsername(userId, username) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        userId: userId
      },
      UpdateExpression: 'SET #u = :username',
      ExpressionAttributeNames: {
        '#u': 'username'
      },
      ExpressionAttributeValues: {
        ':username': username
      }
    };
  
    try {
      await docClient.update(params).promise();
      console.log("Username updated successfully");
    } catch (error) {
      console.error("Unable to update username. Error:", error);
      throw error;
    }
  }
  

  static async updateEmail(userId, email) {
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
      console.log("Email updated successfully");
    } catch (error) {
      console.error("Unable to update email. Error:", error);
      throw error;
    }
  }
  

  static async updatePassword(userId, password) {
    const salt = await bcrypt.genSalt(10);
    console.log("Updating password");
    const hashedPassword = await bcrypt.hash(password, salt);

    const params = {
      TableName: TABLE_NAME,
      Key: {
        userId: userId
      },
      UpdateExpression: 'SET #p = :platformPassword, #s = :salt',
      ExpressionAttributeNames: {
        '#p': 'platformPassword',
        '#s': 'salt'
      },
      ExpressionAttributeValues: {
        ':platformPassword': hashedPassword,
        ':salt': salt
      }
    };
  
    try {
      await docClient.update(params).promise();
      console.log("Password updated successfully");
    } catch (error) {
      console.error("Unable to update password. Error:", error);
      throw error;
    }
  }
  


}


module.exports = User;
