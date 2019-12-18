const express = require('express');
const router = express.Router();
const PrivateController = require('../controllers/PrivateController');
const ContractController = require('../controllers/ContractController');
const Multer = require('multer');
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.post('/teachers/:email', multer.single('file'), PrivateController.updateTeacherInfo);
router.post('/teachers/changepassword/:email', PrivateController.changePassword);

router.post('/students/:email', multer.single('file'), PrivateController.updateStudentInfo);
router.post('/students/changepassword/:email', PrivateController.changePassword);

router.post('/contracts', ContractController.createContract);
router.post('/complaints', ContractController.createComplaint);
router.get('/contracts/teacher/:teacherEmail', ContractController.getContractByTeacher);
router.get('/contracts/student/:studentEmail', ContractController.getContractByStudent);
router.get('/contracts/:contractID', ContractController.getContract);
router.put('/contracts/:contractID', ContractController.updateStatus);
router.put('/contracts/review/:contractID', ContractController.updateReview);

module.exports = router;
