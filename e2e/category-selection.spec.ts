import { test, expect } from '@playwright/test';

test.describe('Category Selection Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/study');
  });

  test('should display category selection title', async ({ page }) => {
    await expect(page.getByText(/choose a category/i)).toBeVisible();
  });

  test('should display all category options', async ({ page }) => {
    // Check if all categories are present
    await expect(
      page.getByRole('button', { name: /animals/i }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: /food/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /verbs/i })).toBeVisible();
  });

  test('should navigate to study session when selecting a category', async ({
    page,
  }) => {
    await page.getByRole('button', { name: /animals/i }).click();

    // Should navigate to /study/animals
    await expect(page).toHaveURL('/study/animals');

    // Should display a flashcard
    await expect(page.locator('[role="button"]').first()).toBeVisible();
  });

  test('should have back to home button', async ({ page }) => {
    const backButton = page.getByRole('button', { name: /back to home/i });
    await expect(backButton).toBeVisible();

    await backButton.click();
    await expect(page).toHaveURL('/');
  });

  test('should navigate to different categories', async ({ page }) => {
    // Test Animals
    await page.getByRole('button', { name: /animals/i }).click();
    await expect(page).toHaveURL('/study/animals');

    // Go back
    await page.goto('/study');

    // Test Food
    await page.getByRole('button', { name: /food/i }).click();
    await expect(page).toHaveURL('/study/food');

    // Go back
    await page.goto('/study');

    // Test Verbs
    await page.getByRole('button', { name: /verbs/i }).click();
    await expect(page).toHaveURL('/study/verbs');
  });
});
