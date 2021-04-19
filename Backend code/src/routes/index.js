const express = require('express');
const router = express.Router();

const doctorRoutes = require('./doctorRoutes');
const patientRoutes = require('./patientRoutes');
const hospitalStateRoutes = require('./stateRoutes');
const logListRoutes = require('./logListRoutes')
router.use('/doctor',doctorRoutes);
router.use('/patient',patientRoutes);
router.use('./state',hospitalStateRoutes);
router.use('./loglist', logListRoutes)

module.exports = router;
// Doctors
// router.post('/doctor/create', createUserSchema, awaitHandlerFactory(DoctorController.createUser)); // localhost:5000/doctor/create
// router.post('/doctor/login', validateLogin, awaitHandlerFactory(DoctorController.userLogin)); // localhost:5000/login
// router.put('/doctor/update/:id', updateUserSchema, awaitHandlerFactory(DoctorController.updateUser)); // localhost:5000/doctor/update/1

// Patients
// router.get('/patient/category/:category', awaitHandlerFactory(PatientController.getPatientsByCategory)); // localhost:5000/patient/category/[waiting-room|in-process|healthy]
// router.post('/patient/create',createPatientSchema, awaitHandlerFactory(PatientController.createPatient)) // localhost:5000/patient/create
// router.put('/patient/update/:id',updatePatientSchema, awaitHandlerFactory(PatientController.updatePatient)) // localhost:5000/patient/update/3 , It's only possible to update category
// router.get('/patient/delete/:id',awaitHandlerFactory(PatientController.deletePatient)) // localhost:5000/patient/delete/3
// router.get('/patients',awaitHandlerFactory(PatientController.getAllPatientsByCategory)); // localhost:5000/patients, patients sorted by category //NOT USED

// Hospital State
// router.get('/state',awaitHandlerFactory(StateController.getHospitalState)) // localhost:5000/state, last 20 states in hospital


//Log Information
// router.get('/loglist/loglists',awaitHandlerFactory(LogListController.getAllLogsInfo)); //http://localhost:5000/loglist/loglists
// router.post('/loglist/create',createLogListSchema,awaitHandlerFactory(LogListController.createLogListItem)); //http://localhost:5000/loglist/create


