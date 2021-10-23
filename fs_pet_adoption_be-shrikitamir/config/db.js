const mysql = require("mysql");
const Postgrator = require("postgrator");

const pool = mysql.createPool({
  multipleStatements: true,
  connectionLimit: 1000,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const postgrator = new Postgrator({
  migrationDirectory: "./migrations",
  driver: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  schemaTable: "migrations",
});

const query = (queryText) => {
  return new Promise((resolve, reject) => {
    pool.query(queryText, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = { postgrator, query, pool };
