import { test, expect } from '@playwright/test';
import HomePage from '../POMs/HomePage';
import CartPage from '../POMs/CartPage';

let homePage: HomePage;
let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    await page.goto(process.env.BASE_URL!);
});

test('Add item to cart', async ({ page }) => {
  await homePage.navigateToCategory('Phones');
  await homePage.openProduct('Samsung galaxy s6');

  const addToCartResponse = page.waitForResponse(res =>
    res.url().includes('addtocart') && res.status() === 200
  );

  await cartPage.addItemToCart();
  await addToCartResponse;

  await cartPage.openCart();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('#tbodyid')).toBeVisible();
});
