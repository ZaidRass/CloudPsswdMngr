const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

router.get('/authenticate', authenticate, userController.authenticate);
router.get('/profile', authenticate, userController.getProfile);
router.get('/passwords', authenticate, userController.getPasswords);
router.delete('/profile', authenticate, userController.removeProfile);
router.put('/profile/updateUsername', authenticate, userController.updateUsername);
router.put('/profile/updateEmail', authenticate, userController.updateEmail);
router.put('/profile/updatePassword', authenticate, userController.updatePassword);
router.post('/logout', authenticate, userController.logout);
router.put('/addNewPassword', authenticate, userController.addNewPassword);
router.put('/decrypt', authenticate, userController.decrypt);
router.delete('/deletePlatformPassword/:passwordId', authenticate, userController.deletePlatformPassword);
router.put('/updateCredentials/:passwordId', authenticate, userController.updateCredentials);

module.exports = router;
