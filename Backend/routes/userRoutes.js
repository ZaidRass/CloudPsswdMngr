const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

router.get('/authenticate', authenticate, userController.authenticate);

// Get profile by ID
router.get('/profile', authenticate, userController.getProfile);


router.put('/addNewPassword',authenticate, userController.addNewPassword);
router.put('/decrypt',authenticate, userController.decrypt)
router.delete('/deletePlatformPassword/:passwordId', authenticate, userController.deletePlatformPassword);
router.put('/updateCredentials/:passwordId', authenticate, userController.updateCredentials);
module.exports = router;