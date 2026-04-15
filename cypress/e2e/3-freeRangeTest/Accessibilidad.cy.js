import "cypress-axe";

describe("Pruebas de Accesibilidad en Free Range Tester", () => {
  it.only("Analisis de accesibilidad en el link Cursos", () => {
    cy.visit("https://www.freerangetesters.com/");
    cy.injectAxe();

    // Selecciona el link por texto
    cy.contains("a", "Cursos").should("be.visible");

    // Analiza accesibilidad SOLO en ese link
    cy.checkA11y(
      'a[href="https://www.freerangetesters.com/cursos"]',
      null,
      (violations) => {
        violations.forEach((v) => {
          cy.log(`${v.id} - ${v.help}`);
          v.nodes.forEach((node) => {
            cy.log(`Selector: ${node.target}`);
            console.log(node);
          });
        });
      }
    );
  });
});
