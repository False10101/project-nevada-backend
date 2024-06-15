import mysql from "mysql2";

const database = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  port: process.env.dbport,
  database: process.env.database,
});
export default database;
