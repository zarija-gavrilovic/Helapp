const express = require('express');
const router = express.Router();


const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');
const UserController = require('../controllers/userController')


//Doctors
router.post('/createdoctor', createUserSchema, awaitHandlerFactory(UserController.createUser)); // localhost:5000/createdoctor
router.post('/login', validateLogin, awaitHandlerFactory(UserController.userLogin)); // localhost:5000/login
router.put('/updatedoctor/:id', updateUserSchema, awaitHandlerFactory(UserController.updateUser)); // localhost:5000/updatedoctor/1

//Patients
//Continue..
router.get('/pcategory/category', patientSchema, awaitHandlerFactory(UserController.createUser)); // localhost:5000/pcategory/cekaonica

module.exports = router;