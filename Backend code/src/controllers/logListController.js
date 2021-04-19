const { validationResult } = require("express-validator");
const LogListModel = require("../models/LogListModel")
const HttpException = require("../utils/HttpException");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

class LogListInfo {
  getAllLogsInfo = async (req, res, next) => {
    let logList = await LogListModel.findAll();
    if (!logList.length) {
      throw new HttpException(404, "Users not found");
    }

    res.send(logList);
  };

  createLogListItem = async (req,res,next) => {
    this.checkValidation(req);

    const result = await LogListModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Log item was created!");
  }

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
module.exports = new LogListInfo();
