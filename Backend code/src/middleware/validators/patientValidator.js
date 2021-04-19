const { body } = require("express-validator"); // check req.body directly:
const patientStates = require("../../utils/patientStates");

exports.createPatientSchema = [
  body("name")
    .exists()
    .withMessage("Your first name is required")
    // .isAlpha()
    .isString()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("surname")
    .exists()
    .withMessage("Your last name is required")
    .isString()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("diagnosis")
    .exists()
    .withMessage("Diagnosis is required")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("category")
    .exists()
    .withMessage("Category is required")
    .isString()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long")
    .isIn([
      patientStates.Healthy,
      patientStates.InProcess,
      patientStates.WaitingRoom,
    ])
    .withMessage("Invalid patient state type"),
];

exports.updatePatientSchema = [
  body("name")
    .optional()
    .exists()
    .withMessage("Your first name is required")
    .isString()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("surname")
    .optional()
    .exists()
    .withMessage("Your last name is required")
    .isString()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("diagnosis")
    .optional()
    .exists()
    .withMessage("Diagnosis is required")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("category")
    .exists()
    .withMessage("Category is required")
    .isIn([
      patientStates.Healthy,
      patientStates.InProcess,
      patientStates.WaitingRoom,
    ])
    .withMessage("Invalid patient state type"),
];
