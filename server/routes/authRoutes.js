
var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController.js');

router.post('/login', authController.login);

router.post('/register', authController.register);

router.post('/refresh', authController.refresh);

router.get('/logout', authController.logout);

module.exports = router;