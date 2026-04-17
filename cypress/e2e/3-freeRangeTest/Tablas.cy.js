describe("Tablas estáticas y dinámicas", function () {
  describe("Tablas estáticas y dinámicas", () => {
    it("Validamos tabla estática", () => {
      cy.visit("https://www.w3schools.com/html/html_tables.asp");
      cy.get("#customers").should("be.visible");

      cy.contains("td", "Maria Anders")
        .should("exist")
        .next()
        .should("have.text", "Germany")
        .then(() => {
          cy.log("Se encontró 'Maria Anders' y su país es 'Germany'");
        });
    });
  });

  it("Validamos tabla dinámica", function () {
    cy.visit("https://practice.expandtesting.com/dynamic-table");

    cy.contains("td", "Firefox")
      .next()
      .invoke("text")
      .then((text) => {
        cy.log("Valor capturado:", text);
        console.log("Valor capturado:", text);

        expect(text).to.match(/\d+(\.\d+)?\s*(Mbps|%|MB)/);

        const value = parseFloat(text);
        expect(value).to.be.greaterThan(0);
      });
  });
});
