import { test, expect } from '@playwright/test';
import HomePage from '../POMs/HomePage';
import ContactPage from '../POMs/contactPage';

let homePage: HomePage;
let contactPage: ContactPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  contactPage = new ContactPage(page);
  await page.goto(process.env.BASE_URL!);
});

test('Send contact message', async ({ page }) => {
  await contactPage.openContactModal();
  await contactPage.sendMessage('test@test.com', 'Roman', 'Hello!');

  // NEW assertion: modal više nije vidljiv
  await expect(contactPage.contactModal).toBeHidden({ timeout: 5000 });
});
