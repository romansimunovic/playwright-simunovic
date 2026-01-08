# Demoblaze E2E Tests with Playwright

Automated end-to-end tests for [Demoblaze](https://www.demoblaze.com/), a demo e-commerce site.
Tests are written in [TypeScript](https://www.typescriptlang.org/) using [Playwright](https://playwright.dev/) and follow the Page Object Model (POM) for maintainability.

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
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Configure Environment Variables

Create a `.env` file in the root folder (or copy from `.env.sample`) and set your credentials:

```env
BASE_URL=https://www.demoblaze.com
CORRECT_EMAIL=your_email_here@gmail.com
CORRECT_PASSWORD=your_secure_password_here
```

> ⚠️ Never commit your `.env` with real credentials to GitHub.

### 5. Run All Tests

```bash
npx playwright test
```

### 6. Run Tests in Headed Mode (UI)

```bash
npx playwright test --headed
```

### 7. Debug Tests

```bash
npx playwright test --debug
```

### 8. View Test Report

```bash
npx playwright show-report
```

---

## ✅ Covered Test Scenarios

* Navigate product categories (Phones, Laptops, Monitors)
* View product details
* Add products to the cart
* Remove products from the cart
* Log in and log out with real credentials
* Basic purchase flow (confirmation dialog)

> ⚠️ Full checkout/payment is **not automated**, only cart management and login/logout.

---

## 🧰 Useful Commands

Run a specific test file:

```bash
npx playwright test tests/home.spec.ts
```

Run tests in a specific browser:

```bash
npx playwright test --project=firefox
```

Run tests with verbose output:

```bash
npx playwright test --reporter=list
```

---

## 📸 Screenshots & Videos

Playwright automatically captures screenshots and videos on test failures.
Check the `test-results/` folder after running tests.

---

## 📝 Notes

* Login tests now use your **actual Demoblaze email** and password from `.env`.
* Cart operations work without login, but login is required for logout and purchase scenarios.
* All tests follow **Page Object Model (POM)** for easier maintenance.
* The welcome message assertion is now resilient: it only checks that “Welcome” contains your username/email.

---

## 🛠️ Recommendations

* Keep `.env` secret.
* Update credentials if your Demoblaze account changes.
* Re-run `npx playwright install` if Playwright upgrades.
* Use `--headed` or `--debug` to troubleshoot flaky tests.