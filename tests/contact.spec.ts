import { test, expect } from '@playwright/test';
import HomePage from '../POMs/HomePage';
import ContactPage from '../POMs/ContactPage';

let homePage: HomePage;
let contactPage: ContactPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  contactPage = new ContactPage(page);
  await page.goto(process.env.BASE_URL!);
});

test('Send contact message', async ({ page }) => {
  await contactPage.openContactModal();

  await contactPage.sendMessage(
    'test@test.com',
    'Roman',
    'Hello from Playwright!'
  );

  // čekaj alert i assert
  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Thanks for the message');
    await dialog.accept();
  });
});
