const express = require('express');
const router = express.Router();
const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');
const UserController = require('../controllers/userController')
const PatientController = require('../controllers/patientController');
const StateController = require('../controllers/stateController');


//Doctors
router.post('/createdoctor', createUserSchema, awaitHandlerFactory(UserController.createUser)); // localhost:5000/createdoctor
router.post('/login', validateLogin, awaitHandlerFactory(UserController.userLogin)); // localhost:5000/login
router.put('/updatedoctor/:id', updateUserSchema, awaitHandlerFactory(UserController.updateUser)); // localhost:5000/updatedoctor/1

//Patients
router.get('/pcategory/:category', awaitHandlerFactory(PatientController.getPatientsByCategory)); // localhost:5000/pcategory/waiting-room|in-process|healthy
router.get('/patients',awaitHandlerFactory(PatientController.getAllPatientsByCategory)); // localhost:5000/patients, patients sorted by category //NOT USED
router.get('/state',awaitHandlerFactory(StateController.getHospitalState)) // localhost:5000/state, last 20 states in hospital 

module.exports = router;