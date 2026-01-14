import { test, expect } from '@playwright/test';

test.describe('Flashcard Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/study/animals');
    // Wait for the flashcard to be visible
    await page.waitForSelector('[role="button"]', { timeout: 5000 });
  });

  test('should display a flashcard with Spanish word', async ({ page }) => {
    // First card should show Spanish text
    const flashcard = page
      .locator('[aria-label*="Flashcard showing Spanish word"]')
      .first();
    await expect(flashcard).toBeVisible();

    // Should have some text content
    const text = await flashcard.textContent();
    expect(text).toBeTruthy();
    expect(text?.trim().length).toBeGreaterThan(0);
  });

  test('should flip card when clicked', async ({ page }) => {
    // Click the flashcard to flip it
    const flashcard = page
      .locator('[aria-label*="Flashcard showing Spanish word"]')
      .first();
    await flashcard.click();

    // Wait for flip animation
    await page.waitForTimeout(600);

    // After flipping, should show English translation
    const flippedCard = page.locator(
      '[aria-label*="Flashcard showing English translation"]',
    );
    await expect(flippedCard).toBeVisible();
  });

  test('should show Right and Wrong buttons after flipping', async ({
    page,
  }) => {
    // Click to flip the card
    const flashcard = page
      .locator('[aria-label*="Flashcard showing Spanish word"]')
      .first();
    await flashcard.click();

    // Wait for flip animation
    await page.waitForTimeout(600);

    // Buttons should appear
    const rightButton = page.getByRole('button', {
      name: /mark as correct/i,
    });
    const wrongButton = page.getByRole('button', {
      name: /mark as incorrect/i,
    });

    await expect(rightButton).toBeVisible();
    await expect(wrongButton).toBeVisible();
  });

  test('should advance to next card when clicking Right button', async ({
    page,
  }) => {
    // Check initial card number
    const initialProgress = await page
      .getByText(/card \d+ of \d+/i)
      .textContent();
    expect(initialProgress).toMatch(/card 1 of/i);

    // Flip the card
    const firstCard = page
      .locator('[aria-label*="Flashcard showing Spanish word"]')
      .first();
    await firstCard.click();
    await page.waitForTimeout(600);

    // Click Right button
    await page.getByRole('button', { name: /mark as correct/i }).click();

    // Wait for card to update
    await page.waitForTimeout(300);

    // Should show next card or completion screen
    const newProgress = await page.getByText(/card \d+ of \d+/i).textContent();
    expect(newProgress).toMatch(/card 2 of/i);
  });

  test('should advance to next card when clicking Wrong button', async ({
    page,
  }) => {
    // Check initial card number
    const initialProgress = await page
      .getByText(/card \d+ of \d+/i)
      .textContent();
    expect(initialProgress).toMatch(/card 1 of/i);

    // Flip the card
    const flashcard = page
      .locator('[aria-label*="Flashcard showing Spanish word"]')
      .first();
    await flashcard.click();
    await page.waitForTimeout(600);

    // Click Wrong button
    await page.getByRole('button', { name: /mark as incorrect/i }).click();

    // Wait for card to update
    await page.waitForTimeout(300);

    // Should show next card
    const newProgress = await page.getByText(/card \d+ of \d+/i).textContent();
    expect(newProgress).toMatch(/card 2 of/i);
  });

  test('should show progress indicator', async ({ page }) => {
    // Progress text should be visible (Card X of Y)
    await expect(page.getByText(/card \d+ of \d+/i)).toBeVisible();
  });

  test('should display cards to review count after marking wrong', async ({
    page,
  }) => {
    // Flip and mark as incorrect
    const flashcard = page
      .locator('[aria-label*="Flashcard showing Spanish word"]')
      .first();
    await flashcard.click();
    await page.waitForTimeout(600);

    await page.getByRole('button', { name: /mark as incorrect/i }).click();
    await page.waitForTimeout(300);

    // Cards to review should now be visible
    await expect(page.getByText(/cards to review:/i)).toBeVisible();
  });

  test('should have exit study session button', async ({ page }) => {
    const exitButton = page.getByRole('button', {
      name: /exit study session/i,
    });
    await expect(exitButton).toBeVisible();

    await exitButton.click();
    await expect(page).toHaveURL('/study');
  });
});
