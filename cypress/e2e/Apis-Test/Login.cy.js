describe("Loquear-Basic Auth y Auth con Forms", function () {
  /* it("Sin Loguear", () => {
    cy.visit("https://the-internet.herokuapp.com/basic_auth"),
      cy.get("p").should("include.text", "Congratulations");
  });

  it("Logueo con Auth Basic", () => {
    cy.visit("https://the-internet.herokuapp.com/basic_auth", {
      auth: {
        username: "admin",
        password: "admin",
      },
    });
    cy.get("p").should("include.text", "Congratulations");
  });

  it("Loguea con credenciales en el visit", () => {
    cy.visit("https://admin:admin@the-internet.herokuapp.com/basic_auth"),
      cy.get("p").should("include.text", "Congratulations");
  });

  it("Realizo Login en un Form.usandoun request del tipo POST", () => {
    cy.visit("https://the-internet.herokuapp.com");
    cy.request({
      method: "POST",
      url: "/authenticate",
      form: true,
      body: {
        username: "tomsmith",
        password: "SuperSecretPassword!",
      },
    });
    cy.getCookie("rack.session").should("exist");
    cy.visit("https://the-internet.herokuapp.com/secure");
    cy.get(".subheader").should("include.text", "Welcome to the Secure Area");
  }); */
  it("Realizo Login Usando Comando Personalizado", () => {
    cy.login();
    cy.get(".subheader").should("include.text", "Welcome to the Secure Area");
  });
});
