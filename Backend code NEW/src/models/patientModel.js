const query = require("../db/db-connection");
const { multipleColumnSet } = require("../utils/common");

class PatientModel {
  tableName = "patient";

  //Params default is {} but it also could be object with properties.
  findByParams = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName}`;

    //Sta znaci ovaj ovde deo???
    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findAll = async () => {
    const sql = `SELECT * FROM ${this.tableName}`;
    return await query(sql, null);
  }
  //   create = async ({
  //     name,
  //     surname,
  //     orientation,
  //     image = null,
  //     hospital,
  //     username,
  //     password,
  //   }) => {
  //     const sql = `INSERT INTO ${this.tableName} (name, surname, orientation, image, hospital, username, password ) VALUES (?,?,?,?,?,?,?)`;

  //     const result = await query(sql, [
  //       name,
  //       surname,
  //       orientation,
  //       image,
  //       hospital,
  //       username,
  //       password,
  //     ]);
  //     const affectedRows = result ? result.affectedRows : 0;

  //     return affectedRows;
  //   };

  //   update = async (params, id) => {
  //     const { columnSet, values } = multipleColumnSet(params);
  //     const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE doctor_id = ?`;

  //     const result = await query(sql, [...values, id]);

  //     return result;
  //   };
}

module.exports = new PatientModel();
