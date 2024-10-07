const express = require('express');
const router = express.Router();
const chatController = require("../controllers/chatController.js");


router.get('/:userId', chatController.getChat);

router.post('/create/:userId', chatController.createChat);





module.exports = router;