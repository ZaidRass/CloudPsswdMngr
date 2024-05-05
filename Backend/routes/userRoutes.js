const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

// router.get('/authenticate', authenticate, userController.authenticate);

// Get profile by ID
router.post('/:id', authenticate, userController.getProfile);

module.exports = router;