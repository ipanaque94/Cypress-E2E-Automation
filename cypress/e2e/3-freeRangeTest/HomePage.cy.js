describe("Home de www.freerangetesters.com", () => {
  beforeEach(() => {
    cy.visit("https://www.freerangetesters.com/");
  });
  /* it('should have a title', () => {
        cy.title().should('include', 'Free Range Testers')
        cy.log('Ahora pasa a curso');
        cy.contains('a','Cursos').click();
        //cy.get('[data-testid="header-container"]').find('li').eq(1).find('a').click();
        //cy.xpath('//*[@id="page_header"]/div/section/div/header/nav/ul/li[2]/a').click();
    });
    it('Hay 17 productos Adicionales', () => {
        cy.contains('button', 'Mostrar más').click().pause();
        cy.contains('h4', 'Incluye 17 Productos Adicionales')
          .next('ul')
          .find('li a')
          .should('have.length', 17);
    });

    it('El Campo del Formulario resgitrate gratis el Nombre, posee el id #email-form-name', () => {
       cy.get('#email-form-name').should('exist');
    });

    it('El Boton Registrame esta desabilitado porque los campos anteriores no esta rellenados',() =>{
        cy.contains('button', 'Registrarme').should('not.be.disabled');
    }); 
    
    it('Eligir plan academia y ver el radio button si es chekealble', () =>{
        cy.get('a[href="/academia-2/buy?offer_id=4165082"] img[data-testid="media"]')
          .parent('a')
          .click();
        cy.get('input[type="radio"][value="4165083"]').check({ force: true }).debug();
        cy.get('input[type="radio"][value="4165083"]').should('be.checked');  
    })
    */
  /* it('Navegar a Blog', () => {
        cy.contains('a','Blog').click();
        cy.get('#email-form-email').type('rodasenoc4@gmail.com')
        cy.contains('button','Accede ya').click()
    }) */

  it("Navega a Experiencia real en QA", () => {
    cy.contains("a", "Experiencia real en QA").click();
  });
});
