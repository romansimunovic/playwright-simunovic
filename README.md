# Demoblaze E2E Tests with Playwright

Automated end-to-end tests for [Demoblaze](https://www.demoblaze.com/), a demo e-commerce site.  
Tests are written in [TypeScript](https://www.typescriptlang.org/) using [Playwright](https://playwright.dev/) and cover essential user flows such as browsing products, managing the cart, logging in/out, and making purchases.

---

## 📦 Tech Stack

<img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" /> 
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> 
<img src="https://img.shields.io/badge/Playwright-007ACC?style=for-the-badge&logo=Playwright&logoColor=white" /> 
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/> 

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/demoblaze-playwright.git
cd demoblaze-playwright
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Configure Environment Variables

Create a `.env` file in the root folder:

```env
BASE_URL=https://www.demoblaze.com
CORRECT_EMAIL=your_email_here
CORRECT_PASSWORD=your_password_here
```

### 5. Run All Tests

```bash
npx playwright test
```

### 6. View Test Report

```bash
npx playwright show-report
```

---

## ✅ Covered Test Scenarios

* Navigate product categories (Phones, Laptops, Monitors)
* View product details
* Add products to the cart
* Remove products from the cart
* Log in and log out
* Complete a purchase with confirmation dialog

* ⚠️ Note: Full checkout / purchase flow is not automated. The tests handle only adding/removing items from cart and login/logout.
---

## 🧰 Useful Commands

Run tests in headless mode:

```bash
npx playwright test
```

Run tests in headed (UI) mode:

```bash
npx playwright test --headed
```

Run tests with debugger:

```bash
npx playwright test --debug
```

Run a specific test file:

```bash
npx playwright test tests/home.spec.ts
```

Run tests in a specific browser:

```bash
npx playwright test --project=firefox
```

---

## 📸 Screenshots & Videos

Playwright captures screenshots and videos automatically on test failures.
Check the `test-results/` folder after running the tests.

---

## 📝 Notes

* Login requires a valid Demoblaze account. Use the `.env` file for credentials.
* Cart operations work without login, but login is needed for purchase and logout scenarios.
* Tests are written using the Page Object Model (POM) for maintainability.

---

## 🛠️ Recommendations

* Keep `.env` secret and never commit it to version control.
* Update credentials if the Demoblaze account changes.
* Re-run `npx playwright install` after Playwright upgrades.

---

```