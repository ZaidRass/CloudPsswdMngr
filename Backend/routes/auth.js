const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Login
router.post('/login', userController.login);

// Register
router.post('/register', userController.register);

module.exports = router;