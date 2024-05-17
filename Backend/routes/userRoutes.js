const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');
const multer = require('multer');

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/authenticate', authenticate, userController.authenticate);
router.get('/profile', authenticate, userController.getProfile);
router.get('/passwords', authenticate, userController.getPasswords);
router.get('/getProfilePic',authenticate,userController.getProfilePic);
router.post('/logout', authenticate, userController.logout);
router.post('/uploadProfilePicture', authenticate, upload.single('file'), userController.uploadProfilePicture);
router.put('/profile/updateUsername', authenticate, userController.updateUsername);
router.put('/profile/updateEmail', authenticate, userController.updateEmail);
router.put('/profile/updatePassword', authenticate, userController.updatePassword);
router.put('/addNewPassword', authenticate, userController.addNewPassword);
router.put('/decrypt', authenticate, userController.decrypt);
router.put('/updateCredentials/:passwordId', authenticate, userController.updateCredentials);
router.delete('/deletePlatformPassword/:passwordId', authenticate, userController.deletePlatformPassword);
router.delete('/profile', authenticate, userController.removeProfile);
router.delete('/profile-picture', authenticate, userController.deleteProfilePicture);

// Upload profile picture route

module.exports = router;
