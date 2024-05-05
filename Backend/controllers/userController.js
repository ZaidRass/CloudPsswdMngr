const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const authenticate = require('../middleware/authenticate');

const userController = {
  register: async (req, res) => {
    const { name, email, password, cpassword } = req.body;

    if (!name || !email || !password || !cpassword) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    } else {
      if (password === cpassword) {
        try {
          const existingUser = await User.getUserByEmail(email);

          if (existingUser) {
            return res.status(400).json({ error: 'Email already exists.' });
          } else {
            await User.createUser(name, password, email);
          }
          return res.status(201).json({ message: 'User created successfully.' });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      } else {
        return res.status(400).json({ error: 'Passwords do not match.' });
      }
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please fill in all fields.' });
    }

    try {
      const user = await User.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ error: 'Invalid Email.' });
      }
      const isMatch = await bcrypt.compare(password, user.platformPassword);
      if (isMatch) {
        const token = await User.generateAuthToken(user.userId);

        res.cookie('jwtoken', token, {
          expires: new Date(Date.now() + 2592000000),
          httpOnly: true
        });

        return res.status(200).json({ message: 'User logged in successfully.' });
      } else {
        return res.status(400).json({ error: 'Invalid Password.' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
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
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
,

  getPasswords: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.getUserById(userId);
      return res.status(200).json(user.savedPasswords);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },


};




module.exports = userController;
