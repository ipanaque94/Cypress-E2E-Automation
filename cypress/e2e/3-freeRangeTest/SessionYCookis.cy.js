describe("Sesiones en Cypress", () => {
  /* it("Crear y usar una sesión", () => {
    cy.visit("https://the-internet.herokuapp.com/login");
    cy.get("#username").type("tomsmith");
    cy.get("#password").type("SuperSecretPassword!");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/secure");
  }); */
  /* it("Usar sesión guardada", () => {
    cy.session("Enoc", () => {
      cy.visit("https://the-internet.herokuapp.com/login");
      cy.get("#username").type("tomsmith");
      cy.get("#password").type("SuperSecretPassword!");
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "/secure");
    }); 
  }); */
  /* it("Ejemplo getCookies y limpieza de cookies", () => {
    cy.session("Enoc", () => {
      cy.visit("https://the-internet.herokuapp.com/login");
      cy.get("#username").type("tomsmith");
      cy.get("#password").type("SuperSecretPassword!");
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "/secure");
      cy.getCookies()
        .should("have.length", 5)
        .then((cookies) => {
          expect(cookies[0]).to.have.property(
            "name",
            "optimizelyPendingLogEvents"
          );
        });
    });
    cy.clearCookies();
    cy.getCookies().should("have.length", 0);
  }); */
  /* it("Ejemplo getCookie", () => {
    cy.session("Enoc", () => {
      cy.visit("https://the-internet.herokuapp.com/login");
      cy.get("#username").type("tomsmith");
      cy.get("#password").type("SuperSecretPassword!");
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "/secure");
      cy.getCookie("optimizelyPendingLogEvents").should("exist");
      cy.getCookie("optimizelyPendingLogEvents").should("not.be.null");
      cy.clearCookie("optimizelyPendingLogEvents");
      cy.getCookie("optimizelyPendingLogEvents").should("not.exist");
    });
  }); */
  /* it("Setear Cookie", () => {
    cy.session("Enoc", () => {
      cy.visit("https://the-internet.herokuapp.com/login");
      cy.get("#username").type("tomsmith");
      cy.get("#password").type("SuperSecretPassword!");
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "/secure");
      cy.getCookie("Enoc").should("not.exist");
      cy.setCookie("Enoc", "Esto es una cookie de Cypress");
      cy.getCookie("Enoc").should(
        "have.property",
        "value",
        "Esto es una cookie de Cypress"
      );
    });
  }); */

  // ojo antes enla carpeta demo-lon hacer este monado node server.js

  it("Login y acceso a área segura con cookie de sesión", () => {
    cy.visit("https://the-internet.herokuapp.com/login");
    cy.get("#username").type("tomsmith");
    cy.get("#password").type("SuperSecretPassword!");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/secure");

    cy.getCookies().then((cookies) => {
      cy.log("Cookies activas: " + JSON.stringify(cookies));
      expect(cookies).to.have.length.greaterThan(0);
    });

    // Validar cookie
    //cy.getCookie("aut").should("have.property", "value", "loggedin");

    // Perfil
    //cy.visit("http://localhost:3000/perfil");
    //cy.contains("Perfil de Enoc").should("be.visible");

    // Configuración
    //cy.visit("http://localhost:3000/configuracion");
    //cy.contains("Configuración de la cuenta").should("be.visible");
  });
});
