const express = require('express');
const router = express.Router();
const { createPatientSchema, updatePatientSchema } = require('../middleware/validators/patientValidator');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');
const PatientController = require('../controllers/patientController');



router.get('/category/:category', awaitHandlerFactory(PatientController.getPatientsByCategory)); // localhost:5000/patient/category/[waiting-room|in-process|healthy]
router.post('/create',createPatientSchema, awaitHandlerFactory(PatientController.createPatient)) // localhost:5000/patient/create
router.put('/update/:id',updatePatientSchema, awaitHandlerFactory(PatientController.updatePatient)) // localhost:5000/patient/update/3 , It's only possible to update category
router.get('/delete/:id',awaitHandlerFactory(PatientController.deletePatient)) // localhost:5000/patient/delete/3

module.exports = router;
