const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

router.get('/authenticate', authenticate, userController.authenticate);

// Get profile by ID
router.get('/profile', authenticate, userController.getProfile);
router.get('/passwords/:id', authenticate, userController.getPasswords);

module.exports = router;