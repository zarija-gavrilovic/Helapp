const express = require('express');
const router = express.Router();

const doctorRoutes = require('./doctorRoutes');
const patientRoutes = require('./patientRoutes');
const hospitalStateRoutes = require('./stateRoutes');
const logListRoutes = require('./logListRoutes')


router.use('/doctor',doctorRoutes);
router.use('/patient',patientRoutes);
router.use('/state',hospitalStateRoutes);
router.use('/loglist', logListRoutes)

module.exports = router;

