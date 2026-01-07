import { test } from '@playwright/test';
import { ContactPage } from '../POMs/contactPage';

let contactPage: ContactPage;

test.beforeEach(async ({ page }) => {
  contactPage = new ContactPage(page);
  await page.goto(process.env.BASE_URL!);
});

test('User can send contact message', async ({ page }) => {
  await contactPage.openContactModal();

  // generiraj ili koristi statične podatke
  await contactPage.sendMessage('test@example.com', 'Roman', 'Hello from automation!');

  // malo čekanja da alert bude prihvaćen (ako treba)
  await page.waitForTimeout(500);
});
