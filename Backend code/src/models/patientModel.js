const query = require("../db/db-connection");
const { multipleColumnSet } = require("../utils/common");

class PatientModel {
  tableName = "patient";

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

  create = async ({ name, surname, diagnosis, image = null, category }) => {
    const sql = `INSERT INTO ${this.tableName} (name, surname, diagnosis, image, category ) VALUES (?,?,?,?,?)`;

    const result = await query(sql, [
      name,
      surname,
      diagnosis,
      image,
      category,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);
    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE patient_id = ?`;

    const result = await query(sql, [...values, id]);

    return result;
  };

  count = async (category) => {
    const sql = `SELECT COUNT(patient_id) as "category" FROM ${this.tableName} WHERE category="${category}"`
    return await query(sql, null);
  }

  delete = async (id) => {
    const sql = `DELETE FROM ${this.tableName}
    WHERE patient_id = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
}
}

module.exports = new PatientModel();
