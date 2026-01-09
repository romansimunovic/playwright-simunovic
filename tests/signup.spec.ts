import { test, expect } from '@playwright/test';
import SignUpPage from '../POMs/signUpPage';

let signUpPage: SignUpPage;

test.beforeEach(async ({ page }) => {
  signUpPage = new SignUpPage(page);
  await page.goto(process.env.BASE_URL!);
});

test('Sign up with existing user shows alert', async ({ page }) => {
  await page.goto(process.env.BASE_URL!);

  const dialogPromise = page.waitForEvent('dialog');

  await signUpPage.signUp(
    process.env.VALID_EMAIL!,
    process.env.VALID_PASSWORD!
  );

  const dialog = await dialogPromise;
  expect(dialog.message()).toContain('This user already exist.');
  await dialog.accept();

  // NEW assertion: modal i dalje otvoren (nije kreiran novi user)
  await expect(signUpPage.signupModal).toBeVisible();
});
