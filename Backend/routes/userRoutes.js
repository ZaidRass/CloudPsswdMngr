const express = require('express');
const router = express.Router();
const { getPasswords, addPassword, updatePassword } = require('../db/connection');
const userController = require('../controllers/userController');

// Get user profile
router.get('/profile', userController.getProfile);

