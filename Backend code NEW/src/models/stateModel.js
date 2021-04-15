const query = require("../db/db-connection");
const { multipleColumnSet } = require("../utils/common");

class StateModel {
  tableName = "patient_total";

find = async (num) => {
    let sql = `SELECT * FROM ${this.tableName} LIMIT ${num}`;
    return await query(sql, null);
  }
 
}

module.exports = new StateModel();
