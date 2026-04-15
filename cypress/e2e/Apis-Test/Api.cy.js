describe("Pruebas de Apis con Cypress", () => {
  /* it("El endopint Posts responde con status 200", () => {
    cy.request({
      url: "https://jsonplaceholder.typicode.com/posts",
    }).then((respuesta) => {
      expect(respuesta.status).to.eq(200);
    });
  });
  it("El endopint Posts Tiene 100 elementos", () => {
    cy.visit("https://jsonplaceholder.typicode.com");
    cy.request("/posts").its("body").should("have.length", 100);
  });
  // Verificar el título del post número 1
  it('El titulo numero 1,tiene por titulo "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"', () => {
    cy.visit("https://jsonplaceholder.typicode.com");
    cy.request("/posts/1")
      .its("body")
      .should(
        "have.property",
        "title",
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
      );
  }); */

  /* //Crear Un Post
  it("El Post request funciona correctamentamente", () => {
    cy.request("POST", "https://jsonplaceholder.typicode.com/posts", {
      userId: 2,
      id: 102,
      title: "Este es un titulo creado desde Cypress",
      body: "Este es el cuerpo del post creado desde Cypress",
    }).then((respuesta) => {
      expect(respuesta.body).to.have.property(
        "title",
        "Este es un titulo creado desde Cypress"
      );
    });
  });
 */
  // Metodo PUT
  it("El Put request funciona correctamentamente", () => {
    cy.request("PUT", "https://jsonplaceholder.typicode.com/posts/2", {
      title: "Titulo Actualizado",
      body: "Cuerpo del post actualizado",
    }).then((respuesta) => {
      expect(respuesta.body).to.have.property("title", "Titulo Actualizado");
    });
  });

  // Metodo DELETE
  it("El Delete request funciona correctamentamente", () => {
    cy.request("DELETE", "https://jsonplaceholder.typicode.com/posts/1");
  });
});
