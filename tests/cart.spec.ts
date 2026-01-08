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

  // čekaj backend call
  const addToCartResponse = page.waitForResponse(res =>
    res.url().includes('addtocart') && res.status() === 200
  );

  // klik add to cart
  await cartPage.addItemToCart();

  await addToCartResponse;

  // otvori cart
  await cartPage.openCart();

  // samo potvrdi da si na cart stranici
  await expect(page).toHaveURL(/cart\.html/);

  // i da je tablica prisutna (ne sadržaj)
  await expect(page.locator('#tbodyid')).toBeVisible();
});




