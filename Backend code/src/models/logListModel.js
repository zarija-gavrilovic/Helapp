const query = require("../db/db-connection");

class LogList {
  tableName = "logger";

  findAll = async () => {
    const sql = `SELECT * FROM ${this.tableName} ORDER BY loginfo_id DESC`;
    return await query(sql, null);
  };

  create = async ({ info }) => {
    const sql = `INSERT INTO ${this.tableName} (info) VALUES (?)`;

    const result = await query(sql, [info]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
}

module.exports = new LogList();
