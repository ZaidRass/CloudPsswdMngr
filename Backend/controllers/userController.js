const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { decrypt } = require("../models/encDecModel");
require("dotenv").config();
const { Readable } = require('stream')

const userController = {
  register: async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "Invalid Credentials" });
    } else {
      if (password === confirmPassword) {
        try {
          const existingUser = await User.getUserByEmail(email);

          if (existingUser) {
            return res.status(400).json({ error: "Email already exists." });
          } else {
            await User.createUser(username, password, email);
          }
          return res
            .status(201)
            .json({ message: "User created successfully." });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        return res.status(400).json({ error: "Passwords do not match." });
      }
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in all fields." });
    }

    try {
      const user = await User.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ error: "Invalid Email." });
      }
      const isMatch = await bcrypt.compare(password, user.platformPassword);
      if (isMatch) {
        const token = await User.generateAuthToken(user.userId);

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 2592000000),
          httpOnly: true,
        });

        return res
          .status(200)
          .json({ message: "User logged in successfully." });
      } else {
        return res.status(400).json({ error: "Invalid Password." });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  authenticate: async (req, res) => {
    return res.status(200).send(req.rootUser);
  },

  getProfile: async (req, res) => {
    try {
      const user = req.rootUser;
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  addNewPassword: async (req, res) => {
    try {
      const userId = req.userId;
      const { platform, platformEmail, password } = req.body;
      await User.addNewPassword(userId, password, platform, platformEmail);
      return res.status(200).json({ message: "Password added successfully." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deletePlatformPassword: async (req, res) => {
    try {
      const user = req.rootUser;
      const { passwordId } = req.params;
      await User.deletePassword(user, passwordId);
      return res
        .status(200)
        .json({ message: "Platform passwords deleted successfully." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateCredentials: async (req, res) => {
    try {
      const user = req.rootUser;
      const { passwordId } = req.params;
      const { platformEmail, platform, password } = req.body;
      await User.updateCredentials(user, passwordId, platform, platformEmail, password);
      return res
        .status(200)
        .json({ message: "Credentials updated successfully." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  decrypt: async (req, res) => {
    try {
      const { encryptedData } = req.body;
      var dec = decrypt(encryptedData).toString();

      console.log(dec);
      return res.status(200).send(dec);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getPasswords: async (req, res) => {
    try {
      const user = req.rootUser;
      const decryptedPasswords = user.savedPasswords.map((passwordObj) => ({
        ...passwordObj,
        password: decrypt(passwordObj.password),
      }));
      return res.status(200).json(decryptedPasswords);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  removeProfile: async (req, res) => {
    try {
      const user = req.rootUser;
      await User.deleteUser(user.userId);
      return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateUsername: async (req, res) => {
    try {
      const user = req.rootUser;
      const { username } = req.body;
      await User.updateUsername(user.userId, username);
      return res
        .status(200)
        .json({ message: "Username updated successfully." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateEmail: async (req, res) => {
    try {
      const user = req.rootUser;
      const { email } = req.body;
      await User.updateEmail(user.userId, email);
      return res.status(200).json({ message: "Email updated successfully." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updatePassword: async (req, res) => {
    try {
      const userId = req.userId;
      const { password, confirm_password } = req.body;
      if (password === confirm_password) {
        await User.updatePassword(userId, password);
        return res
          .status(200)
          .json({ message: "Password updated successfully." });
      } else {
        return res.status(400).json({ error: "Passwords do not match." });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("jwtoken", { path: "/" });

      return res.status(200).json({ message: "User logged out successfully." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  uploadProfilePicture: async (req, res) => {
    const user = req.rootUser;
    console.log(req.file);
    const fileStream = Readable.from(req.file.buffer);
    
    try {
      const imageUrl = await User.uploadUserPic(user.userId, fileStream);
      return res.status(200).json({ message: "Profile picture uploaded successfully.", imageUrl });
    } catch(error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
};

module.exports = userController;
