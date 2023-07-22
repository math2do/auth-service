const express = require('express');
const { login, logout, register } = require('../controllers/authController');
const { authenticateUser } = require('../middleware/authentication');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', authenticateUser, logout);

module.exports = router;
