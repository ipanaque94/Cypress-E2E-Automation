describe("Ejemplos con Feature", () => {
  let testdata;

  beforeEach(() => {
    cy.fixture("profile").then((data) => {
      testdata = data;
    });
  });

  it("Login usando data del fixture", () => {
    cy.visit("https://the-internet.herokuapp.com/login");
    cy.get("#username").type(testdata.username);
    cy.get("#password").type(testdata.password);
    cy.get("form").contains("Login").click();
    cy.url().should("include", "/secure");
  });
});
