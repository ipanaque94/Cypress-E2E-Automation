// cypress/db/connection.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "test.db");
const db = new sqlite3.Database(dbPath);

const init = () =>
  new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          password TEXT NOT NULL
        )`,
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  });

module.exports = { db, init };
