const sqlite3 = require("sqlite3").verbose();
const md5 = require("md5");

const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    // db.run(
    //   `CREATE TABLE login_data (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         nim text,
    //         password text
    //         )`,
    //   (err) => {
    //     if (err) {
    //       console.log("Create table error", err);
    //     } else {
    //     }
    //   }
    // );
  }
});

module.exports = db;
