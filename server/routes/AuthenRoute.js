const express = require('express');
const router = express.Router();
const baseController = require('../controllers/BaseController');

router.post('/login', baseController.login);
router.post('/signup', baseController.signup);

module.exports = router;
