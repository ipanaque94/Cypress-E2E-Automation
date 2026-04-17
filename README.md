<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,50:161b22,100:1f2937&height=200&section=header&text=Cypress%20E2E%20Automation&fontSize=40&fontColor=58a6ff&fontAlignY=40&desc=QA%20Automation%20Framework%20%7C%20145%20Tests%20%7C%20Allure%20%2B%20CI%2FCD&descAlignY=60&descColor=8b949e" width="100%"/>

</div>

<div align="center">

[![CI](https://github.com/ipanaque94/Cypress-E2E-Automation/actions/workflows/cypress.yml/badge.svg)](https://github.com/ipanaque94/Cypress-E2E-Automation/actions/workflows/cypress.yml)
[![Allure](https://img.shields.io/badge/%F0%9F%93%8A_Allure-Ver_reporte_en_vivo-58a6ff?style=flat)](https://ipanaque94.github.io/Cypress-E2E-Automation/)
[![Cypress](https://img.shields.io/badge/Cypress-14-17202C?style=flat&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![JS](https://img.shields.io/badge/JavaScript-ES2020-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Tests](https://img.shields.io/badge/145_tests-passing-22c55e?style=flat&logo=checkmarx&logoColor=white)](https://github.com/ipanaque94/Cypress-E2E-Automation/actions)

<br/>

**[📊 Ver reporte Allure en vivo →](https://ipanaque94.github.io/Cypress-E2E-Automation/)**

</div>

---

## 🧠 Enfoque como QA

> Este proyecto no está diseñado solo para ejecutar tests — está diseñado para **detectar problemas reales y comunicarlos con claridad**.

La diferencia entre un test que "pasa" y un test que **garantiza calidad** está en las decisiones detrás de él: qué se valida, por qué, y cómo se comporta cuando el sistema falla de verdad.

```
✔ Detección de falsos positivos y negativos
✔ Tests estables y reproducibles en cualquier entorno
✔ Aislamiento entre tests — sin estado compartido
✔ Reportes que cualquier persona del equipo puede leer
✔ Pipeline automático que detecta regresiones en cada push
```

---

## 📊 Resultados

<div align="center">

| | Getting Started | Advanced Examples | FreeRange + POM | API Tests | **TOTAL** |
|---|:---:|:---:|:---:|:---:|:---:|
| 🧪 Specs | 1 | 16 | 6 | 7 | **34** |
| ✅ Tests | 6 | 118 | 13 | 7 | **146** |
| ⏱ Duración | ~0:05 | ~1:45 | ~1:10 | ~0:30 | **~4:30** |
| Estado | ✅ | ✅ | ✅ | ✅ | ✅ |

</div>

---

## 🧩 Problemas reales resueltos

> Esta sección no describe lo que aprendí en un tutorial. Describe lo que encontré cuando el tutorial terminó — los problemas reales que tuve que entender desde adentro para resolverlos. Cada uno cambió cómo pienso sobre QA.

---

### 🔍 Tests inestables por datos externos que cambian sin avisar

Varios tests fallaban sin que yo hubiera tocado una sola línea de código. El sitio que estaba probando actualizó su menú: renombró un enlace, cambió el título de una página. Mis tests — que buscaban texto exacto — fallaron. Desde afuera parecía un bug del sistema. Era un problema de diseño del test.

**Lo que aprendí sobre QA:** un test que falla por un cambio de contenido cuando el sistema está funcionando bien es un falso positivo. Y los falsos positivos son costosos: generan ruido, consumen tiempo de diagnóstico y, eventualmente, hacen que el equipo deje de confiar en la suite. Cuando eso pasa, los tests pierden su valor — pueden fallar por un bug real y nadie lo nota porque aprendieron a ignorarlos.

**Cómo lo resolví:** separé lo que es comportamiento (¿la página carga?, ¿el header existe?, ¿el status HTTP es 200?) de lo que es contenido (¿el texto dice exactamente "Talleres"?). Los tests validan el primero. El contenido puede cambiar sin que eso sea un bug.

---

### 🔍 Fallos en CI por dependencia de infraestructura local

Un test de sesiones y cookies apuntaba a `localhost:3000` — un servidor que yo había levantado localmente para practicar. En mi máquina pasaba perfectamente. En GitHub Actions fallaba con `ECONNREFUSED` porque el runner de CI no tiene ese servidor.

**Lo que aprendí sobre QA:** un test que solo funciona en mi máquina no es un test automatizado. Es un script manual que alguien tiene que ejecutar a mano con la infraestructura correcta preparada de antemano. La automatización solo tiene valor real cuando el test puede correr en cualquier entorno, sin intervención humana, en cualquier momento.

El criterio que adopté: antes de subir cualquier test me pregunto "¿puede correr esto en una máquina vacía recién creada?". Si la respuesta es no, hay una dependencia que resolver antes de llamarlo automatizado.

**Cómo lo resolví:** reescribí todos los tests de sesiones usando `the-internet.herokuapp.com`, un entorno público y estable sin dependencias de infraestructura propia. El test ahora corre igual en local, en CI y en cualquier otra máquina.

---

### 🔍 Falsos positivos en manejo de errores HTTP

Estaba probando cómo la aplicación maneja respuestas de error de la API. El problema: Cypress por defecto lanza una excepción cuando recibe un status 4xx o 5xx, y el test fallaba en el paso de la request — antes de llegar al assertion que yo quería validar.

El resultado era un test que "falla" pero por la razón equivocada. No estaba detectando un bug del sistema — estaba chocando con el comportamiento por defecto de Cypress antes de poder hacer la validación real.

**Lo que aprendí sobre QA:** hay una diferencia importante entre un test que falla porque el sistema tiene un bug y un test que falla porque el framework se comporta de una manera que no esperabas. Confundirlos desperdicia tiempo de diagnóstico y puede llevar a "corregir" algo que no está roto.

**Cómo lo resolví:** usar `failOnStatusCode: false` le dice a Cypress explícitamente que un status de error es un resultado válido para este test. No es una forma de ignorar el error — es una forma de decirle al framework "sé lo que voy a recibir, déjame validarlo yo".

---

### 🔍 Falta de aislamiento entre tests — estado que se filtra entre tests

Algunos tests fallaban de forma intermitente: pasaban cuando corrían solos, fallaban cuando corrían con otros. El problema era estado compartido: cookies de una sesión anterior, datos en `localStorage`, variables globales que un test modificaba y el siguiente heredaba sin saberlo.

**Lo que aprendí sobre QA:** los tests intermitentes son más peligrosos que los tests que siempre fallan. Un test que siempre falla es un problema visible que alguien va a corregir. Un test que falla una de cada tres veces lleva a conversaciones de "en mi máquina pasa", dificulta el diagnóstico y puede ocultar bugs reales que aparecen solo en ciertas condiciones de estado.

El aislamiento no es un detalle de implementación — es una decisión de diseño que afecta la confiabilidad de toda la suite.

**Cómo lo resolví:** `cy.session()` para encapsular el estado de autenticación por test, `cy.clearCookies()` y limpieza de `localStorage` en el setup, y fixtures externos para que los datos de entrada nunca dependan del estado que dejó el test anterior.

---

### 🔍 Reporte Allure se generaba vacío — el reporter estaba configurado pero no escuchaba

Configuré `allureCypress` en `cypress.config.js`, el pipeline corría sin errores, se generaba la carpeta `allure-report`... pero no aparecía ningún test adentro. Solo la página en blanco de Allure con cero resultados.

El problema no estaba en el workflow ni en la configuración — estaba en cómo funciona `allure-cypress` internamente. El reporter tiene dos partes: una en Node.js que recibe la configuración, y otra en el browser que escucha los eventos de cada test. Sin importar `allure-cypress` en `cypress/support/e2e.js`, el lado del browser nunca se activa. El reporter está registrado pero sordo.

**Lo que aprendí sobre QA:** los reportes no son un detalle de entrega — son la forma en que el equipo toma decisiones. Un reporte vacío o incorrecto es tan problemático como un test que falla por la razón equivocada: oculta información que alguien necesita. Entender cómo funciona tu herramienta de reporting desde adentro es parte del trabajo de QA, no un extra.

**Cómo lo resolví:** `import "allure-cypress"` en `cypress/support/e2e.js` activa el listener del lado del browser. Además, aislé los resultados Allure por job en CI para evitar que resultados de runs anteriores contaminaran el reporte actual.

---

## 🗂️ Cobertura del framework

<details>
<summary><b>🖥️ UI Testing — interacciones, DOM y responsive</b></summary>
<br/>

| Técnica | Spec | Descripción |
|---------|------|-------------|
| Acciones de usuario | `actions.cy.js` | Click, type, drag & drop, scroll, select, check |
| DOM traversal | `traversal.cy.js` | 18 comandos para navegar entre elementos |
| Responsive | `viewport.cy.js` | `cy.viewport()` con presets de dispositivos reales |
| Querying | `querying.cy.js` | `cy.get()`, `cy.contains()`, `.within()`, `cy.root()` |
| Navegación | `navigation.cy.js` | `cy.go()` (historial), `cy.reload()` con opciones |
| Window | `window.cy.js` | `cy.window()`, `cy.document()`, `cy.title()` |
| Page Object Model | `PageObjet.cy.js` | Clase `FreeRangeHome` que encapsula selectores |

</details>

<details>
<summary><b>🔌 API Testing — requests, intercept y datos</b></summary>
<br/>

| Técnica | Spec | Descripción |
|---------|------|-------------|
| HTTP directo | `Api.cy.js` | PUT y DELETE con validación de status y body |
| Intercept + Stub | `Intercet.cy.js` | Mock de requests antes de llegar al servidor |
| Network requests | `network_requests.cy.js` | `cy.request()` con BDD syntax y query params |
| Login bypass | `Login-Db-Seeding.cy.js` | Autenticación vía API sin pasar por UI |
| Data-driven | `Ejemplos-TetsData-feature.cy.js` | `forEach` genera un `it()` por cada dataset |

</details>

<details>
<summary><b>⚡ Testing avanzado — técnicas que pocos juniors conocen</b></summary>
<br/>

| Técnica | Spec | Descripción |
|---------|------|-------------|
| Accessibility WCAG | `Accessibilidad.cy.js` | `cypress-axe` — impacto, regla y selector por violación |
| Sesiones y cookies | `SessionYCookis.cy.js` | `cy.session()`, `setCookie`, `clearCookies` |
| Control de tiempo | `spies_stubs_clocks.cy.js` | `cy.clock()`, `cy.tick()`, `cy.spy()`, `cy.stub()` |
| iFrame testing | `iFrameTesting.cy.js` | `contentDocument.body` para acceder al iframe |
| Promises en Cypress | `PromesasCypress.cy.js` | `Cypress.Promise`, fetch, `failOnStatusCode: false` |
| Tablas HTML | `Tablas.cy.js` | Validación estructural y ordenamiento por columna |
| Popups | `TestPopup.cy.js` | Manejo de ventanas emergentes del mismo origen |

</details>

<details>
<summary><b>🏗️ Arquitectura — patrones que escalan</b></summary>
<br/>

| Patrón | Implementación | Por qué importa |
|--------|---------------|-----------------|
| Page Object Model | `cypress/Pages/FreeRangeHome.js` | Un selector cambia → se actualiza en un lugar |
| Custom commands | `cypress/support/commands.js` | `cy.login()` — legible y reutilizable |
| Fixtures JSON | `cypress/fixtures/` | Datos de test fuera del código |
| Data-driven | `forEach` sobre arrays | Un dataset más → un test más, sin duplicar código |
| Aliasing | `.as()` | Evita queries redundantes al DOM |

</details>

---

## 🏗️ Estructura del proyecto

```
Cypress-E2E-Automation/
│
├── .github/
│   └── workflows/
│       └── cypress.yml          ← 4 jobs paralelos + Allure Pages
│
├── cypress/
│   ├── e2e/
│   │   ├── 1-getting-started/   ← 1 spec  │  6 tests
│   │   ├── 2-advanced-examples/ ← 16 specs │ 118 tests
│   │   ├── 3-freeRangeTest/     ← 6 specs  │  13 tests
│   │   ├── Apis-Test/           ← 7 specs  │   7 tests
│   │   └── PageObjetModel/      ← 1 spec   │   1 test
│   │
│   ├── fixtures/                ← profile.json · users.json · titulos.json
│   ├── Pages/                   ← FreeRangeHome.js (Page Object)
│   └── support/
│       ├── commands.js          ← cy.login() y otros custom commands
│       └── e2e.js               ← import allure-cypress · cypress-axe
│
├── cypress.config.js
└── package.json
```

---

## 🔄 Pipeline CI/CD

```
Push a main  /  Pull Request
         │
    ┌────┴──────────────────────────────────┐
    │            │            │             │
Getting      Advanced     FreeRange      API
Started      Examples     + POM         Tests
 6 tests     118 tests    13 tests      7 tests
    │            │            │             │
    └────────────┴────────────┴─────────────┘
                       │
              allure-report  (job final)
                       │
           ┌───────────┴───────────┐
       Merge de los            GitHub Pages
       4 resultados      →    ipanaque94.github.io/
                              Cypress-E2E-Automation/
```

> Videos y screenshots disponibles en **Actions → Artifacts** por 7 días.

---

## ⚙️ Ejecución local

```bash
git clone https://github.com/ipanaque94/Cypress-E2E-Automation.git
cd Cypress-E2E-Automation
npm install

# Modo interactivo
npx cypress open

# Headless Chrome
npx cypress run --browser chrome

# Suite específica
npx cypress run --spec "cypress/e2e/Apis-Test/**/*.cy.js"

# Reporte Allure local
npx allure generate allure-results --clean -o allure-report && npx allure open allure-report
```

---

## 🛠️ Stack

<div align="center">

| | Herramienta | Versión | Uso |
|---|-------------|---------|-----|
| 🎯 | Cypress | 14 | Framework E2E principal |
| 🟨 | JavaScript | ES2020 | Lenguaje de los tests |
| 📊 | allure-cypress | 3.x | Reporte con trazabilidad por test |
| ♿ | cypress-axe | 1.x | Accessibility testing WCAG |
| ⚙️ | GitHub Actions | — | CI/CD paralelo en cada push |
| 🌐 | GitHub Pages | — | Publicación automática del reporte |

</div>

---

<div align="center">

## 👨‍💻 Autor

**Enoc Ipanaque**
QA Automation Engineer · Lima, Perú

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Enoc_Ipanaque-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/enoc-isaac-ipanaque-rodas-b3729a283)
[![GitHub](https://img.shields.io/badge/GitHub-ipanaque94-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ipanaque94)
[![Email](https://img.shields.io/badge/Email-rodasenoc4@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:rodasenoc4@gmail.com)

<br/>

`Selenium` · `Playwright` · `Cypress` · `Rest Assured` · `Postman` · `AWS` · `Jenkins` · `Docker`

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,50:161b22,100:1f2937&height=120&section=footer" width="100%"/>

</div>
