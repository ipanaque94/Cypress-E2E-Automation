describe("Tablas estáticas y dinámicas", function () {
  it("Validamos tabla estática", function () {
    cy.visit("https://testpages.herokuapp.com/styled/tag/table.html");
    cy.contains("td", "Douglas").next().should("have.text", "42");
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
