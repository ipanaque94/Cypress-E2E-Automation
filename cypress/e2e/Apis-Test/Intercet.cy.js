describe("Pruebas de Intercept con Cypress", () => {
  it.only("Simula una solicitud Get a /Posts con Stub", () => {
    //Dstos Ficticios
    const datosFicticios = [
      {
        userId: 1,
        id: 1,
        title: "Titulo Ficticio 1",
        body: "Cuerpo Ficticio 1",
      },
      {
        userId: 2,
        id: 2,
        title: "Titulo Ficticio 2",
        body: "Cuerpo Ficticio 2",
      },
    ];

    //Creacion del Stub
    cy.intercept(
      "GET",
      "https://jsonplaceholder.typicode.com/posts",
      datosFicticios
    ).as("getPosts");

    //Visista la pagina de la apliaccion donde se reliaza la solicitud a la API
    cy.visit("https://jsonplaceholder.typicode.com");
    cy.get('a[href="/posts"]').eq(0).click();
    //Esperar a que se complete la solicitud interceptada
    cy.wait("@getPosts");
    //Verificar que los datos ficticios se muestran en la interfaz de usuario
    cy.get("body > pre").should("contain.text", "Titulo Ficticio 1");
    cy.get("body > pre").should("contain.text", "Cuerpo Ficticio 1");
    cy.get("body > pre").should("contain.text", "Titulo Ficticio 2");
    cy.get("body > pre").should("contain.text", "Cuerpo Ficticio 2");
  });
});
