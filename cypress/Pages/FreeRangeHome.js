class FreeRangeHome {
  navigateHome() {
    cy.visit("https://www.freerangetesters.com/");
  }
  // Con El Return se definen los locators
  // cy.get(#sgfsdf) .click()
  clickInBlog() {
    return cy.contains("a", "Blog").click();
  }
}
export default FreeRangeHome;
