const PatientModel = require("../models/patientModel");
const StateController= require("../controllers/stateController")
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const HttpException = require("../utils/HttpException");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

class PatientController {
  getPatientsByCategory = async (req, res, next) => {
    const patients = await PatientModel.findByParams({
      category: req.params.category,
    });
    if (!patients) {
      throw new HttpException(404, "User not found");
    }

    res.send(patients);
  };

  createPatient = async (req, res, next) => {
    this.checkValidation(req);
    const resultCreate = await PatientModel.create(req.body);

    //Treba da pozoves state, da uzmes pozlednji length-1 i da dodas na prvi niz od ta 3 +1 i da upises u state
    const resultUpdate = await StateController.createHospitalState(req.body);
    
    if (!resultCreate || !resultUpdate) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Patient was created!");
  }


  //NOT USED
  getAllPatientsByCategory = async (req, res, next) => {
    let patients = await PatientModel.findAll();
    if (!patients) {
      throw new HttpException(404, "User not found");
    }
    const patientsSorted = {
      healthy: [],
      waitingRoom: [],
      inProcess: [],
    };
    //Sort by category & split in 3 arrys
    patients = patients.sort((patientA, patientB) =>
      patientA.category.localeCompare(patientB.category)
    ).map((patient) => {
      if(patient.category === 'healthy'){
        patientsSorted.healthy.push(patient)
      } else if(patient.category === 'in-process'){
        patientsSorted.inProcess.push(patient)
      }else{
        patientsSorted.waitingRoom.push(patient)
      }
    });
    
    res.send(patientsSorted);
  };

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation faild", errors);
    }
  };

  // // hash password if it exists
  // hashPassword = async (req) => {
  //   if (req.body.password) {
  //     req.body.password = await bcrypt.hash(req.body.password, 8);
  //   }
  // };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new PatientController();
