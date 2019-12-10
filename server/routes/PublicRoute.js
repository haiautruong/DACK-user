const express = require('express');
const router = express.Router();
const PublicController = require('../controllers/PublicController');

router.get('/teachers', PublicController.getAllTeacher);
router.get('/teachers/:email', PublicController.getTeacher);
router.get('/skills', PublicController.getAllSkill);

module.exports = router;
