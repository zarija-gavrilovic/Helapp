const express = require('express');
const router = express.Router();
const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');
const DoctorController = require('../controllers/doctorController')



router.post('/create', createUserSchema, awaitHandlerFactory(DoctorController.createUser)); // localhost:5000/doctor/create
router.post('/login', validateLogin, awaitHandlerFactory(DoctorController.userLogin)); // localhost:5000/login
router.put('/update/:id', updateUserSchema, awaitHandlerFactory(DoctorController.updateUser)); // localhost:5000/doctor/update/1

module.exports = router;
