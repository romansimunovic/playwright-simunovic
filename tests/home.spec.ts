import { test, expect } from '@playwright/test';
import HomePage from '../POMs/HomePage';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await page.goto('/');
});

test('Products are visible on home', async () => {
  await homePage.assertProductsVisible();

  // NEW assertion: provjera da je barem jedan proizvod vidljiv
  const productCount = await homePage.productCards.count();
  await expect(productCount).toBeGreaterThan(0);
});
