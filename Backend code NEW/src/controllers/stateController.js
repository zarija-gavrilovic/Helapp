const StateModel = require("../models/stateModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const HttpException = require("../utils/HttpException");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// const stateFormat = {
//   waitingRoom: [],
//   inProcess: [],
//   healthy: [],
// };

class StateController {
  stateFormat = {
    waitingRoom: [],
    inProcess: [],
    healthy: [],
  };


  getHospitalState = async (req, res, next) => {
    //Param is how max results you want back
    const states = await StateModel.find(20);
    console.log(states);
    if (!states) {
      throw new HttpException(404, "User not found");
    }

    states.map((state) => {
      this.stateFormat.waitingRoom.push(state.waiting_room);
      this.stateFormat.inProcess.push(state.in_process);
      this.stateFormat.healthy.push(state.healthy);
    });

    //Moraju duzine da se pokalpaju inace baci grsku.
    res.send(this.stateFormat);
  };

/******************************************************************************
 *                               OVDE SI STAO tebi ne treba cela funkcija
 * vec samo state model da ti nadje i da ti updatuje .
 ******************************************************************************/
  createHospitalState = async (patient, res) => {
    this.checkValidation(patient);
    //Updated stateFormat
    
    const states = await StateModel.find(20);
    console.log(states);
    if (!states) {
      throw new HttpException(404, "User not found");
    }

    states.map((state) => {
      this.stateFormat.waitingRoom.push(state.waiting_room);
      this.stateFormat.inProcess.push(state.in_process);
      this.stateFormat.healthy.push(state.healthy);
    });
    
    

    //Increase number of patients in waiting room.
    if(patient.category === 'waiting-room'){
      this.stateFormat.waitingRoom[this.stateFormat.waitingRoom.length - 1] =+1;
    }else if(patient.category === 'in-progress'){
      this.stateFormat.inProcess[this.stateFormat.inProcess.length - 1] =+1;
    }else{
      this.stateFormat.healthy[this.stateFormat.healthy.length - 1] =+1;
    }
    

    //New state
    const req = {
      waitingRoom: this.stateFormat.waitingRoom[this.stateFormat.waitingRoom.length -1],
      inProcess: this.stateFormat.inProcess[this.stateFormat.inProcess.length -1],
      healthy: this.stateFormat.healthy[this.stateFormat.healthy.length -1]
    }
    console.log(req);
    const result = await StateModel.create(req);
    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Hospital state was created!");
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
