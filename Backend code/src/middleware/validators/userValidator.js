const { body } = require("express-validator"); // check req.body directly:

exports.createUserSchema = [
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
    // .isAlpha()
    .isString()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("orientation")
    .exists()
    .withMessage("Your orientation is required")
    .isLength({ min: 2 })
    .withMessage("Must be at least 2 chars long"),
  body("hospital")
    .exists()
    .withMessage("The hospital is required")
    // .isAlpha()
    .isString()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("username")
    .exists()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Password must contain at least 3 characters")
    .isLength({ max: 10 })
    .withMessage("Password can contain max 10 characters"),
];

exports.updateUserSchema = [
  body("username")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 chars long"),
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("surname")
    .optional()
    .isString()
    .withMessage("Surname must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("orientation")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("hospital")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("password")
    .optional()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Password must contain at least 3 characters"),
  // body()
  //   .custom((value) => {
  //     return !!Object.keys(value).length;
  //   })
  //   .withMessage("Please provide required field to update")
  //   .custom((value) => {
  //     const updates = Object.keys(value);
  //     const allowUpdates = [
  //       "username",
  //       "password",
  //       "confirm_password",
  //       "email",
  //       "role",
  //       "first_name",
  //       "last_name",
  //       "age",
  //     ];
  //     return updates.every((update) => allowUpdates.includes(update));
  //   })
  //   .withMessage("Invalid updates!"),
];

exports.validateLogin = [
  body("username")
    .exists()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must contain at least 6 characters"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 3 })
    .withMessage("Password must contain at least 6 characters"),
];
