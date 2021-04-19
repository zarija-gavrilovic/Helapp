const StateModel = require("../models/stateModel");
const PatientModel = require("../models/patientModel");
const { validationResult } = require("express-validator");
const HttpException = require("../utils/HttpException");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


class StateController {
 

  getHospitalState = async (req, res, next) => {
    const stateFormat = {
      waitingRoom: [],
      inProcess: [],
      healthy: [],
    };
    //Param is how max results you want back
    const states = await StateModel.find(20);
    if (!states) {
      throw new HttpException(404, "User not found");
    }

    states.map((state) => {
      stateFormat.waitingRoom.push(state.waiting_room);
      stateFormat.inProcess.push(state.in_process);
      stateFormat.healthy.push(state.healthy);
    });

    res.send(stateFormat);
  };

  createHospitalState = async (patient) => {
    this.checkValidation(patient);

    //How much patients are in waiting_room
    const waitingRoom = await PatientModel.count('waiting-room');
    //How much patients are in in_process
    const inProcess = await PatientModel.count('in-process');
    //How much patients are in healthy
    const healthy = await PatientModel.count('healthy');

    //New state
    const req = {
      waitingRoom: waitingRoom[0].category,
      inProcess: inProcess[0].category,
      healthy: healthy[0].category
    };

    const result = await StateModel.create(req);
    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    return true;
  };

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation faild", errors);
    }
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new StateController();
