const testData = require("../../fixtures/titulos.json");
testData.forEach((testData) => {
  describe(
    "Ejemplos con Feature" +
      testData.Title +
      " sea el titulo de" +
      testData.Location,
    () => {
      it("Validar titulo de la pagina", () => {
        cy.visit(testData.Location);
        cy.title().should("include", testData.Title);
      });
    }
  );
});
