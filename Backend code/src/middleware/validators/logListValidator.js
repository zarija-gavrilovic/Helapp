const { body } = require("express-validator"); // check req.body directly:

exports.createLogListSchema = [
  body("info")
    .exists()
    .withMessage("Info is required")
    .isString()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
];
