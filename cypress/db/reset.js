// cypress/db/reset.js
const teardown = require("./teardown");
const seeding = require("./seeding");

module.exports = async () => {
  await teardown();
  await seeding();
  return null;
};
