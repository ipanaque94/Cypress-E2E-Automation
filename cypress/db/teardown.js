// cypress/db/teardown.js
const { db, init } = require("./connection");

module.exports = async () => {
  await init(); // asegura que la tabla existe
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM users", (err) => {
      if (err) reject(err);
      else resolve(null);
    });
  });
};
