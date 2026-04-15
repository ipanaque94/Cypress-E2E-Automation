# Cypress E2E Automation 

![Cypress](https://img.shields.io/badge/Cypress-17202C?style=flat&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-145_passing-brightgreen)

Suite de automatización E2E construida con Cypress y JavaScript. Cubre UI testing, API testing, accesibilidad, Page Object Model, gestión de sesiones y cookies, intercept de requests, data-driven testing con fixtures y comandos personalizados. Pipeline CI/CD con GitHub Actions que corre en cada push a `main`.

---

## Por qué construí esto

Cuando empecé a estudiar Cypress me di cuenta de que la mayoría de proyectos de práctica tienen 3 o 4 tests básicos contra una sola pantalla y sin ninguna organización real. Quería entender cómo trabaja un QA en una empresa de verdad — con múltiples tipos de prueba, datos externalizados en fixtures, patrones de diseño reutilizables y un pipeline que detecta regresiones automáticamente.

El proceso no fue lineal. Estos son los problemas reales que resolví:

**El contexto `this` en Cypress rompe los fixtures.** Mezclé arrow functions con `function()` en los hooks y `this.testdata` llegaba `undefined` al `it()`. La causa: el `before(() => {})` no preserva el contexto hacia el test. La solución fue cambiar a `beforeEach(function() {})` con sintaxis tradicional en todos los tests que leen fixtures.

**Tests acoplados a sitios externos que cambian.** Varios tests probaban el sitio de Free Range Testers. Cuando actualizaron su menú y renombraron páginas, los tests fallaron sin tocar una sola línea de mi código. Eso me enseñó la diferencia entre un bug del producto y un test desactualizado por cambio de ambiente — y por qué los tests deben validar comportamiento general en lugar de texto exacto que puede cambiar.

**`.catch()` no existe en el chain de Cypress.** Intenté encadenar `.catch()` directamente sobre `cy.wrap().then().then()` como haría con una Promise nativa. Cypress no expone ese método. La solución fue manejar el error dentro del `.then()` usando `cy.request({ failOnStatusCode: false })`.

**Tests que dependen de servidor local no corren en CI.** El test de sesiones apuntaba a `localhost:3000`. En GitHub Actions ese servidor no existe. Lo reescribí usando `the-internet.herokuapp.com`, que es pública, estable y no requiere infraestructura propia.

**Regex con unidades incorrectas.** El test de tablas dinámicas fallaba porque el regex `/\d+(\.\d+)? MB\/s/` no coincidía con el formato real de la tabla que devuelve `Mbps`. Un caracter de diferencia en la unidad tira el test completo.

---

## Resultados de ejecución

```
Suites: 34 | Tests: 145 | Passing: 145 | Failing: 0 | Duración: ~4:30
```

| Carpeta | Suites | Tests | Estado |
|---------|--------|-------|--------|
| 1-getting-started | 1 | 6 | ✅ |
| 2-advanced-examples | 16 | 118 | ✅ |
| PageObjetModel | 1 | 1 | ✅ |
| 3-freeRangeTest | 6 | 13 | ✅ |
| Apis-Test | 7 | 7 | ✅ |

---

## Qué se prueba y qué aprendí en cada carpeta

### `1-getting-started/` — Fundamentos del framework

**`todo.cy.js`** — Prueba una app de To-Do completa: agregar tareas, marcarlas completadas, filtrar por estado y eliminarlas.

No es trivial aunque parezca simple. Ejercita los comandos más usados en cualquier proyecto real: `cy.get()`, `cy.type()`, `.check()`, `.should()`, `.contains()`. Fue el primer test donde entendí que Cypress espera automáticamente que los elementos aparezcan en el DOM — no hay que poner `cy.wait(2000)` manualmente como en Selenium.

---

### `2-advanced-examples/` — Dominar la API completa de Cypress

Antes de aplicar Cypress en casos reales, necesitaba dominar cada herramienta del framework. Estos 16 specs son esa base.

**`actions.cy.js`** — Click, double click, right click, type, clear, select, check, uncheck, trigger, drag & drop y scroll.

Aprendí que Cypress tiene comandos de acción de alto nivel que imitan exactamente lo que hace un usuario. El `.trigger()` es especialmente útil para eventos de mouse que no tienen comando directo.

**`aliasing.cy.js`** — `.as()` para guardar referencias a elementos del DOM y a requests interceptados.

El problema que resuelve: si hago `cy.get('.boton')` tres veces en el mismo test, Cypress consulta el DOM tres veces. Con `.as('miBoton')` lo guardo una vez y lo reutilizo con `cy.get('@miBoton')`. En tests largos esto mejora velocidad y legibilidad.

**`assertions.cy.js`** — Las tres formas de afirmar en Cypress: Chai BDD (`.should('be.visible')`), Chai TDD (`expect(x).to.equal(y)`) y Should.js.

Este fue uno de los specs más importantes del curso. Entender qué y cómo afirmar es el núcleo del testing — un test sin assertions que falle correctamente no detecta bugs.

**`connectors.cy.js`** — `.then()`, `.invoke()`, `.its()`, `.and()`.

Aprendí cómo manipular valores dentro del chain sin romper la sintaxis de Cypress. `.then()` recibe el resultado del comando anterior como argumento — es como el `.then()` de las Promises pero adaptado al modelo síncrono de Cypress.

**`cookies.cy.js`** — `cy.setCookie()`, `cy.getCookie()`, `cy.getCookies()`, `cy.clearCookies()`.

Las cookies son esenciales para tests de autenticación. En lugar de hacer login por UI en cada test, puedo setear la cookie de sesión directamente y saltar el formulario. Eso reduce el tiempo de ejecución cuando muchos tests necesitan estar autenticados.

**`cypress_api.cy.js`** — La API de configuración interna: `Cypress.env()`, `Cypress.config()`, `Cypress.platform`, `Cypress.version`, `Cypress.spec`.

Útil para tests condicionales según el ambiente: si el test corre en CI se comporta diferente a local. También aprendí a leer variables de entorno desde el `cypress.config.js` sin hardcodearlas en el test.

**`files.cy.js`** — `cy.readFile()`, `cy.writeFile()` y manejo de fixtures.

Los fixtures son archivos JSON que externalizan los datos de prueba fuera del código. Si el nombre de usuario de prueba cambia, se actualiza en el JSON y todos los tests que lo usan quedan actualizados. Es el mismo principio que los parámetros en los tests parametrizados de TestNG.

**`location.cy.js`** — `cy.location()` para validar partes específicas de la URL: protocolo, host, pathname, hash, search.

Más preciso que `cy.url().should('include', '/ruta')` porque valida solo la parte que importa sin que el resto de la URL afecte el resultado.

**`misc.cy.js`** — `cy.end()`, `cy.exec()`, `cy.focused()`, `cy.screenshot()`, `cy.wrap()`.

`cy.wrap()` fue el más relevante: permite envolver cualquier valor de JavaScript en el chain de Cypress y aplicarle comandos de Cypress directamente. Muy usado para Promises y objetos complejos.

**`navigation.cy.js`** — `cy.go()` (atrás/adelante en el historial), `cy.reload()` y `cy.visit()` con opciones.

Aprendí que `cy.reload()` acepta `{ forceReload: true }` para ignorar el cache — útil para tests de comportamiento post-reload donde el estado guardado en memoria no debería persistir.

**`network_requests.cy.js`** — `cy.request()` para hacer HTTP directamente y `cy.intercept()` para capturar requests del browser.

Este spec fue clave. `cy.request()` permite hacer API testing dentro de Cypress — GET, POST, PUT, DELETE con validación de status, headers y body. `cy.intercept()` captura las requests que el browser hace naturalmente durante la navegación, ideal para verificar que la UI dispara las llamadas correctas.

**`querying.cy.js`** — `cy.get()`, `cy.contains()`, `.within()`, `cy.root()`.

`.within()` fue el más valioso: restringe todos los `cy.get()` dentro de un elemento padre. Cuando hay múltiples formularios en la página, `.within()` garantiza que el selector apunte al correcto sin tener que usar selectores más complejos.

**`spies_stubs_clocks.cy.js`** — `cy.spy()`, `cy.stub()`, `cy.clock()`, `cy.tick()`, matchers de Sinon.

Técnicas avanzadas que pocos juniors conocen. `cy.stub()` reemplaza una función con una versión controlada — útil para simular respuestas de API sin que el request salga de verdad. `cy.clock()` congela el tiempo del browser y `cy.tick()` lo mueve manualmente — esencial para probar timers, delays y expiración de tokens sin esperar en tiempo real.

**`storage.cy.js`** — `cy.getAllLocalStorage()`, `cy.clearAllLocalStorage()`, `cy.getAllSessionStorage()`, `cy.clearAllSessionStorage()`.

Muchas aplicaciones guardan el estado del usuario en localStorage. Limpiar storage entre tests garantiza aislamiento: el test 2 no hereda datos que dejó el test 1.

**`traversal.cy.js`** — 18 comandos para navegar el DOM: `.children()`, `.closest()`, `.eq()`, `.filter()`, `.find()`, `.first()`, `.last()`, `.next()`, `.prev()`, `.siblings()` y variantes.

El más usado en la práctica fue `.eq(n)` para seleccionar el enésimo elemento de una lista, y `.closest()` para subir al ancestro más cercano con una clase dada — sin tener que construir selectores CSS complejos.

**`utilities.cy.js`** — `Cypress._` (Lodash), `Cypress.$` (jQuery), `Cypress.Blob`, `Cypress.minimatch`, `Cypress.Promise`.

Cypress integra Lodash y jQuery internamente. `Cypress._` da acceso a toda la librería Lodash para manipular arrays y objetos dentro de los tests. `Cypress.Promise` es la versión de Bluebird — la usé en los ejercicios de async.

**`viewport.cy.js`** — `cy.viewport()` con dimensiones exactas y con presets de dispositivos.

Una app puede pasar todos los tests en desktop y fallar en mobile si los selectores dependen de elementos que se ocultan en pantallas pequeñas. `cy.viewport('iphone-6')` cambia el tamaño del browser al de un iPhone 6 sin necesidad de un dispositivo real.

**`waiting.cy.js`** — `cy.wait()` con milisegundos y con alias de route.

El `cy.wait('@aliasDeRequest')` fue la revelación: en lugar de `cy.wait(3000)` que hace el test frágil y lento, espero exactamente hasta que la request con ese alias complete. Si la API responde en 200ms, el test continúa en 200ms, no en 3000.

**`window.cy.js`** — `cy.window()` para acceder al objeto global del browser, `cy.document()` y `cy.title()`.

`cy.window()` permite ejecutar código directamente en el contexto del browser durante el test — acceder a variables globales de JavaScript, llamar funciones de la aplicación o leer propiedades del `window` object.

---

### `PageObjetModel/` — Patrón POM aplicado

**`PageObjet.cy.js`** — Navega al blog de Free Range Testers usando una clase `FreeRangeHome` que encapsula todos los selectores y acciones. El test solo llama métodos de la clase, sin conocer un solo selector.

**Por qué POM importa:** cuando un selector cambia en la UI, se actualiza en un solo lugar — la clase Page — y todos los tests que la usan quedan corregidos automáticamente. Sin POM, un cambio de selector obliga a buscar y reemplazar en decenas de archivos. Implementarlo bien en Cypress requiere entender cómo exportar clases y cómo Cypress encadena los comandos de la clase con su propio chain.

---

### `3-freeRangeTest/` — Técnicas avanzadas en sitios reales

**`Accessibilidad.cy.js`** — Usa `cypress-axe` para detectar violaciones WCAG en el link de Cursos del sitio de Free Range Testers.

Es uno de los tipos de test menos conocidos entre QA juniors. `cy.checkA11y()` ejecuta el motor de axe-core y reporta cada violación con el ID de la regla WCAG, el impacto (critical/serious/moderate/minor), el selector del elemento afectado y una descripción del problema. Automatizar accessibility testing demuestra que no solo valido flujos funcionales sino que pienso en calidad inclusiva — algo que cada vez más empresas exigen.

**`SessionYCookis.cy.js`** — 4 tests que cubren el ciclo completo de sesiones y cookies sobre `the-internet.herokuapp.com`:

1. `cy.session()` para persistir el login entre tests sin repetir el flujo de autenticación en cada `it()`
2. Limpiar todas las cookies con `cy.clearCookies()` y verificar que el estado se resetea
3. Setear una cookie personalizada con `cy.setCookie()` y validar su valor y existencia
4. Login completo con inspección de todas las cookies activas en la sesión

El test original apuntaba a `localhost:3000` con un servidor local que no existe en CI. Reescribirlo sobre una URL pública fue la primera vez que entendí concretamente qué significa "environment-independent testing".

**`Tablas.cy.js`** — 4 tests sobre tablas HTML estáticas:

1. Validar que la tabla existe y tiene contenido visible
2. Confirmar que headers y filas tienen la estructura esperada
3. Leer el valor de una celda específica por fila y columna
4. Ordenar por columna "Last Name" y verificar que el resultado está ordenado alfabéticamente

El test original fallaba con un regex que esperaba formato `MB/s` cuando la tabla devolvía `Mbps`. Cambié la estrategia a usar `the-internet.herokuapp.com/tables` porque tiene datos estáticos y deterministas — una tabla con datos dinámicos es un ambiente inestable para assertions exactas sobre valores.

**`HomePage.cy.js`** — Tests adaptativos sobre el sitio actual de Free Range Testers.

El test original buscaba un enlace llamado `'Talleres'` que el sitio renombró. La lección aprendida: los tests sobre sitios externos deben validar comportamiento general (`¿el status HTTP es 200?`, `¿el header existe?`, `¿la página tiene enlaces?`) en lugar de texto exacto que puede cambiar con cualquier actualización de contenido. Tests frágiles que fallan por cambios de negocio generan ruido y erosionan la confianza en la suite.

**`PromesasCypress.cy.js`** — 4 ejercicios de async en Cypress:

1. `Cypress.Promise` con `setTimeout` — la forma nativa de Cypress para Promises
2. `cy.request()` a API pública y validación del body de respuesta
3. Manejo de errores de requests con `failOnStatusCode: false` — el `.catch()` nativo de JavaScript no funciona en el chain de Cypress porque Cypress no expone ese método
4. `Cypress.Promise` con delay controlado

El Ejercicio 3 fue el más difícil: `.catch()` lanzaba `TypeError: cy.wrap(...).then(...).then(...).catch is not a function`. Entender por qué — el chain de Cypress no es una Promise estándar aunque use sintaxis similar — fue uno de los aprendizajes más profundos del curso.

**`TestPopup.cy.js`** — Abre y valida un popup. Cypress maneja popups dentro del mismo origen con `cy.get()` normal sobre la ventana emergente. Para popups de origen cruzado se necesita `cy.origin()`.

---

### `Apis-Test/` — API testing y técnicas avanzadas

**`Api.cy.js`** — PUT y DELETE sobre `jsonplaceholder.typicode.com`. Valida status codes (200, 204) y estructura del body de respuesta.

El primer contacto con API testing dentro de Cypress. `cy.request()` hace el HTTP request directamente sin abrir un browser — más rápido que navegar a la UI y más ligero que una herramienta separada.

**`Ejemplo-Feature.cy.js`** — Login con credenciales externalizadas en `fixtures/profile.json` usando `cy.fixture()`.

El bug que encontré y corregí: el `before()` con arrow function no preserva `this.testdata` hacia el `it()` porque el contexto `this` se resetea entre el hook y el test. El fix fue cambiar `before` a `beforeEach` y usar `function()` en lugar de arrow function en ambos. Un error de contexto de JavaScript que en Cypress tiene consecuencias concretas.

**`Ejemplos-TetsData-feature.cy.js`** — Data-driven testing: un array de `{ titulo, url }` genera automáticamente un `it()` por cada par. Si se agrega una URL al array, se agrega un test sin duplicar código.

Este es el patrón de test parametrizado que en TestNG se hace con `@DataProvider`. Implementarlo en Cypress con un simple `forEach` sobre un array de datos fue una de las técnicas que más impacto tiene en la mantenibilidad de la suite.

**`Intercet.cy.js`** — `cy.intercept()` con stub: intercepta el GET a `/posts` antes de que llegue al servidor y devuelve un response controlado con datos ficticios.

Técnica esencial para aislar el frontend del backend en los tests. Si el servidor está caído o los datos son no deterministas, el stub garantiza que el test siempre recibe los datos esperados. También permite probar cómo el frontend maneja respuestas de error sin tener que forzar errores en el servidor real.

**`Login-Db-Seeding.cy.js`** — Login vía API directamente, sin pasar por la UI.

Patrón profesional: en lugar de llenar el formulario de login en cada test que necesita autenticación, se hace un `cy.request('POST', '/login', { credentials })` y se usa la cookie de sesión que devuelve. Cuando muchos tests necesitan autenticación, esto puede reducir el tiempo de ejecución en un 30-40% porque elimina el flujo completo de UI en el setup de cada test.

**`Login.cy.js`** — Comando personalizado `cy.login()` que encapsula el flujo de autenticación y reutilizable en cualquier test de la suite.

Los custom commands se definen en `cypress/support/commands.js` y quedan disponibles globalmente. El patrón: cuando varios tests necesitan la misma secuencia de pasos, extraerla a un comando evita duplicación y hace que los tests sean más legibles — `cy.login('user', 'pass')` es más expresivo que 5 líneas de selectores y clicks.

**`iFrameTesting.cy.js`** — Acceder y validar contenido dentro de un iframe.

Cypress no puede interactuar con iframes directamente porque son documentos separados. La solución: `.its('0.contentDocument.body')` accede al `contentDocument` del iframe y lo envuelve en Cypress para poder usar comandos normales sobre él. Es uno de los casos técnicamente más complejos del framework y uno de los que más aparecen en proyectos reales con integraciones de terceros.

---

## Estructura del proyecto

```
Cypress-E2E-Automation/
├── .github/
│   └── workflows/
│       └── cypress.yml          ← Pipeline CI/CD
├── cypress/
│   ├── e2e/
│   │   ├── 1-getting-started/
│   │   │   └── todo.cy.js
│   │   ├── 2-advanced-examples/
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
│   │   ├── profile.json
│   │   ├── titulos.json
│   │   └── users.json
│   ├── Pages/
│   │   └── FreeRangeHome.js     ← Page Object class
│   └── support/
│       ├── commands.js           ← cy.login() y otros custom commands
│       └── e2e.js
├── cypress.config.js
└── package.json
```

---

## Pipeline CI/CD — GitHub Actions

Corre automáticamente en cada push a `main` y en cada Pull Request. Los 4 jobs corren en paralelo sobre Chrome para reducir el tiempo total de la suite.

```
Push a main / Pull Request
         │
    ┌────┴────────────────────────────────────┐
    │            │             │              │
getting-    advanced-    freerange-       api-tests
started     examples      tests
    │            │             │              │
    └────────────┴─────────────┴──────────────┘
                          │
              Artefactos disponibles 7 días:
              ├── Screenshots (solo en fallo)
              ├── Videos de cada spec
              └── Reporte Mochawesome HTML
```

Los artefactos quedan en **Actions → Run → Artifacts** por 7 días.

---

## Cómo ejecutar localmente

**Requisitos:** Node.js 18+

```bash
# Clonar el repositorio
git clone https://github.com/ipanaque94/Cypress-E2E-Automation.git
cd Cypress-E2E-Automation

# Instalar dependencias
npm install

# Modo interactivo — recomendado para desarrollo
npx cypress open

# Todos los tests en headless
npx cypress run --browser chrome

# Una carpeta específica
npx cypress run --spec "cypress/e2e/Apis-Test/**/*.cy.js"
npx cypress run --spec "cypress/e2e/3-freeRangeTest/**/*.cy.js"
npx cypress run --spec "cypress/e2e/2-advanced-examples/**/*.cy.js"
```

---

## Técnicas cubiertas

| Categoría | Técnica |
|-----------|---------|
| Patrones | Page Object Model, custom commands, fixtures JSON |
| UI Testing | Selectores, traversal, viewport, drag & drop |
| API Testing | `cy.request()`, validación de status y body |
| Async | `cy.session()`, Promises, `cy.clock()`, `cy.tick()` |
| Avanzado | Intercept + stub, spies, iFrame testing, accessibility (axe) |
| Datos | Data-driven con `forEach`, fixtures externalizados |
| CI/CD | GitHub Actions, jobs paralelos, artefactos automáticos |

---

## Stack

| Herramienta | Uso |
|-------------|-----|
| Cypress 13+ | Framework E2E principal |
| JavaScript ES2020 | Lenguaje de los tests |
| cypress-axe | Accessibility testing WCAG |
| Mochawesome | Reporte HTML de resultados |
| GitHub Actions | CI/CD — corre en cada push |

---

## Autor

**Enoc Ipanaque** — Lima, Perú
QA Automation Engineer | Selenium · Playwright · Cypress · Rest Assured · AWS

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Enoc_Ipanaque-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/enoc-isaac-ipanaque-rodas-b3729a283)
[![GitHub](https://img.shields.io/badge/GitHub-ipanaque94-181717?style=flat&logo=github)](https://github.com/ipanaque94)
[![Email](https://img.shields.io/badge/Email-rodasenoc4@gmail.com-EA4335?style=flat&logo=gmail)](mailto:rodasenoc4@gmail.com)
