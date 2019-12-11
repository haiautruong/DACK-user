const express = require('express');
const router = express.Router();
const PrivateController = require('../controllers/PrivateController');
const Multer = require('multer');
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.post('/teachers/:email', multer.single('file'), PrivateController.updateTeacherInfo);
router.post('/teachers/changepassword/:email', PrivateController.changePassword);

module.exports = router;
