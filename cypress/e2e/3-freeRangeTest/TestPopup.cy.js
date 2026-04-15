describe("Test de Popup", function () {
  it("Debería abrir un popup cuando se haga clic en el botón", function () {
    cy.visit("https://demo.mobiscroll.com/javascript/popup");

    // Interceptar la función de apertura del popup
    cy.window().then((win) => {
      const originalOpen = win.open;
      win.open = (url) => {
        return originalOpen.call(win, url);
      };
    });

    // Simula clic en el botón que abre el popup
    cy.get("#demo-popup-open").first().click(); // botón de ejemplo en la demo

    // Verifica que el popup se haya abierto
    cy.get("#demo-popup").should("be.visible");
  });
});
