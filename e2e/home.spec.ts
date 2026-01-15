import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display welcome message and navigation options', async ({
    page,
  }) => {
    await page.goto('/');

    // Check if the welcome message is displayed
    await expect(page.getByText(/spanish flashcards/i)).toBeVisible();

    // Check for welcome card message
    await expect(
      page.getByText(/welcome! start your spanish learning journey/i),
    ).toBeVisible();
    await expect(
      page.getByText(/every word you learn brings you closer to fluency/i),
    ).toBeVisible();

    // Check if navigation options are present
    await expect(
      page.getByRole('link', { name: /study mode/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /quiz mode/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /statistics/i }),
    ).toBeVisible();
  });

  test('should display welcoming card with proper styling', async ({
    page,
  }) => {
    await page.goto('/');

    // Find the welcome card container
    const welcomeCard = page.locator('div.bg-white.rounded-xl.shadow-lg');
    await expect(welcomeCard).toBeVisible();

    // Verify the wave emoji is present
    await expect(page.getByText('👋')).toBeVisible();

    // Verify key phrases in the welcome message
    await expect(
      page.getByText(/choose a study mode to practice vocabulary/i),
    ).toBeVisible();
  });

  test('should navigate to category selection when clicking Study Mode', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /study mode/i }).click();

    // Should navigate to /study
    await expect(page).toHaveURL('/study');
    await expect(page.getByText(/choose a category/i)).toBeVisible();
  });

  test('should navigate to stats page when clicking Statistics', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /statistics/i }).click();

    // Should navigate to /stats
    await expect(page).toHaveURL('/stats');
    await expect(page.getByText(/your statistics/i)).toBeVisible();
  });

  // Language switcher tests skipped - language switcher is not currently implemented in the UI
  test.skip('should have language switcher', async ({ page }) => {
    await page.goto('/');

    // Language switcher should be visible
    const languageSelect = page.locator('select');
    await expect(languageSelect).toBeVisible();

    // Should have English, French, and Chinese options
    await expect(languageSelect.locator('option[value="en"]')).toBeVisible();
    await expect(languageSelect.locator('option[value="fr"]')).toBeVisible();
    await expect(languageSelect.locator('option[value="zh"]')).toBeVisible();
  });

  test.skip('should change language when selecting from dropdown', async ({
    page,
  }) => {
    await page.goto('/');

    const languageSelect = page.locator('select');

    // Change to French
    await languageSelect.selectOption('fr');
    await expect(page.getByText(/cartes mémoire espagnoles/i)).toBeVisible();

    // Change to Chinese
    await languageSelect.selectOption('zh');
    await expect(page.getByText(/西班牙语单词卡/)).toBeVisible();

    // Change back to English
    await languageSelect.selectOption('en');
    await expect(page.getByText(/spanish flashcards/i)).toBeVisible();
  });
});
