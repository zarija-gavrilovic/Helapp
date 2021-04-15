const StateModel = require("../models/stateModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const HttpException = require("../utils/HttpException");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

class StateController {
  getHospitalState = async (req, res, next) => {
    //Param is how max results you want back
    const states = await StateModel.find(20);

    if (!states) {
      throw new HttpException(404, "User not found");
    }

    const stateFormat = {
        waitingRoom: [],
        inProcess: [],
        healthy: []
    }

    states.map((state) => {
        console.log(state);
        stateFormat.waitingRoom.push(state.waiting_room);
        stateFormat.inProcess.push(state.in_process);
        stateFormat.healthy.push(state.healthy);
    })

    //Moraju duzine da se pokalpaju inace baci grsku.

    res.send(stateFormat);
  };
  
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new StateController();
