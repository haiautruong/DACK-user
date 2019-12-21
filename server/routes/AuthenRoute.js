const express = require('express');
const router = express.Router();
const baseController = require('../controllers/BaseController');

router.post('/login', baseController.login);
router.post('/signup', baseController.signUp);
router.post('/resetpass', baseController.forgotPass);
router.get('/account', baseController.activateAccount);

module.exports = router;
