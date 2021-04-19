const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');
const StateController = require('../controllers/stateController');

// Hospital State
router.get('/',awaitHandlerFactory(StateController.getHospitalState)) // localhost:5000/state, last 20 states in hospital


module.exports = router;
