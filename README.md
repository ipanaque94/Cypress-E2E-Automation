Cypress E2E Automation Framework

""CI" (https://github.com/ipanaque94/Cypress-E2E-Automation/actions/workflows/cypress.yml/badge.svg)" (https://github.com/ipanaque94/Cypress-E2E-Automation/actions/workflows/cypress.yml)
""Allure Report" (https://img.shields.io/badge/Allure_Report-ver_en_vivo-orange)" (https://ipanaque94.github.io/Cypress-E2E-Automation/)
""Cypress" (https://img.shields.io/badge/Cypress-14-17202C?logo=cypress&logoColor=white)" (https://www.cypress.io/)
""CI/CD" (https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white)" (https://github.com/features/actions)

🔗 Reporte Allure en vivo:
https://ipanaque94.github.io/Cypress-E2E-Automation/

---

🧠 Enfoque como QA

Este proyecto no está diseñado solo para ejecutar tests, sino para validar calidad real del sistema.

Se enfoca en:

- detectar falsos positivos y negativos
- asegurar estabilidad en CI/CD
- diseñar pruebas independientes del entorno
- garantizar aislamiento entre tests
- generar reportes confiables para toma de decisiones

---

📊 Resultados

Suites: 34 | Tests: 145 | Passing: 145 | Failing: 0
Duración total: ~4:30

Pipeline con ejecución paralela y reporte Allure publicado automáticamente en cada push.

---

🚀 Qué cubre este framework

UI Testing

- Interacciones completas del usuario (click, type, drag & drop)
- Validación de DOM y comportamiento dinámico
- Testing responsive ("cy.viewport")

API Testing

- Validación de endpoints con "cy.request"
- Verificación de status codes y estructura de respuesta

Testing avanzado

- Interceptación y stubbing ("cy.intercept")
- Manejo de sesiones ("cy.session")
- Control del tiempo ("cy.clock", "cy.tick")
- Testing de accesibilidad con axe (WCAG)

Arquitectura

- Page Object Model (POM)
- Custom commands ("cy.login")
- Data-driven testing con fixtures

CI/CD

- GitHub Actions con jobs paralelos
- Generación automática de reportes Allure
- Publicación en GitHub Pages

---

🧩 Problemas reales analizados y resueltos

Durante el desarrollo no solo implementé tests, sino que enfrenté problemas típicos de QA en entornos reales.

---

🔍 1. Tests inestables por datos dinámicos

Problema:
Tests fallaban sin cambios en el código.

Análisis:
Dependían de datos externos variables (ej: unidades cambiantes como Mbps vs MB/s).

Decisión:
Reemplacé validaciones exactas por validaciones estructurales y fuentes deterministas.

Resultado:
Tests estables y reproducibles en cualquier entorno.

---

🔍 2. Fallos en CI por dependencia de entorno

Problema:
Tests funcionaban localmente pero fallaban en CI.

Causa:
Dependencia de "localhost".

Solución:
Uso de endpoints públicos y mocks controlados.

Resultado:
Pipeline portable y sin dependencias de infraestructura.

---

🔍 3. Falsos positivos en manejo de errores

Problema:
Tests pasaban aunque había errores reales.

Causa:
Manejo incorrecto de errores en Cypress (no usa Promises estándar).

Solución:
Validación explícita con "failOnStatusCode: false" y control en ".then()".

Resultado:
Mayor precisión en la detección de fallos reales.

---

🔍 4. Falta de aislamiento entre tests

Problema:
Tests dependían del estado previo (cookies, sesiones).

Solución:

- Uso de "cy.session()"
- Limpieza de storage
- Uso de fixtures independientes

Resultado:
Tests aislados, paralelizables y confiables.

---

🔍 5. Reportes inconsistentes en Allure (CI)

Problema:
El reporte mostraba resultados antiguos.

Causa:
Mezcla de resultados entre jobs del pipeline.

Solución:

- Separación de resultados por job
- Configuración dinámica ("ALLURE_RESULTS_DIR")
- Merge controlado de artefactos

Resultado:
Reporte consistente y confiable.

---

📁 Estructura del proyecto

cypress/
├── e2e/
│   ├── 1-getting-started/
│   ├── 2-advanced-examples/
│   ├── 3-freeRangeTest/
│   ├── Apis-Test/
│   └── PageObjetModel/
├── fixtures/
├── Pages/
└── support/

---

⚙️ Ejecución local

git clone https://github.com/ipanaque94/Cypress-E2E-Automation.git
cd Cypress-E2E-Automation
npm install

npx cypress open
npx cypress run --browser chrome

---

🧪 Pipeline CI/CD

Push / PR
   │
   ├── Getting Started
   ├── Advanced Examples
   ├── FreeRange + POM
   └── API Tests
         │
     Merge resultados
         │
     Allure Report
         │
   GitHub Pages

---

🛠 Stack

- Cypress 14
- JavaScript (ES2020)
- allure-cypress
- cypress-axe
- GitHub Actions
- GitHub Pages

---

👤 Autor

Enoc Ipanaque
QA Automation Engineer

- Selenium
- Playwright
- Cypress
- API Testing
- CI/CD

LinkedIn: https://www.linkedin.com/in/enoc-isaac-ipanaque-rodas-b3729a283
GitHub: https://github.com/ipanaque94
Email: rodasenoc4@gmail.com
