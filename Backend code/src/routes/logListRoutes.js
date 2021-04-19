const express = require('express');
const router = express.Router();
const { createLogListSchema } = require('../middleware/validators/logListValidator');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');
const LogListController = require('../controllers/logListController');



//Log Information
router.get('/loglists',awaitHandlerFactory(LogListController.getAllLogsInfo)); //http://localhost:5000/loglist/loglists
router.post('/create',createLogListSchema,awaitHandlerFactory(LogListController.createLogListItem)); //http://localhost:5000/loglist/create

module.exports = router;
