import { test, expect } from '@playwright/test';
import LoginPage from '../POMs/loginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await page.goto('/');
});

test('User can log in with valid credentials', async ({ page }) => {
  await loginPage.openLoginModal();
  await loginPage.loginWithValidCredentials();
  await loginPage.assertLoginIsSuccessful();

  // Eksplicitna potvrda login stanja
  const logoutLink = page.getByRole('link', { name: 'Log out', exact: true });
  await expect(logoutLink).toBeVisible({ timeout: 20000 });
});
