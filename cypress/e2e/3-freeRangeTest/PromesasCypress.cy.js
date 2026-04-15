describe("Pruebas de promesas en Cypress", () => {
  it("Ejercicio 1: promesa simple con setTimeout", () => {
    function getUser() {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ id: 7, name: "Enoc" }), 500);
      });
    }

    cy.wrap(null)
      .then(() => getUser())
      .then((user) => {
        expect(user.name).to.equal("Enoc");
        expect(user.id).to.equal(7);
      });
  });

  it("Ejercicio 2: fetch a API pública", () => {
    cy.wrap(null)
      .then(() =>
        fetch("https://jsonplaceholder.typicode.com/users/1").then((res) =>
          res.json(),
        ),
      )
      .then((data) => {
        expect(data.id).to.equal(1);
        expect(data).to.have.property("username");
      });
  });

  it("Ejercicio 3: axios con manejo de errores", () => {
    cy.request({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts/999",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 404]);
      cy.log("Status recibido: " + response.status);
    });
  });

  it("Ejercicio 4: Cypress.Promise con delay", () => {
    function wait(ms) {
      return new Cypress.Promise((resolve) => setTimeout(resolve, ms));
    }

    cy.wrap(null)
      .then(() => wait(300))
      .then(() => {
        expect(true).to.equal(true);
      });
  });
});
