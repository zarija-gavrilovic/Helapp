const PatientModel = require("../models/patientModel");
const StateController= require("../controllers/stateController")
const { validationResult } = require("express-validator");
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
    
    //We should update hostpital state too.
    const resultUpdate = await StateController.createHospitalState(req.body);
    
    if (!resultCreate || !resultUpdate) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Patient was created!");
  }

  updatePatient = async (req, res, next) => {   
    this.checkValidation(req);

    const patientUpdate = await PatientModel.update(req.body, req.params.id); 
    
    if (!patientUpdate) {
      throw new HttpException(404, "Something went wrong");
    }

    const stateUpdate = await StateController.createHospitalState(req.body);

    if (!stateUpdate) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = patientUpdate;

    const message = !affectedRows
      ? "User not found"
      : affectedRows && changedRows
      ? "User updated successfully"
      : "Updated faild";

    res.send({ message, info });
  }

  deletePatient = async (req, res, next) => {
    const result = await PatientModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "User not found");
    }

    const stateUpdate = await StateController.createHospitalState(req.body);

    if (!stateUpdate) {
      throw new HttpException(404, "Something went wrong");
    }
    res.send("Patient has been deleted");
  }

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Patient validation faild", errors);
    }
  };

}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new PatientController();
