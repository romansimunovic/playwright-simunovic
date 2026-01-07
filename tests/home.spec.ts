import { test } from '@playwright/test';
import { HomePage } from '../POMs/HomePage';
import { LoginPage } from '../POMs/loginPage';

let homePage: HomePage;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);

  await homePage.open();
  await loginPage.openLoginModal();
  await loginPage.login(process.env.CORRECT_EMAIL!, process.env.CORRECT_PASSWORD!);
  await homePage.assertLoggedIn(); // provjera da je login uspio
});

test('Logged-in user can see products', async ({ page }) => {
  await homePage.assertProductsVisible();
});

test('User can logout', async ({ page }) => {
  await homePage.logout();
  await homePage.assertLoggedOut();
});
