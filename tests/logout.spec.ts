import { test, expect } from '@playwright/test';
import LoginPage from '../POMs/loginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await page.goto('/');
});

test('Logout', async ({ page }) => {
  // Login first
  await loginPage.openLoginModal();
  await loginPage.loginWithValidCredentials();
  await loginPage.assertLoginIsSuccessful();

  const logoutLink = page.getByRole('link', { name: 'Log out', exact: true });
  await expect(logoutLink).toBeVisible({ timeout: 20000 });
  await logoutLink.click();

  const loginLink = page.getByRole('link', { name: 'Log in', exact: true });
  await expect(loginLink).toBeVisible({ timeout: 20000 });
});
