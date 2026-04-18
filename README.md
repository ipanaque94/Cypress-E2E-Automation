<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,50:161b22,100:1f2937&height=200&section=header&text=Cypress%20E2E%20Automation&fontSize=40&fontColor=58a6ff&fontAlignY=40&desc=QA%20Automation%20Suite%20%7C%20146%20Tests%20%7C%20Allure%20%2B%20CI%2FCD&descAlignY=60&descColor=8b949e" width="100%"/>

</div>

<div align="center">

[![CI](https://github.com/ipanaque94/Cypress-E2E-Automation/actions/workflows/cypress.yml/badge.svg)](https://github.com/ipanaque94/Cypress-E2E-Automation/actions/workflows/cypress.yml)
[![Allure](https://img.shields.io/badge/%F0%9F%93%8A_Allure-Ver_reporte_en_vivo-58a6ff?style=flat)](https://ipanaque94.github.io/Cypress-E2E-Automation/)
[![Cypress](https://img.shields.io/badge/Cypress-14-17202C?style=flat&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![JS](https://img.shields.io/badge/JavaScript-ES2020-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Tests](https://img.shields.io/badge/146_tests-passing-22c55e?style=flat)](https://github.com/ipanaque94/Cypress-E2E-Automation/actions)

<br/>

**[📊 Ver reporte Allure en vivo →](https://ipanaque94.github.io/Cypress-E2E-Automation/)**

</div>

---

## 🧠 Por qué construí esto

Terminé el curso de Cypress de Free Range Testers y quise llevar los ejercicios a algo más cercano a un entorno real de QA. En lugar de dejar tests sueltos por carpeta, armé una suite organizada con pipeline automático y reporte publicado en cada ejecución.

El objetivo no era acumular tests — era entender cómo se construye una suite que un equipo real pueda confiar.

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

## 🔍 Lo que realmente aprendí sobre QA

> Más allá de las herramientas, esto es lo que cambió en cómo pienso sobre testing.

---

### ☑️ La estabilidad importa más que la cantidad de tests

Al principio mi instinto era agregar más tests para "cubrir más". Pero algunos fallaban una vez sí y una vez no, sin que el sistema hubiera cambiado. Eso es peor que no tener el test: un test intermitente genera desconfianza en toda la suite. Si el equipo aprende a ignorar los fallos porque "a veces pasa", también va a ignorar el fallo real cuando aparezca.

Entendí que un test confiable que corre siempre igual vale más que cinco tests que pasan la mayoría de las veces. La cobertura no se mide en cantidad — se mide en cuánto puedes confiar en lo que el resultado te dice.

Eso me llevó a revisar cada test y preguntarme: **¿este test falla solo cuando el sistema tiene un problema real, o también puede fallar por otras razones?** Esa pregunta cambió cómo diseño los assertions.

---

### ☑️ Entender bien el flujo antes de automatizar

Mi proceso en este proyecto fue siempre el mismo: primero ejecutaba el caso manualmente, observaba qué pasaba en cada paso, identificaba qué era lo que realmente importaba validar. Recién después automatizaba.

Eso parece obvio, pero no lo es. Es fácil empezar a escribir código sin tener claro qué está probando. El resultado son tests llenos de assertions que validan cosas irrelevantes y no validan lo que importa. O peor: tests que pasan aunque el sistema esté roto porque el assertion no apunta al lugar correcto.

Ejecutar manualmente primero me obligó a hacerme la pregunta correcta antes de escribir: **¿qué comportamiento del sistema estoy garantizando con este test?** No qué código voy a escribir, sino qué promesa está haciendo el test sobre el sistema.

---

### ☑️ Separar lo que es comportamiento de lo que es contenido

Cuando empecé a testear el sitio de Free Range Testers, validaba texto exacto: el nombre de un enlace, el título de una página. El sitio actualizó su contenido y mis tests fallaron. Pero el sistema no estaba roto — el sitio simplemente cambió un texto.

Eso me enseñó una distinción que aplico en todos los tests ahora: **comportamiento** es lo que el sistema hace (¿la página responde?, ¿la navegación funciona?, ¿el endpoint devuelve datos?). **Contenido** es lo que dice (¿el botón dice exactamente "Talleres"?). El comportamiento es responsabilidad del sistema y debo validarlo. El contenido puede cambiar sin que eso sea un bug.

Un test que falla cuando el sistema está funcionando bien genera trabajo innecesario y erosiona la confianza del equipo en la suite.

---

### ☑️ Organizar el código de pruebas como si alguien más lo fuera a leer

Al inicio tenía tests largos donde todo estaba junto: los datos, los selectores, la lógica. Funcionaban, pero eran difíciles de entender de un vistazo y más difíciles de mantener.

Empecé a separar responsabilidades: los datos van en fixtures JSON, los selectores y acciones van en Page Objects, las secuencias repetidas van en custom commands. Cada archivo tiene una sola responsabilidad.

Esto no es solo una buena práctica de código — es una decisión de calidad. Un test que nadie entiende es un test que nadie va a mantener. Y un test que no se mantiene se convierte en ruido: falla, alguien lo desactiva "temporalmente", y esa cobertura desaparece sin que nadie lo note.

Cuando el código de pruebas es claro, el equipo puede leer el test y entender qué garantía está dando sobre el sistema. Eso convierte los tests en documentación viva.

---

### ☑️ Los reportes son para tomar decisiones, no para registrar ejecuciones

Integrar Allure al pipeline me hizo ver los reportes de una manera diferente. Un reporte no es solo "cuántos tests pasaron". Es la respuesta a la pregunta que el equipo necesita responder después de un deploy: **¿podemos confiar en que el sistema está funcionando?**

Para que esa respuesta sea útil, el reporte tiene que ser claro. Tiene que mostrar qué se probó, qué falló y con suficiente contexto para entender por qué. Un reporte con 145 tests en verde da confianza. Un reporte con 3 tests en rojo con screenshots y nombre descriptivo da dirección.

Publicar el reporte automáticamente en cada push —disponible para cualquier persona del equipo sin tener que ejecutar nada— es parte de hacer que la suite sea útil más allá de mi máquina local.

---

### ☑️ El aislamiento entre tests no es un detalle técnico — es una decisión de diseño

Cuando los tests comparten estado —cookies de una sesión anterior, datos en `localStorage`, variables que un test modifica y el siguiente hereda— el orden de ejecución empieza a importar. Y en automatización, el orden no debería importar nunca.

Si el orden importa, significa que los tests tienen dependencias ocultas entre sí. Eso hace que los fallos sean difíciles de reproducir: el test pasa si corre solo, falla si corre después de otro. Ese tipo de fallo es el más costoso porque nadie sabe con certeza qué está causando el problema.

Diseñar cada test para que empiece desde cero —sin asumir nada del estado que dejó el test anterior— es lo que hace que los resultados sean predecibles y que los fallos sean accionables.

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
<summary><b>⚡ Testing avanzado</b></summary>
<br/>

| Técnica | Spec | Descripción |
|---------|------|-------------|
| Accessibility WCAG | `Accessibilidad.cy.js` | `cypress-axe` — impacto, regla y selector por violación |
| Sesiones y cookies | `SessionYCookis.cy.js` | `cy.session()`, `setCookie`, `clearCookies` |
| Control de tiempo | `spies_stubs_clocks.cy.js` | `cy.clock()`, `cy.tick()`, `cy.spy()`, `cy.stub()` |
| iFrame testing | `iFrameTesting.cy.js` | Acceso a contenido dentro de iframes |
| Promises en Cypress | `PromesasCypress.cy.js` | `Cypress.Promise`, fetch, manejo de errores async |
| Tablas HTML | `Tablas.cy.js` | Validación estructural y ordenamiento por columna |
| Popups | `TestPopup.cy.js` | Manejo de ventanas emergentes del mismo origen |

</details>

<details>
<summary><b>🏗️ Arquitectura y patrones</b></summary>
<br/>

| Patrón | Implementación | Por qué importa |
|--------|---------------|-----------------|
| Page Object Model | `cypress/Pages/FreeRangeHome.js` | Un selector cambia → se actualiza en un lugar |
| Custom commands | `cypress/support/commands.js` | `cy.login()` — legible y reutilizable en toda la suite |
| Fixtures JSON | `cypress/fixtures/` | Datos de test separados de la lógica del test |
| Data-driven | `forEach` sobre arrays | Un dataset más → un test más, sin duplicar código |
| Aliasing | `.as()` | Reutilizar elementos y requests sin queries redundantes |

</details>

---

## 🏗️ Estructura del proyecto

```
Cypress-E2E-Automation/
│
├── .github/
│   └── workflows/
│       └── cypress.yml          ← 4 jobs paralelos + deploy Allure Pages
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
│       └── e2e.js               ← allure-cypress · cypress-axe
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
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
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
