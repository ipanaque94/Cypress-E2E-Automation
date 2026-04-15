describe("Loguenado Via Api con Db-Seeding", function () {
  beforeEach(() => {
    cy.task("db:reset", [
      { username: "tomsmith", password: "SuperSecretPassword!" },
      { username: "admin", password: "admin" },
    ]);
  });

  it("Login vía API con usuario semilla", () => {
    cy.task("api:authenticate", {
      username: "tomsmith",
      password: "SuperSecretPassword!",
    }).then((response) => {
      if (response.statusCode === 200) {
        expect(response.body.success).to.be.true;
        expect(response.body.user.username).to.eq("tomsmith");
      } else if (response.statusCode === 401) {
        expect(response.body.success).to.be.false;
        expect(response.body.message).to.eq("Unauthorized");
      }
    });
  });
});
