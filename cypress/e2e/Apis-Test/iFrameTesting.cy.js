describe("Trabajando con panatallas modales", () => {
  it("Valido un texto de un elemento en un Iframe", () => {
    cy.visit("https://webdriveruniversity.com/IFrame/index.html");
    cy.get("#frame")
      .iframe("body #button-find-out-more > b")
      .should("include.text", "Find Out More!");
  });
});
