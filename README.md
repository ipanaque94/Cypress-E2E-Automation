🚀 Cypress E2E Automation Framework

""CI" (https://github.com/ipanaque94/Cypress-E2E-Automation/actions/workflows/cypress.yml/badge.svg)" (https://github.com/ipanaque94/Cypress-E2E-Automation/actions/workflows/cypress.yml)
""Allure Report" (https://img.shields.io/badge/Allure_Report-Ver_en_vivo-orange?logo=allure)" (https://ipanaque94.github.io/Cypress-E2E-Automation/)
""Cypress" (https://img.shields.io/badge/Cypress-14-17202C?style=flat&logo=cypress&logoColor=white)" (https://www.cypress.io/)
""CI/CD" (https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)" (https://github.com/features/actions)

---

🔗 "Ver reporte Allure en vivo" (https://ipanaque94.github.io/Cypress-E2E-Automation/)

---

🧠 Enfoque como QA

Este proyecto no está diseñado solo para ejecutar tests, sino para validar calidad real del sistema.

✔ Detección de falsos positivos y negativos
✔ Tests estables y reproducibles
✔ Independencia del entorno (CI/CD ready)
✔ Aislamiento entre tests
✔ Reportes confiables para toma de decisiones

---

📊 Resultados

Suites: 34 | Tests: 145 | Passing: 145 | Failing: 0
Duración total: ~4:30

✔ Ejecución paralela en CI
✔ Reporte Allure publicado automáticamente

---

🧪 Cobertura del Framework

🔹 UI Testing

- Interacciones reales de usuario (click, type, drag & drop)
- Validación del DOM dinámico
- Responsive testing ("cy.viewport")

🔹 API Testing

- Validación de endpoints con "cy.request"
- Status codes y estructura de respuesta

🔹 Testing avanzado

- "cy.intercept" (mocking y stubbing)
- "cy.session" (manejo de sesiones)
- "cy.clock" / "cy.tick" (control del tiempo)
- Accessibility testing (WCAG con axe)

🔹 Arquitectura

- Page Object Model (POM)
- Custom commands ("cy.login")
- Data-driven testing con fixtures

🔹 CI/CD

- GitHub Actions (jobs paralelos)
- Allure Report automático
- Deploy en GitHub Pages

---

🧩 Problemas reales resueltos (enfoque QA)

🔍 Tests inestables por datos dinámicos

Tests fallaban sin cambios en código debido a datos externos variables.

Solución: validaciones estructurales + datos deterministas
Resultado: estabilidad total en CI

---

🔍 Fallos en CI por dependencia de entorno

Tests dependían de "localhost".

Solución: uso de endpoints públicos y mocks
Resultado: ejecución portable en cualquier entorno

---

🔍 Falsos positivos en manejo de errores

Errores no se detectaban correctamente.

Solución: control explícito con "failOnStatusCode: false"
Resultado: detección real de fallos

---

🔍 Falta de aislamiento entre tests

Estado compartido (cookies, sesiones).

Solución:

- "cy.session()"
- limpieza de storage
- uso de fixtures

Resultado: tests independientes y confiables

---

🔍 Reportes incorrectos en Allure

Resultados antiguos aparecían en CI.

Solución:

- aislamiento por job ("ALLURE_RESULTS_DIR")
- merge controlado

Resultado: reportes consistentes

---

📁 Estructura del proyecto

cypress/
├── e2e/
├── fixtures/
├── Pages/
└── support/

---

⚙️ Ejecución local

git clone https://github.com/ipanaque94/Cypress-E2E-Automation.git
cd Cypress-E2E-Automation
npm install

# UI
npx cypress open

# Headless
npx cypress run --browser chrome

---

🔄 Pipeline CI/CD

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

👨‍💻 Autor

Enoc Ipanaque
QA Automation Engineer

🔗 LinkedIn: https://www.linkedin.com/in/enoc-isaac-ipanaque-rodas-b3729a283
🔗 GitHub: https://github.com/ipanaque94
📧 Email: rodasenoc4@gmail.com

