const query = require("../db/db-connection");
const { multipleColumnSet } = require("../utils/common");

class UserModel {
  tableName = "doctor";
  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

    const result = await query(sql, [...values]);
    return result[0];
  };

  create = async ({
    name,
    surname,
    orientation,
    image = null,
    hospital,
    username,
    password,
  }) => {
    const sql = `INSERT INTO ${this.tableName} (name, surname, orientation, image, hospital, username, password ) VALUES (?,?,?,?,?,?,?)`;

    const result = await query(sql, [
      name,
      surname,
      orientation,
      image,
      hospital,
      username,
      password,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);
    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE doctor_id = ?`;

    const result = await query(sql, [...values, id]);

    return result;
  };
}

module.exports = new UserModel();
