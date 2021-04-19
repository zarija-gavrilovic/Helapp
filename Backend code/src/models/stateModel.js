const query = require("../db/db-connection");
const { multipleColumnSet } = require("../utils/common");

class StateModel {
  tableName = "patient_total";
  find = async (num) => {
    let sql = `SELECT * FROM ${this.tableName} ORDER BY patient_totalID DESC LIMIT ${num}`;
    return await query(sql, null);
  };

  create = async ({ waitingRoom, inProcess, healthy }) => {
    const sql = `INSERT INTO ${this.tableName} (waiting_room, in_process, healthy) VALUES (?,?,?)`;

    const result = await query(sql, [waitingRoom, inProcess, healthy]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

}

module.exports = new StateModel();
