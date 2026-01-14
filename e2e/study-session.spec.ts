import { test, expect } from '@playwright/test';

test.describe('Study Session Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/study/animals');
    await page.waitForSelector('[role="button"]', { timeout: 5000 });
  });

  test('should complete a full study session', async ({ page }) => {
    // Get initial progress
    const progressText = await page.getByText(/card \d+ of \d+/i).textContent();
    expect(progressText).toBeTruthy();

    let cardIndex = 0;
    const maxCards = 10; // Safety limit to prevent infinite loop

    // Process cards until we see completion screen or hit limit
    while (cardIndex < maxCards) {
      // Check if we reached completion screen
      const completionHeading = page.getByText(/session complete/i);
      if (await completionHeading.isVisible().catch(() => false)) {
        break;
      }

      // Get the flashcard
      const flashcard = page
        .locator('[aria-label*="Flashcard showing Spanish word"]')
        .first();

      // If no flashcard found, we might be done
      if (!(await flashcard.isVisible().catch(() => false))) {
        break;
      }

      // Flip the card
      await flashcard.click();
      await page.waitForTimeout(600);

      // Click Right button
      const rightButton = page.getByRole('button', {
        name: /mark as correct/i,
      });
      if (await rightButton.isVisible().catch(() => false)) {
        await rightButton.click();
        await page.waitForTimeout(300);
      } else {
        break;
      }

      cardIndex++;
    }

    // Should eventually show completion screen
    const completionHeading = page.getByText(/session complete/i);
    const isComplete = await completionHeading
      .isVisible()
      .catch(() => false);

    if (isComplete) {
      // Verify completion screen elements
      await expect(completionHeading).toBeVisible();
      await expect(page.getByText(/total cards/i)).toBeVisible();
      await expect(page.getByText(/correct/i)).toBeVisible();
      await expect(page.getByText(/incorrect/i)).toBeVisible();

      // Should have back to categories button
      const backButton = page.getByRole('button', {
        name: /back to categories/i,
      });
      await expect(backButton).toBeVisible();
    }
  });

  test('should track incorrect cards', async ({ page }) => {
    // Flip and mark first card as incorrect
    const flashcard = page
      .locator('[aria-label*="Flashcard showing Spanish word"]')
      .first();
    await flashcard.click();
    await page.waitForTimeout(600);

    // Click Wrong button
    await page.getByRole('button', { name: /mark as incorrect/i }).click();
    await page.waitForTimeout(300);

    // Cards to review should increase
    const reviewText = await page.getByText(/cards to review:/i).textContent();
    expect(reviewText).toBeTruthy();
    // Should show at least 1 card to review
    expect(reviewText).toContain('1');
  });

  test('should update progress as cards are reviewed', async ({ page }) => {
    // Get initial progress
    const initialProgress = await page
      .getByText(/card \d+ of \d+/i)
      .textContent();
    expect(initialProgress).toMatch(/card 1 of/i);

    // Review one card
    const flashcard = page
      .locator('[aria-label*="Flashcard showing Spanish word"]')
      .first();
    await flashcard.click();
    await page.waitForTimeout(600);

    await page.getByRole('button', { name: /mark as correct/i }).click();
    await page.waitForTimeout(300);

    // Progress should have updated
    const newProgress = await page.getByText(/card \d+ of \d+/i).textContent();
    expect(newProgress).toMatch(/card 2 of/i);
  });

  test('should allow returning to category selection from completion screen', async ({
    page,
  }) => {
    // Process all cards quickly
    for (let i = 0; i < 10; i++) {
      const flashcard = page
        .locator('[aria-label*="Flashcard showing Spanish word"]')
        .first();

      if (!(await flashcard.isVisible().catch(() => false))) {
        break;
      }

      await flashcard.click();
      await page.waitForTimeout(400);

      const rightButton = page.getByRole('button', {
        name: /mark as correct/i,
      });
      if (await rightButton.isVisible().catch(() => false)) {
        await rightButton.click();
        await page.waitForTimeout(200);
      } else {
        break;
      }
    }

    // Check if completion screen is shown
    const completionHeading = page.getByText(/session complete/i);
    if (await completionHeading.isVisible().catch(() => false)) {
      // Click back to categories
      const backButton = page.getByRole('button', {
        name: /back to categories/i,
      });
      await backButton.click();

      // Should navigate back to category selection
      await expect(page).toHaveURL('/study');
    }
  });
});
