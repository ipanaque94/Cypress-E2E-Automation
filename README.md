# Cypress E2E Automation Framework

[![CI](https://github.com/ipanaque94/Cypress-E2E-Automation/actions/workflows/cypress.yml/badge.svg)](https://github.com/ipanaque94/Cypress-E2E-Automation/actions/workflows/cypress.yml)
[![Allure Report](https://img.shields.io/badge/Allure_Report-ver_en_vivo-orange?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyTDIgN2wxMCA1IDEwLTV6TTIgMTdsOSA1IDktNXYtNUwyIDE3eiIvPjwvc3ZnPg==)](https://ipanaque94.github.io/Cypress-E2E-Automation/)
[![Cypress](https://img.shields.io/badge/Cypress-14-17202C?style=flat&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2020-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Tests](https://img.shields.io/badge/Tests-145_passing-brightgreen?style=flat)](https://github.com/ipanaque94/Cypress-E2E-Automation/actions)

> 🔗 **[Ver reporte Allure en vivo →](https://ipanaque94.github.io/Cypress-E2E-Automation/)**

Suite de automatización E2E construida con Cypress 14 y JavaScript. Cubre UI testing, API testing, accesibilidad WCAG, Page Object Model, gestión de sesiones y cookies, intercept de requests, data-driven testing con fixtures y comandos personalizados. Pipeline CI/CD con GitHub Actions que publica el reporte Allure automáticamente en GitHub Pages en cada push.

---

## Por qué construí esto

Quería entender cómo trabaja QA en una empresa real: múltiples tipos de prueba, datos externalizados en fixtures, patrones de diseño reutilizables, reportes con contexto y un pipeline que detecta regresiones automáticamente.

El proceso no fue lineal. Estos son los errores reales que resolví — los que no aparecen en ningún tutorial:

**Regex con unidades incorrectas tira el test completo.** El test de tablas dinámicas fallaba porque el regex esperaba `MB/s` y la tabla devolvía `Mbps`. Un caracter de diferencia en la unidad hace fallar el assertion. Cambié la estrategia a usar `the-internet.herokuapp.com/tables` con datos estáticos y deterministas.

---

## Resultados

```
Suites: 34  |  Tests: 145  |  Passing: 146  |  Failing: 0  |  Duración: ~4:30
```

| Suite | Specs | Tests | Estado |
|-------|-------|-------|--------|
| Getting Started | 1 | 6 | ✅ |
| Advanced Examples | 16 | 118 | ✅ |
| Page Object Model | 1 | 1 | ✅ |
| FreeRange Tests | 6 | 13 | ✅ |
| API Tests | 7 | 7 | ✅ |

---

## Qué se prueba y qué aprendí en cada carpeta

### `1-getting-started/` — Fundamentos

**`todo.cy.js`** *(6 tests)* — App de To-Do completa: agregar tareas, marcarlas completadas, filtrar por estado y eliminar.

Fue el primer test donde entendí que Cypress espera automáticamente que los elementos aparezcan en el DOM — no hay `cy.wait(2000)` como en Selenium. El automatic waiting de Cypress reintenta el comando hasta que el assertion pasa o llega al timeout. Eso elimina la fragilidad de los tests por timing.

---

### `2-advanced-examples/` — La API completa de Cypress

Antes de aplicar Cypress en escenarios reales necesitaba dominar cada herramienta del framework. Estos 16 specs son esa base.

**`actions.cy.js`** *(14 tests)* — Click, double click, right click, type, clear, select, check, uncheck, trigger, drag & drop y scroll. Base de cualquier test E2E — si no sabes controlar las acciones del usuario, no puedes probar nada.

**`aliasing.cy.js`** *(2 tests)* — `.as()` para guardar referencias a elementos DOM y requests.
Si hago `cy.get('.boton')` tres veces en el mismo test, Cypress consulta el DOM tres veces. Con `.as('miBoton')` lo guardo una vez y lo reutilizo con `cy.get('@miBoton')`. En suites largas mejora velocidad y legibilidad.

**`assertions.cy.js`** *(9 tests)* — Las tres formas de afirmar: Chai BDD (`.should('be.visible')`), Chai TDD (`expect(x).to.equal(y)`) y Sinon-Chai para spies y stubs.
Este spec fue el más importante conceptualmente: un test sin assertions que fallen correctamente no detecta bugs — solo pasa siempre y da falsa confianza.

**`connectors.cy.js`** *(8 tests)* — `.then()`, `.invoke()`, `.its()`, `.and()`.
`.then()` recibe el resultado del comando anterior como argumento — es como el `.then()` de Promises pero adaptado al modelo de comandos de Cypress. `.invoke()` llama un método del elemento directamente. `.its()` accede a una propiedad sin necesidad de `.then()`.

**`cookies.cy.js`** *(7 tests)* — `cy.setCookie()`, `cy.getCookie()`, `cy.getCookies()`, `cy.clearCookies()`.
Las cookies son la base de los tests de autenticación. En lugar de hacer login por UI en cada test, puedo setear la cookie de sesión directamente y saltar el formulario, reduciendo el tiempo de ejecución cuando muchos tests necesitan estar autenticados.

**`cypress_api.cy.js`** *(10 tests)* — `Cypress.env()`, `Cypress.config()`, `Cypress.platform`, `Cypress.version`, `Cypress.spec`.
Permite tests condicionales según el ambiente: en CI se comportan diferente a local. También aprendí a leer variables de entorno sin hardcodear valores en el código del test.

**`files.cy.js`** *(4 tests)* — `cy.readFile()`, `cy.writeFile()` y fixtures JSON.
Los fixtures externalizan los datos de prueba fuera del código. Si el usuario de prueba cambia, se actualiza en un JSON y todos los tests quedan actualizados. Mismo principio que los `@DataProvider` de TestNG pero en JavaScript.

**`network_requests.cy.js`** *(6 tests)* — `cy.request()` para HTTP directo y `cy.intercept()` para capturar requests del browser.
`cy.request()` permite API testing dentro de Cypress. `cy.intercept()` captura las requests que el browser hace durante la navegación, ideal para verificar que la UI dispara las llamadas correctas al backend.

**`querying.cy.js`** *(5 tests)* — `cy.get()`, `cy.contains()`, `.within()`, `cy.root()`.
`.within()` fue el más valioso: restringe todos los `cy.get()` dentro de un elemento padre. Cuando hay múltiples formularios en la página, `.within()` garantiza que el selector apunte al correcto.

**`spies_stubs_clocks.cy.js`** *(7 tests)* — `cy.spy()`, `cy.stub()`, `cy.clock()`, `cy.tick()`, matchers de Sinon.
`cy.stub()` reemplaza una función con una versión controlada — esencial para simular respuestas sin que el request salga de verdad. `cy.clock()` y `cy.tick()` controlan el tiempo del browser para probar timers, delays y expiración de tokens sin esperar en tiempo real.

**`storage.cy.js`** *(5 tests)* — `localStorage` y `sessionStorage`: leer, limpiar y validar para todos los orígenes.
Limpiar storage entre tests garantiza aislamiento. Muchas apps guardan el estado del usuario en localStorage y si un test lo modifica, el siguiente puede recibir un estado inesperado.

**`traversal.cy.js`** *(18 tests)* — Navegar el DOM: `.children()`, `.closest()`, `.eq()`, `.filter()`, `.find()`, `.first()`, `.last()`, `.next()`, `.prev()`, `.siblings()` y variantes.
`.eq(n)` para seleccionar el enésimo elemento de una lista y `.closest()` para subir al ancestro con una clase dada, sin construir selectores CSS complejos y frágiles.

**`utilities.cy.js`** *(5 tests)* — `Cypress._` (Lodash), `Cypress.$` (jQuery), `Cypress.Blob`, `Cypress.Promise`.
Cypress integra Lodash y jQuery internamente. `Cypress.Promise` es Bluebird — la usé en los ejercicios de async para envolver valores en el chain de Cypress.

**`viewport.cy.js`** *(1 test)* — `cy.viewport()` con dimensiones y presets de dispositivos.
Una app puede pasar todos los tests en desktop y fallar en mobile si los selectores dependen de elementos que se ocultan en pantallas pequeñas. `cy.viewport('iphone-6')` cambia el tamaño del browser sin necesidad de un dispositivo real.

**`waiting.cy.js`** *(2 tests)* — `cy.wait()` con milisegundos y con alias de route.
`cy.wait('@aliasDeRequest')` espera exactamente hasta que la request con ese alias complete. Si la API responde en 200ms el test continúa en 200ms, no en un `wait(3000)` arbitrario. Tests más rápidos y menos frágiles.

**`window.cy.js`** *(3 tests)* — `cy.window()`, `cy.document()`, `cy.title()`.
`cy.window()` permite acceder al objeto global del browser durante el test — leer variables globales de JavaScript, llamar funciones de la aplicación o validar propiedades del `window` object.

---

### `PageObjetModel/` — Patrón POM

**`PageObjet.cy.js`** *(1 test)* — Navega al blog de Free Range Testers usando una clase `FreeRangeHome` que encapsula selectores y acciones. El test llama métodos de la clase sin conocer un solo selector.

Cuando un selector cambia en la UI, se modifica en la clase Page y todos los tests que la usan quedan corregidos. Sin POM, un cambio de selector obliga a buscar y reemplazar en todos los archivos que lo usan.

---

### `3-freeRangeTest/` — Técnicas avanzadas en sitios reales

**`Accessibilidad.cy.js`** *(1 test)* — `cypress-axe` para detectar violaciones WCAG en el sitio de Free Range Testers.

`cy.checkA11y()` ejecuta axe-core y reporta cada violación con: el ID de la regla WCAG, el nivel de impacto (critical/serious/moderate/minor), el selector del elemento afectado y una descripción del problema. Pocos QA juniors conocen accessibility testing automatizado.

**`SessionYCookis.cy.js`** *(4 tests)* — Ciclo completo de sesiones y cookies:

1. `cy.session()` para persistir el login entre tests sin repetir el flujo de autenticación en cada `it()`
2. `cy.clearCookies()` y validar que el estado se resetea completamente
3. `cy.setCookie()` con valor personalizado y validación de propiedad
4. Login completo con inspección de todas las cookies activas

El test original apuntaba a `localhost:3000` — no funciona en CI. Reescribirlo sobre URL pública fue la primera vez que entendí concretamente qué significa "environment-independent testing".

**`Tablas.cy.js`** *(4 tests)* — Tablas HTML estáticas sobre `the-internet.herokuapp.com/tables`:

1. Validar estructura: tabla visible con headers y filas
2. Leer valor de celda específica por fila y columna
3. Ordenar por columna "Last Name" y verificar que el resultado está alfabéticamente ordenado
4. Validar que el número de columnas es el esperado

El test original fallaba con regex `/\d+(\.\d+)? MB\/s/` cuando la tabla devolvía `Mbps`. Cambié a datos estáticos y deterministas: una tabla con datos dinámicos es un ambiente inestable para assertions exactas.

**`HomePage.cy.js`** *(4 tests)* — Tests adaptativos sobre Free Range Testers.

El test original buscaba `'Talleres'` en el menú — el sitio lo renombró. Lección: tests sobre sitios externos deben validar comportamiento general (status 200, header existe, links presentes) en lugar de texto exacto. Tests frágiles que fallan por cambios de contenido generan ruido y erosionan la confianza en la suite.

**`PromesasCypress.cy.js`** *(4 tests)* — Async en Cypress:

1. `Cypress.Promise` con `setTimeout`
2. `cy.request()` a API pública con validación de body
3. Manejo de errores con `failOnStatusCode: false` — `.catch()` nativo no funciona en el chain de Cypress
4. `Cypress.Promise` con delay controlado

**`TestPopup.cy.js`** *(1 test)* — Manejo de popups. Cypress maneja popups del mismo origen con `cy.get()` normal. Para popups de origen cruzado se necesita `cy.origin()`.

---

### `Apis-Test/` — API testing y patrones avanzados

**`Api.cy.js`** *(2 tests)* — PUT y DELETE sobre `jsonplaceholder.typicode.com`. Valida status codes y estructura del body de respuesta directamente desde Cypress sin abrir browser.

**`Ejemplo-Feature.cy.js`** *(1 test)* — Login con credenciales de `fixtures/profile.json` usando `cy.fixture()`.

Bug encontrado y corregido: `before()` con arrow function no preserva `this.testdata` hacia el `it()`. Fix: `beforeEach(function() {})` con sintaxis tradicional. Un error de contexto de JavaScript con consecuencias concretas en Cypress.

**`Ejemplos-TetsData-feature.cy.js`** *(5 tests)* — Data-driven: array de `{ titulo, url }` que genera un `it()` por cada par con `forEach`. Si se agrega una URL, se agrega un test sin duplicar código. Equivalente a `@DataProvider` de TestNG.

**`Intercet.cy.js`** *(1 test)* — `cy.intercept()` con stub: intercepta el GET antes de que llegue al servidor y devuelve datos controlados. Esencial para aislar frontend de backend y probar cómo la UI maneja respuestas de error sin forzar errores en el servidor real.

**`Login-Db-Seeding.cy.js`** *(1 test)* — Login vía API directamente, sin pasar por UI. Patrón profesional: un `cy.request('POST', '/login', credentials)` devuelve la cookie de sesión y el siguiente test la hereda. Cuando muchos tests necesitan autenticación, eliminar el flujo de UI en cada setup reduce el tiempo total en 30-40%.

**`Login.cy.js`** *(1 test)* — Comando personalizado `cy.login()` definido en `cypress/support/commands.js`. Encapsula el flujo de autenticación y está disponible globalmente. `cy.login('user', 'pass')` es más expresivo que 5 líneas de selectores y clicks repetidos.

**`iFrameTesting.cy.js`** *(1 test)* — Acceder y validar contenido dentro de un iframe. Cypress no puede interactuar directamente con iframes. La solución: `.its('0.contentDocument.body')` accede al `contentDocument` del iframe y lo envuelve en Cypress para usar comandos normales sobre él. Uno de los casos más complejos del framework.

---

## Estructura del proyecto

```
Cypress-E2E-Automation/
├── .github/
│   └── workflows/
│       └── cypress.yml              ← CI/CD + Allure Pages
├── cypress/
│   ├── e2e/
│   │   ├── 1-getting-started/
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
│   │   ├── 3-freeRangeTest/
│   │   │   ├── Accessibilidad.cy.js
│   │   │   ├── HomePage.cy.js
│   │   │   ├── PromesasCypress.cy.js
│   │   │   ├── SessionYCookis.cy.js
│   │   │   ├── Tablas.cy.js
│   │   │   └── TestPopup.cy.js
│   │   ├── Apis-Test/
│   │   │   ├── Api.cy.js
│   │   │   ├── Ejemplo-Feature.cy.js
│   │   │   ├── Ejemplos-TetsData-feature.cy.js
│   │   │   ├── iFrameTesting.cy.js
│   │   │   ├── Intercet.cy.js
│   │   │   ├── Login-Db-Seeding.cy.js
│   │   │   └── Login.cy.js
│   │   └── PageObjetModel/
│   │       └── PageObjet.cy.js
│   ├── fixtures/
│   │   ├── profile.json             ← Credenciales de test
│   │   ├── titulos.json
│   │   └── users.json
│   ├── Pages/
│   │   └── FreeRangeHome.js         ← Page Object class
│   └── support/
│       ├── commands.js              ← cy.login() y custom commands
│       └── e2e.js                   ← import allure-cypress + cypress-axe
├── cypress.config.js
└── package.json
```

---

## Pipeline CI/CD

Corre en cada push a `main` y en cada Pull Request. 4 jobs en paralelo, reporte Allure publicado automáticamente en GitHub Pages.

```
Push a main / Pull Request
         │
    ┌────┴──────────────────────────────────────┐
    │              │              │              │
Getting        Advanced       FreeRange       API
Started        Examples       + POM          Tests
    │              │              │              │
    └──────────────┴──────────────┴──────────────┘
                         │
              allure-report (job final)
                         │
              ┌──────────┴──────────┐
         Merge resultados      Deploy GitHub Pages
         de los 4 jobs    →   ipanaque94.github.io/
                              Cypress-E2E-Automation/
```

---

## Activar GitHub Pages (una sola vez)

Después del primer push:

1. Ve a tu repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** → **/ (root)**
4. Click **Save**

El reporte quedará en: `https://ipanaque94.github.io/Cypress-E2E-Automation/`

---

## Cómo ejecutar localmente

```bash
git clone https://github.com/ipanaque94/Cypress-E2E-Automation.git
cd Cypress-E2E-Automation
npm install

# Modo interactivo
npx cypress open

# Headless Chrome
npx cypress run --browser chrome

# Suite específica
npx cypress run --spec "cypress/e2e/Apis-Test/**/*.cy.js" --browser chrome

# Ver reporte Allure local
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## Stack

| Herramienta | Versión | Uso |
|-------------|---------|-----|
| Cypress | 14 | Framework E2E principal |
| JavaScript | ES2020 | Lenguaje de los tests |
| allure-cypress | 3.x | Reporte Allure con trazabilidad por test |
| cypress-axe | 1.x | Accessibility testing WCAG |
| mochawesome | 7.x | Reporte HTML alternativo |
| GitHub Actions | — | CI/CD paralelo en cada push |
| GitHub Pages | — | Publicación automática del reporte Allure |

---

## Técnicas cubiertas

| Categoría | Técnicas |
|-----------|----------|
| Patrones | Page Object Model, custom commands, fixtures JSON |
| UI Testing | Selectores, DOM traversal, viewport, drag & drop |
| API Testing | `cy.request()`, validación de status y body |
| Async | `cy.session()`, Promises, `cy.clock()`, `cy.tick()` |
| Avanzado | Intercept + stub, spies, iFrame, accessibility (axe) |
| Datos | Data-driven con `forEach`, fixtures externalizados |
| Reportes | Allure publicado en GitHub Pages, Mochawesome HTML |
| CI/CD | Jobs paralelos, artefactos automáticos, deploy Pages |

---

## Autor

**Enoc Ipanaque** — Lima, Perú
QA Automation Engineer | Selenium · Playwright · Cypress · Rest Assured · AWS

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Enoc_Ipanaque-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/enoc-isaac-ipanaque-rodas-b3729a283)
[![GitHub](https://img.shields.io/badge/GitHub-ipanaque94-181717?style=flat&logo=github)](https://github.com/ipanaque94)
[![Email](https://img.shields.io/badge/Email-rodasenoc4@gmail.com-EA4335?style=flat&logo=gmail)](mailto:rodasenoc4@gmail.com)
