const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/auth/register', authController.postRegister);
router.post('/auth/login', authController.postLogin);

module.exports = router;