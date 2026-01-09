# Demoblaze E2E Testing with Playwright

* **Author:** Roman Šimunović
* **Mentor:** Katarina Đuđrević
* **Course:** Supportive Information Processes (2nd year, Master’s IT)
* **Institution:** Faculty of Humanities and Social Sciences, University of Osijek

This project documents the **end-to-end (E2E) testing** of [Demoblaze](https://www.demoblaze.com/) using **Playwright**, **TypeScript**, and the **Page Object Model (POM)**. It includes realistic user flows, automated assertions, and documentation of encountered issues and solutions. AI tools such as **ChatGPT** and **Perplexity** were used to generate boilerplate, optimize POM structure, and help debug browser-specific issues.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Setup and Installation](#setup-and-installation)
4. [Testing Methodology](#testing-methodology)

   * [Page Object Model](#page-object-model-pom)
   * [Test Scenarios](#test-scenarios)
5. [Common Issues and Challenges](#common-issues-and-challenges)
6. [AI Assistance](#ai-assistance)
7. [Test Execution and Reporting](#test-execution-and-reporting)
8. [Recommendations](#recommendations)
9. [Conclusion](#conclusion)

---

## 1. Project Overview

The main goal of this project was to create **robust, automated E2E tests** for the Demoblaze demo e-commerce platform. The tests simulate user actions including:

* Browsing product categories (Phones, Laptops, Monitors)
* Adding items to cart
* Placing orders
* Logging in and signing up
* Using the contact form

The project emphasizes **reliable automation**, **modular structure**, and **clear documentation** for academic submission.

---

## 2. Technology Stack

* **Playwright** – cross-browser automation testing framework
* **TypeScript** – typed scripting for maintainability
* **Node.js / npm** – project management and dependency installation
* **Browsers tested:** Chromium, Firefox, WebKit
* **Page Object Model (POM)** – separation of test logic and UI interactions

---

## 3. Setup and Installation

1. **Clone the repository**

```bash
git clone https://github.com/romansimunovic/playwright-simunovic 
cd playwright-simunovic
```

2. **Install dependencies**

```bash
npm install
```

3. **Install browsers for Playwright**

```bash
npx playwright install
```

4. **Set environment variables**
   Create a `.env` file with the following:

```env
BASE_URL=https://www.demoblaze.com
CORRECT_EMAIL=your_email@gmail.com
CORRECT_PASSWORD=your_secure_password
EXISTING_EMAIL=existing_user@gmail.com
EXISTING_PASSWORD=existing_password
```

> ⚠️ Never commit `.env` with real credentials.

5. **Run all tests**

```bash
npx playwright test
```

6. **Run tests in headed mode**

```bash
npx playwright test --headed
```

7. **View HTML report**

```bash
npx playwright show-report
```

---

## 4. Testing Methodology

### Page Object Model (POM)

All UI interactions are encapsulated in **Page Objects**:

* **HomePage:** category navigation, product selection
* **CartPage:** add/remove items, view cart, assertions for cart state
* **LoginPage:** login/logout
* **SignUpPage:** sign-up modal
* **ContactPage:** sending messages

**Benefits of POM:**

* Test scripts focus on *what* to test, not *how*
* UI changes only require updates in POM, not all tests
* Improves readability and maintainability

---

### Test Scenarios

**1. Login / Logout**

* Login with valid credentials
* Verify "Welcome" message
* Logout and assert "Log in" visibility

**2. Sign-up**

* Attempt sign-up with existing user
* Capture and assert alert: "This user already exist."

**3. Cart Operations**

* Navigate categories and open product details
* Add product to cart and wait for API response:

```ts
await page.waitForResponse(res => res.url().includes('addtocart') && res.status() === 200);
```

* Assert that cart items appear correctly
* Check that cart is empty after placing order

**4. Home Page Verification**

* Ensure products are displayed

**5. Contact Form**

* Open modal, submit message, verify alert confirmation

---

## 5. Common Issues and Challenges

During testing, several **browser-specific and functional issues** appeared:

1. **Alert Handling on Add to Cart**

   * Chromium auto-accepted alerts; Firefox/WebKit required explicit handling.
   * Fixed in `CartPage.addItemToCart()` with:

```ts
this.page.once('dialog', async dialog => {
  await dialog.accept();
});
```

2. **Dynamic Content and Slow Rendering**

   * Firefox occasionally failed to find elements.
   * Fixed with `expect(locator).toBeVisible({ timeout: 15000 })` before clicking.

3. **Sign-up Modal Timing**

   * Clicking “Sign up” before modal fully rendered caused timeouts.
   * Resolved by waiting for modal visibility.

4. **Cart API Wait**

   * `addtocart` API must complete before asserting items.
   * Solved with `page.waitForResponse()`.

5. **Assertions on Dynamic Text**

   * Exact text matches often failed due to dynamic username content.
   * Fixed with partial text checks using `toContainText()`.

---

## 6. AI Assistance

AI tools were used to:

* Generate boilerplate Page Objects
* Draft initial test cases
* Identify and fix flaky waits
* Improve documentation clarity

**Benefits:**

* Faster test creation
* Clear separation of concerns
* Less trial-and-error debugging

---

## 7. Test Execution and Reporting

* Tests run on **Chromium, Firefox, and WebKit**
* Failures automatically capture **screenshots and video**
* HTML reports generated in `test-results/`

```bash
npx playwright test
npx playwright show-report
```

---

## 8. Recommendations

* Keep `.env` secret
* Use `--headed` or `--debug` for flaky tests
* Update selectors when UI changes
* Maintain modular tests using POM
* Re-run `npx playwright install` when upgrading Playwright

---

## 9. Conclusion

This project demonstrates **end-to-end automation testing** for a demo e-commerce application:

* Covers login, sign-up, cart operations, product navigation, and contact messages
* Handles browser-specific quirks with explicit waits and alert handling
* AI-assisted coding improved **efficiency, maintainability, and documentation clarity**

This setup provides a **reliable, reproducible, and scalable foundation** for further automated testing in academic or professional settings.
