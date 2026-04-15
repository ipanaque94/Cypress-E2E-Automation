const { defineConfig } = require("cypress");
const path = require("path");

module.exports = defineConfig({
  video: true,
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    experimentalSessionAndOrigin: true,
    experimentalSessionSupport: true,
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });

      on("task", {
        "db:reset": async (users) => {
          const reset = require(path.resolve(__dirname, "cypress/db/reset.js"));
          return await reset(users);
        },
        "api:authenticate": async ({ username, password }) => {
          const { db, init } = require(
            path.resolve(__dirname, "cypress/db/connection.js"),
          );
          await init();
          return new Promise((resolve, reject) => {
            db.get(
              "SELECT * FROM users WHERE username = ? AND password = ?",
              [username, password],
              (err, row) => {
                if (err) return reject(err);
                if (row) {
                  resolve({
                    statusCode: 200,
                    body: {
                      success: true,
                      user: { id: row.id, username: row.username },
                      token: "fake-token",
                    },
                  });
                } else {
                  resolve({
                    statusCode: 401,
                    body: { success: false, message: "Unauthorized" },
                  });
                }
              },
            );
          });
        },
      });
    },
  },
  projectId: "6m8pac",
  report: "mochawesome",
});
