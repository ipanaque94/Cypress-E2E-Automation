import FreeRangeHome from "../../Pages/FreeRangeHome";
const home = new FreeRangeHome();
describe("Ejemplo de pom de la web Free Range Testesr", () => {
  beforeEach(() => {
    home.navigateHome();
  });
  it("Navegar A la Pagina de Inicio/Blog", () => {
    home.clickInBlog().should("exist");
  });
});
