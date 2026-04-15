// cypress/db/seeding.js
const { db, init } = require("./connection");

module.exports = async (users = []) => {
  await init(); // asegura que la tabla existe

  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      "INSERT INTO users (username, password) VALUES (?, ?)"
    );
    users.forEach((u) => {
      stmt.run(u.username, u.password);
    });
    stmt.finalize((err) => (err ? reject(err) : resolve()));
  });
};
