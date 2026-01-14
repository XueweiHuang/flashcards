import { test, expect } from '@playwright/test';

test.describe('Stats Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/stats');
  });

  test('should display stats page title', async ({ page }) => {
    await expect(page.getByText(/your statistics/i)).toBeVisible();
  });

  test('should display placeholder message', async ({ page }) => {
    await expect(
      page.getByText(/statistics will be available once you complete phase 5/i),
    ).toBeVisible();
  });

  test('should have back to home button', async ({ page }) => {
    const backButton = page.getByRole('button', { name: /back to home/i });
    await expect(backButton).toBeVisible();

    await backButton.click();
    await expect(page).toHaveURL('/');
  });

  test('should navigate from home to stats', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /statistics/i }).click();

    await expect(page).toHaveURL('/stats');
    await expect(page.getByText(/your statistics/i)).toBeVisible();
  });
});
