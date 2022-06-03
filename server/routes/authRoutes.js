
var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController.js');

router.get('/logout', authController.logout);

router.post('/login', authController.login);
router.post('/facelogin', authController.facelogin);
router.post('/register', authController.register);
router.post('/refresh', authController.refresh);

module.exports = router;