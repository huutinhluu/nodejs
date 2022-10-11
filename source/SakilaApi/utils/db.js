import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "sakila",
});

export const db = await connection
  .promise()
  .connect()
  .then(() => {
    console.log("Connected!");
    return connection;
  })
  .catch(console.log);
