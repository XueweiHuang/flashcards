# End-to-End Tests with Playwright

This directory contains End-to-End (E2E) tests for the Flash Cards application using Playwright.

## Overview

The E2E tests verify the complete user workflows and interactions across the application, ensuring that all features work correctly from the user's perspective.

## Test Coverage

### 1. Home Page (`home.spec.ts`)
- ✅ Display welcome message and navigation options
- ✅ Navigate to category selection when clicking Study Mode
- ✅ Navigate to stats page when clicking Statistics
- ⏭️ Language switcher (skipped - feature not implemented yet)

### 2. Category Selection Page (`category-selection.spec.ts`)
- ✅ Display category selection title
- ✅ Display all category options (Animals, Food, Verbs)
- ✅ Navigate to study session when selecting a category
- ✅ Navigate to different categories
- ✅ Back to home button functionality

### 3. Flashcard Functionality (`flashcard.spec.ts`)
- ✅ Display flashcard with Spanish word
- ✅ Flip card when clicked
- ✅ Show Right and Wrong buttons after flipping
- ✅ Advance to next card when clicking Right button
- ✅ Advance to next card when clicking Wrong button
- ✅ Show progress indicator
- ✅ Display cards to review count after marking wrong
- ✅ Exit study session button functionality

### 4. Study Session Flow (`study-session.spec.ts`)
- ✅ Complete a full study session
- ✅ Track incorrect cards
- ✅ Update progress as cards are reviewed
- ✅ Allow returning to category selection from completion screen

### 5. Stats Page (`stats.spec.ts`)
- ✅ Display stats page title
- ✅ Display placeholder message
- ✅ Back to home button functionality
- ✅ Navigate from home to stats

## Running Tests

### Run all tests (headless mode)
```bash
npm run test:e2e
```

### Run tests with UI (interactive mode)
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:e2e:headed
```

### Debug mode
```bash
npm run test:e2e:debug
```

### View last test report
```bash
npm run playwright:report
```

## Configuration

The Playwright configuration is in `playwright.config.ts`. Key settings:

- **Test directory**: `./e2e`
- **Base URL**: `http://localhost:3000`
- **Browser**: Chromium (Desktop Chrome)
- **Web server**: Automatically starts dev server before tests
- **Screenshots**: On failure only
- **Trace**: On first retry
- **Reporter**: HTML (view with `npm run playwright:report`)

## Test Structure

Each test file follows this structure:

1. **describe block**: Groups related tests
2. **beforeEach hook**: Sets up test state (e.g., navigate to page)
3. **test blocks**: Individual test cases with clear descriptions
4. **Assertions**: Use Playwright's `expect` API

## Best Practices

- ✅ Use semantic locators (role, text) over CSS selectors
- ✅ Wait for elements to be visible before interacting
- ✅ Use descriptive test names
- ✅ Keep tests independent and isolated
- ✅ Use beforeEach for common setup
- ✅ Test user workflows, not implementation details

## Current Test Results

```
24 passed (4.7s)
2 skipped
```

All critical user workflows are covered and passing!

## Future Enhancements

- Add language switcher tests when feature is implemented in UI
- Add quiz mode tests (Phase 3)
- Add tests for keyboard navigation and accessibility
- Add visual regression testing
- Add mobile viewport testing
