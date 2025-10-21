import { Page, expect } from "@playwright/test";

// Test configuration
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const TEST_EMAIL = process.env.TEST_EMAIL || "test@example.com";
const TEST_PASSWORD = process.env.TEST_PASSWORD || "testpassword123";

/**
 * Login helper function that can be used across all tests
 */
export async function loginUser(page: Page, email?: string, password?: string) {
  const loginEmail = email || TEST_EMAIL;
  const loginPassword = password || TEST_PASSWORD;

  // Navigate to login page
  await page.goto(`${BASE_URL}/login`);

  // Wait for login form to be visible
  await expect(page.locator('input[type="email"]')).toBeVisible();

  // Fill login form
  await page.fill('input[type="email"]', loginEmail);
  await page.fill('input[type="password"]', loginPassword);

  // Submit login form
  await page.click('button[type="submit"]');

  // Wait for successful login and redirect to dashboard
  await expect(page).toHaveURL(/.*\/dashboard/, { timeout: 10000 });

  // Verify we're logged in by checking for dashboard elements
  await expect(page.locator("h1, h2")).toContainText(/dashboard|welcome/i);
}

/**
 * Logout helper function
 */
export async function logoutUser(page: Page) {
  // Look for logout button or menu
  const logoutButton = page.locator(
    'button:has-text("Logout"), button:has-text("Sign Out"), a:has-text("Logout")'
  );

  if (await logoutButton.isVisible()) {
    await logoutButton.click();
  } else {
    // Try to find user menu first
    const userMenu = page.locator(
      '[data-testid="user-menu"], .user-menu, button[aria-label*="user"]'
    );
    if (await userMenu.isVisible()) {
      await userMenu.click();
      await page.click('button:has-text("Logout"), a:has-text("Logout")');
    }
  }

  // Verify logout by checking we're redirected to login or home page
  await expect(page).toHaveURL(/.*\/(login|$)/, { timeout: 5000 });
}

/**
 * Check if user is authenticated
 */
export async function isUserAuthenticated(page: Page): Promise<boolean> {
  try {
    await page.goto(`${BASE_URL}/dashboard`);
    await page.waitForURL(/.*\/dashboard/, { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Register a new user (for test setup)
 */
export async function registerUser(
  page: Page,
  email: string,
  password: string,
  displayName?: string
) {
  await page.goto(`${BASE_URL}/register`);

  // Fill registration form
  if (displayName) {
    const nameInput = page.locator(
      'input[name="name"], input[placeholder*="name"]'
    );
    if (await nameInput.isVisible()) {
      await nameInput.fill(displayName);
    }
  }

  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);

  // Handle confirm password if present
  const confirmPasswordInput = page.locator(
    'input[name*="confirm"], input[placeholder*="confirm"]'
  );
  if (await confirmPasswordInput.isVisible()) {
    await confirmPasswordInput.fill(password);
  }

  // Submit registration
  await page.click('button[type="submit"]');

  // Wait for successful registration
  await expect(page).toHaveURL(/.*\/(dashboard|login)/, { timeout: 10000 });
}

/**
 * Navigate to a specific page while ensuring user is authenticated
 */
export async function navigateAuthenticated(page: Page, path: string) {
  // Ensure user is logged in first
  if (!(await isUserAuthenticated(page))) {
    await loginUser(page);
  }

  // Navigate to the desired path
  await page.goto(`${BASE_URL}${path}`);
}

/**
 * Get user credits from dashboard
 */
export async function getUserCredits(page: Page): Promise<number> {
  await navigateAuthenticated(page, "/dashboard");

  const creditsElement = page.locator("text=/credits?/i").first();

  if (await creditsElement.isVisible()) {
    const creditsText = await creditsElement.textContent();
    const match = creditsText?.match(/(\d+)/);
    if (match) {
      return parseInt(match[1]);
    }
  }

  return 0;
}

/**
 * Wait for element with multiple possible selectors
 */
export async function waitForAnySelector(
  page: Page,
  selectors: string[],
  timeout = 5000
) {
  for (const selector of selectors) {
    try {
      await page.waitForSelector(selector, {
        timeout: timeout / selectors.length,
      });
      return selector;
    } catch {
      // Continue to next selector
    }
  }
  throw new Error(`None of the selectors were found: ${selectors.join(", ")}`);
}

/**
 * Fill form field with multiple possible selectors
 */
export async function fillFieldBySelectors(
  page: Page,
  selectors: string[],
  value: string
) {
  for (const selector of selectors) {
    const element = page.locator(selector);
    if (await element.isVisible()) {
      await element.fill(value);
      return true;
    }
  }
  return false;
}

/**
 * Click element with multiple possible selectors
 */
export async function clickBySelectors(page: Page, selectors: string[]) {
  for (const selector of selectors) {
    const element = page.locator(selector);
    if (await element.isVisible()) {
      await element.click();
      return true;
    }
  }
  return false;
}

/**
 * Configuration object for easy access
 */
export const testConfig = {
  BASE_URL,
  TEST_EMAIL,
  TEST_PASSWORD,
  TIMEOUTS: {
    SHORT: 5000,
    MEDIUM: 10000,
    LONG: 30000,
    ANALYSIS: 60000,
  },
};