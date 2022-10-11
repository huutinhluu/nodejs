import { db } from "../utils/db.js";

export default (tableName, id_field) => ({
  findAll() {
    return db
      .promise()
      .query(`SELECT * FROM ${tableName}`)
      .then(([results, fields]) => {
        return results;
      })
      .catch(console.log);
  },
  findByID(id) {
    return db
      .promise()
      .query(`SELECT * FROM ${tableName} WHERE ${id_field} = ${id}`)
      .then(([results, fields]) => {
        return results.length > 0
          ? results
          : { message: `${id} doesn't exist` };
      })
      .catch(console.log);
  },
  insert(entity) {
    return db
      .promise()
      .query(`INSERT INTO ${tableName} SET ?`, entity)
      .then(([results, fields]) => {
        return results.insertId;
      })
      .catch((err) => err.sqlMessage);
  },
  delete(id) {
    return db
      .promise()
      .query(`DELETE FROM ${tableName} WHERE ${id_field} = ${id}`)
      .then(([results, fields]) => {
        return results.affectedRows;
      })
      .catch((err) => err.sqlMessage);
  },
  update(id, entity) {
    return db
      .promise()
      .query(`UPDATE ${tableName} SET ? WHERE ${id_field} = ${id}`, entity)
      .then(([results, fields]) => {
        return results.changedRows;
      })
      .catch((err) => err.sqlMessage);
  },
});
