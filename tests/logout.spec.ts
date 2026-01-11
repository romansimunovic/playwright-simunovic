import { test, expect } from '@playwright/test';
import LoginPage from '../POMs/loginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await page.goto('/');

  // Preduvjet: korisnik je logiran
  await loginPage.openLoginModal();
  await loginPage.loginWithValidCredentials();
  await loginPage.assertLoginIsSuccessful();
});

test('User can log out successfully', async ({ page }) => {
  const logoutLink = page.getByRole('link', { name: 'Log out', exact: true });
  await expect(logoutLink).toBeVisible({ timeout: 20000 });
  await logoutLink.click();

  const loginLink = page.getByRole('link', { name: 'Log in', exact: true });
  await expect(loginLink).toBeVisible({ timeout: 20000 });

  // Dodatna sigurnosna provjera – user više nije u login stanju
  await expect(page.getByRole('link', { name: 'Log out' })).not.toBeVisible();
});
