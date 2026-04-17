<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:16213e,100:0f3460&height=180&section=header&text=Cypress%20E2E%20Automation&fontSize=36&fontColor=e94560&fontAlignY=38&desc=QA%20Automation%20Framework%20%7C%20145%20Tests%20%7C%20CI%2FCD%20%2B%20Allure&descAlignY=58&descColor=a8b2d8" width="100%"/>

<br/>

[![CI](https://github.com/ipanaque94/Cypress-E2E-Automation/actions/workflows/cypress.yml/badge.svg)](https://github.com/ipanaque94/Cypress-E2E-Automation/actions/workflows/cypress.yml)
[![Allure Report](https://img.shields.io/badge/Allure_Report-Ver_en_vivo-e94560?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyTDIgN2wxMCA1IDEwLTV6TTIgMTdsOSA1IDktNXYtNUwyIDE3eiIvPjwvc3ZnPg==&logoColor=white)](https://ipanaque94.github.io/Cypress-E2E-Automation/)
[![Cypress](https://img.shields.io/badge/Cypress-14-17202C?style=flat&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2020-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Tests](https://img.shields.io/badge/Tests-145_passing-22c55e?style=flat)](https://github.com/ipanaque94/Cypress-E2E-Automation/actions)
[![License](https://img.shields.io/badge/License-MIT-a8b2d8?style=flat)](LICENSE)

<br/>

### 🔗 [Ver reporte Allure en vivo →](https://ipanaque94.github.io/Cypress-E2E-Automation/)

<br/>

</div>

---

## 🧠 Enfoque como QA

> Este proyecto no está diseñado solo para ejecutar tests — está diseñado para **validar calidad real del sistema**.

<table>
<tr>
<td>✅ Detección de falsos positivos y negativos</td>
<td>✅ Tests estables y reproducibles</td>
</tr>
<tr>
<td>✅ Independencia del entorno (CI/CD ready)</td>
<td>✅ Aislamiento entre tests</td>
</tr>
<tr>
<td>✅ Reportes confiables para toma de decisiones</td>
<td>✅ Pipeline automático en cada push</td>
</tr>
</table>

---

## 📊 Resultados de ejecución

<div align="center">

| 📁 Suite | 🧪 Specs | ✅ Tests | ⏱ Duración |
|----------|---------|---------|-----------|
| Getting Started | 1 | 6 | ~0:05 |
| Advanced Examples | 16 | 118 | ~1:45 |
| FreeRange + POM | 6 | 13 | ~1:10 |
| API Tests | 7 | 7 | ~0:30 |
| **TOTAL** | **34** | **146** | **~4:30** |

</div>

```
Suites: 34  │  Tests: 145  │  Passing: 146  │  Failing: 0  │  Duración: ~4:30
```

---

## 🗂️ Cobertura del framework

<details>
<summary><b>🖥️ UI Testing</b></summary>
<br/>

| Técnica | Archivo | Descripción |
|---------|---------|-------------|
| Acciones de usuario | `actions.cy.js` | Click, type, drag & drop, scroll, select |
| DOM traversal | `traversal.cy.js` | 18 formas de navegar el DOM |
| Responsive testing | `viewport.cy.js` | `cy.viewport()` con presets de dispositivos |
| Querying | `querying.cy.js` | `cy.get()`, `cy.contains()`, `.within()` |
| Navigation | `navigation.cy.js` | `cy.go()`, `cy.reload()` con opciones |
| Window/Document | `window.cy.js` | `cy.window()`, `cy.document()`, `cy.title()` |
| Page Object Model | `PageObjet.cy.js` | Clase que encapsula selectores y acciones |

</details>

<details>
<summary><b>🔌 API Testing</b></summary>
<br/>

| Técnica | Archivo | Descripción |
|---------|---------|-------------|
| HTTP directo | `Api.cy.js` | PUT y DELETE con validación de status y body |
| Intercept + Stub | `Intercet.cy.js` | Mock de requests antes de llegar al servidor |
| Network requests | `network_requests.cy.js` | `cy.request()` y `cy.intercept()` avanzado |
| Login bypass | `Login-Db-Seeding.cy.js` | Autenticación vía API sin pasar por UI |
| Data-driven | `Ejemplos-TetsData-feature.cy.js` | Un test generado por cada item del array |

</details>

<details>
<summary><b>⚡ Testing avanzado</b></summary>
<br/>

| Técnica | Archivo | Descripción |
|---------|---------|-------------|
| Accessibility (WCAG) | `Accessibilidad.cy.js` | `cypress-axe` con análisis axe-core |
| Sesiones | `SessionYCookis.cy.js` | `cy.session()`, cookies, localStorage |
| Control de tiempo | `spies_stubs_clocks.cy.js` | `cy.clock()`, `cy.tick()`, `cy.spy()`, `cy.stub()` |
| iFrame testing | `iFrameTesting.cy.js` | `contentDocument.body` para contenido en iframes |
| Promises | `PromesasCypress.cy.js` | `Cypress.Promise`, fetch, manejo de errores |
| Tablas dinámicas | `Tablas.cy.js` | Validación y ordenamiento de tablas HTML |
| Popups | `TestPopup.cy.js` | Manejo de ventanas emergentes |

</details>

<details>
<summary><b>🏗️ Arquitectura y patrones</b></summary>
<br/>

| Patrón | Implementación |
|--------|---------------|
| Page Object Model | `cypress/Pages/FreeRangeHome.js` |
| Custom commands | `cypress/support/commands.js` — `cy.login()` |
| Fixtures externos | `cypress/fixtures/profile.json`, `users.json` |
| Data-driven testing | `forEach` sobre arrays de datos |
| Aliasing | `.as()` para reutilizar elementos y requests |

</details>

---

## 🔍 Problemas reales resueltos

> Estos no son errores de tutorial — son problemas reales que encontré y resolví. Cada uno me enseñó algo que no aparece en la documentación oficial.

<details>
<summary><b>🐛 Allure llegaba vacío aunque el reporter estaba configurado</b></summary>
<br/>

**Síntoma:** El reporte Allure se generaba pero no mostraba ningún test.

**Causa:** `allure-cypress` necesita que importes el soporte en `cypress/support/e2e.js`. Sin esa línea el reporter está registrado pero no escucha los eventos de los tests.

**Fix:**
```js
// cypress/support/e2e.js
import "allure-cypress";
import "cypress-axe";
```

**Aprendizaje:** Configurar el plugin en `cypress.config.js` no es suficiente. El soporte del lado del browser es obligatorio y separado.

</details>

<details>
<summary><b>🐛 <code>this.testdata</code> llegaba <code>undefined</code> al test</b></summary>
<br/>

**Síntoma:** `cy.type(this.testdata.username)` lanzaba error — `this.testdata` era `undefined`.

**Causa:** Mezclar arrow functions con `function()` en los hooks rompe el contexto `this`. Las arrow functions no preservan `this` entre el `before()` y el `it()`.

**Fix:**
```js
// ❌ Roto
before(() => {
  cy.fixture("profile").then((data) => { this.testdata = data; });
});

// ✅ Correcto
beforeEach(function () {
  cy.fixture("profile").then(function (data) { this.testdata = data; });
});
```

**Aprendizaje:** En Cypress, los tests que usan `this` para fixtures deben usar `function()` en todos los hooks y en el `it()`. Una arrow function en cualquier nivel rompe la cadena.

</details>

<details>
<summary><b>🐛 <code>.catch()</code> no existe en el chain de Cypress</b></summary>
<br/>

**Síntoma:** `TypeError: cy.wrap(...).then(...).then(...).catch is not a function`

**Causa:** El chain de Cypress no es una Promise nativa aunque use sintaxis similar. Cypress no expone `.catch()` porque gestiona los errores internamente.

**Fix:**
```js
// ❌ Roto
cy.wrap(promise).then(...).then(...).catch(err => { ... });

// ✅ Correcto
cy.request({ method: "GET", url: "...", failOnStatusCode: false })
  .then((response) => {
    expect(response.status).to.be.oneOf([200, 404]);
  });
```

**Aprendizaje:** `failOnStatusCode: false` es la forma correcta de manejar errores HTTP en `cy.request()`. No intentes aplicar patrones de Promises nativas al chain de Cypress.

</details>

<details>
<summary><b>🐛 Tests dependientes de servidor local fallan en CI</b></summary>
<br/>

**Síntoma:** `CypressError: cy.visit() failed — ECONNREFUSED — localhost:3000`

**Causa:** El test dependía de un servidor local (`localhost:3000`) que no existe en el runner de GitHub Actions.

**Fix:** Reescribir sobre `the-internet.herokuapp.com`, público y sin dependencias de infraestructura propia.

**Aprendizaje:** Si un test no puede correr sin infraestructura local, no es un test automatizado — es un script manual disfrazado. Los tests deben ser environment-independent.

</details>

<details>
<summary><b>🐛 Regex con unidades incorrectas tira el test completo</b></summary>
<br/>

**Síntoma:** `AssertionError: expected '1.9 Mbps' to match /\d+(\.\d+)? MB\/s/`

**Causa:** El regex esperaba formato `MB/s` pero la tabla devolvía `Mbps`. Un caracter de diferencia en la unidad hace fallar el assertion sin ningún bug real en la aplicación.

**Fix:** Cambiar a datos estáticos y deterministas en `the-internet.herokuapp.com/tables`.

**Aprendizaje:** Una tabla con datos dinámicos es un ambiente inestable para assertions exactas sobre valores. Los tests sobre datos variables deben validar estructura, no valores específicos.

</details>

---

## 🏗️ Estructura del proyecto

```
Cypress-E2E-Automation/
│
├── .github/
│   └── workflows/
│       └── cypress.yml              ← CI/CD + deploy Allure Pages
│
├── cypress/
│   ├── e2e/
│   │   ├── 1-getting-started/       ← 1 spec, 6 tests
│   │   │   └── todo.cy.js
│   │   ├── 2-advanced-examples/     ← 16 specs, 118 tests
│   │   │   ├── actions.cy.js
│   │   │   ├── aliasing.cy.js
│   │   │   ├── assertions.cy.js
│   │   │   ├── connectors.cy.js
│   │   │   ├── cookies.cy.js
│   │   │   ├── cypress_api.cy.js
│   │   │   ├── files.cy.js
│   │   │   ├── location.cy.js
│   │   │   ├── misc.cy.js
│   │   │   ├── navigation.cy.js
│   │   │   ├── network_requests.cy.js
│   │   │   ├── querying.cy.js
│   │   │   ├── spies_stubs_clocks.cy.js
│   │   │   ├── storage.cy.js
│   │   │   ├── traversal.cy.js
│   │   │   ├── utilities.cy.js
│   │   │   ├── viewport.cy.js
│   │   │   ├── waiting.cy.js
│   │   │   └── window.cy.js
│   │   ├── 3-freeRangeTest/         ← 6 specs, 13 tests
│   │   │   ├── Accessibilidad.cy.js
│   │   │   ├── HomePage.cy.js
│   │   │   ├── PromesasCypress.cy.js
│   │   │   ├── SessionYCookis.cy.js
│   │   │   ├── Tablas.cy.js
│   │   │   └── TestPopup.cy.js
│   │   ├── Apis-Test/               ← 7 specs, 7 tests
│   │   │   ├── Api.cy.js
│   │   │   ├── Ejemplo-Feature.cy.js
│   │   │   ├── Ejemplos-TetsData-feature.cy.js
│   │   │   ├── iFrameTesting.cy.js
│   │   │   ├── Intercet.cy.js
│   │   │   ├── Login-Db-Seeding.cy.js
│   │   │   └── Login.cy.js
│   │   └── PageObjetModel/          ← 1 spec, 1 test
│   │       └── PageObjet.cy.js
│   │
│   ├── fixtures/
│   │   ├── profile.json             ← Credenciales de test
│   │   ├── titulos.json
│   │   └── users.json
│   ├── Pages/
│   │   └── FreeRangeHome.js         ← Page Object class
│   └── support/
│       ├── commands.js              ← cy.login() y custom commands
│       └── e2e.js                   ← import allure-cypress + cypress-axe
│
├── cypress.config.js
└── package.json
```

---

## 🔄 Pipeline CI/CD

```
Push a main / Pull Request
         │
    ┌────┴──────────────────────────────────────────┐
    │              │               │                 │
Getting        Advanced        FreeRange          API
Started        Examples        + POM             Tests
(6 tests)     (118 tests)     (14 tests)        (7 tests)
    │              │               │                 │
    └──────────────┴───────────────┴─────────────────┘
                              │
                   allure-report (job final)
                              │
                   ┌──────────┴──────────┐
              Merge resultados      Deploy GitHub Pages
              de los 4 jobs    →   ipanaque94.github.io/
                                   Cypress-E2E-Automation/
```

> Los artefactos (videos + screenshots en fallo) quedan disponibles en **Actions → Run → Artifacts** por 7 días.

### Activar GitHub Pages (una sola vez)

1. **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **`gh-pages`** → **`/ (root)`**
4. Click **Save**

---

## ⚙️ Cómo ejecutar localmente

**Requisito:** Node.js 18+

```bash
# Clonar el repositorio
git clone https://github.com/ipanaque94/Cypress-E2E-Automation.git
cd Cypress-E2E-Automation

# Instalar dependencias
npm install

# Modo interactivo (recomendado para desarrollo)
npx cypress open

# Headless con Chrome
npx cypress run --browser chrome

# Suite específica
npx cypress run --spec "cypress/e2e/Apis-Test/**/*.cy.js" --browser chrome
npx cypress run --spec "cypress/e2e/3-freeRangeTest/**/*.cy.js" --browser chrome

# Reporte Allure local
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## 🛠️ Stack

<div align="center">

| Herramienta | Versión | Uso |
|-------------|---------|-----|
| ![Cypress](https://img.shields.io/badge/-Cypress-17202C?logo=cypress&logoColor=white) | 14 | Framework E2E principal |
| ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black) | ES2020 | Lenguaje de los tests |
| ![Allure](https://img.shields.io/badge/-Allure-e94560?logoColor=white) | 3.x | Reporte con trazabilidad por test |
| ![axe](https://img.shields.io/badge/-cypress--axe-663399?logoColor=white) | 1.x | Accessibility testing WCAG |
| ![GitHub Actions](https://img.shields.io/badge/-GitHub_Actions-2088FF?logo=github-actions&logoColor=white) | — | CI/CD paralelo en cada push |
| ![GitHub Pages](https://img.shields.io/badge/-GitHub_Pages-222222?logo=github&logoColor=white) | — | Publicación automática del reporte |

</div>

---

## 📚 Técnicas cubiertas

<div align="center">

| Categoría | Técnicas |
|-----------|----------|
| **Patrones** | Page Object Model · Custom commands · Fixtures JSON |
| **UI Testing** | Selectores · DOM traversal · Viewport · Drag & drop |
| **API Testing** | `cy.request()` · Validación status y body |
| **Async** | `cy.session()` · Promises · `cy.clock()` · `cy.tick()` |
| **Avanzado** | Intercept+stub · Spies · iFrame · Accessibility (axe) |
| **Datos** | Data-driven con `forEach` · Fixtures externalizados |
| **Reportes** | Allure en GitHub Pages · Screenshots automáticos |
| **CI/CD** | Jobs paralelos · Artefactos · Deploy automático |

</div>

---

<div align="center">

## 👨‍💻 Autor

**Enoc Ipanaque**
*QA Automation Engineer · Lima, Perú*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Enoc_Ipanaque-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/enoc-isaac-ipanaque-rodas-b3729a283)
[![GitHub](https://img.shields.io/badge/GitHub-ipanaque94-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ipanaque94)
[![Email](https://img.shields.io/badge/Email-rodasenoc4@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:rodasenoc4@gmail.com)

<br/>

*Selenium · Playwright · Cypress · Rest Assured · AWS · Jenkins · Docker*

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:16213e,100:0f3460&height=100&section=footer" width="100%"/>

</div>
