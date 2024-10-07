const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.post('/signIn', userController.signIn);

router.post('/signUp', userController.signUp);

router.put('/updateProfile/:userId', userController.updateUserProfile);

router.get('/userProfile/:email', userController.getUserProfileByEmailId);

module.exports = router;