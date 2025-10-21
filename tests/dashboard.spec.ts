import { test, expect } from "@playwright/test";

// Test configuration
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const TEST_EMAIL = process.env.TEST_EMAIL || "test@example.com";
const TEST_PASSWORD = process.env.TEST_PASSWORD || "testpassword123";

test.describe("Dashboard Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto(BASE_URL);
  });

  test("should redirect to login when not authenticated", async ({ page }) => {
    // Try to access dashboard directly
    await page.goto(`${BASE_URL}/dashboard`);

    // Should be redirected to login page
    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.locator("h1, h2")).toContainText(/login|sign in/i);
  });

  test("should login successfully and redirect to dashboard", async ({
    page,
  }) => {
    // Navigate to login page
    await page.goto(`${BASE_URL}/login`);

    // Fill login form
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASSWORD);

    // Submit login form
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Verify dashboard elements are present
    await expect(page.locator("h1, h2")).toContainText(/dashboard|welcome/i);
  });

  test("should display user profile information", async ({ page }) => {
    // Login first
    await loginUser(page);

    // Check for profile elements
    await expect(
      page.locator('[data-testid="user-profile"], .profile, .user-info')
    ).toBeVisible();

    // Check for display name field
    await expect(
      page.locator('input[placeholder*="display name"], input[name*="name"]')
    ).toBeVisible();

    // Check for bio field
    await expect(
      page.locator('textarea[placeholder*="bio"], textarea[name*="bio"]')
    ).toBeVisible();

    // Check for phone field
    await expect(
      page.locator('input[placeholder*="phone"], input[name*="phone"]')
    ).toBeVisible();
  });

  test("should display credits and usage information", async ({ page }) => {
    // Login first
    await loginUser(page);

    // Look for credits display
    await expect(page.locator("text=/credits?/i")).toBeVisible();

    // Look for usage stats
    await expect(page.locator("text=/usage|used|remaining/i")).toBeVisible();
  });

  test("should have navigation links to other features", async ({ page }) => {
    // Login first
    await loginUser(page);

    // Check for Brand Monitor link
    await expect(
      page.locator('a[href*="brand-monitor"], button:has-text("Brand Monitor")')
    ).toBeVisible();

    // Check for Chat link
    await expect(
      page.locator('a[href*="chat"], button:has-text("Chat")')
    ).toBeVisible();

    // Check for Plans/Pricing link
    await expect(
      page.locator(
        'a[href*="plan"], a[href*="pricing"], button:has-text("Plans")'
      )
    ).toBeVisible();
  });

  test("should navigate to Brand Monitor from dashboard", async ({ page }) => {
    // Login first
    await loginUser(page);

    // Click Brand Monitor link
    await page.click(
      'a[href*="brand-monitor"], button:has-text("Brand Monitor")'
    );

    // Should navigate to brand monitor page
    await expect(page).toHaveURL(/.*\/brand-monitor/);
    await expect(page.locator("h1, h2")).toContainText(/brand.?monitor/i);
  });

  test("should navigate to Chat from dashboard", async ({ page }) => {
    // Login first
    await loginUser(page);

    // Click Chat link
    await page.click('a[href*="chat"], button:has-text("Chat")');

    // Should navigate to chat page
    await expect(page).toHaveURL(/.*\/chat/);
  });

  test("should navigate to Plans from dashboard", async ({ page }) => {
    // Login first
    await loginUser(page);

    // Click Plans link
    await page.click(
      'a[href*="plan"], a[href*="pricing"], button:has-text("Plans")'
    );

    // Should navigate to plans page
    await expect(page).toHaveURL(/.*\/plan/);
  });

  test("should allow editing profile information", async ({ page }) => {
    // Login first
    await loginUser(page);

    // Look for edit button or directly editable fields
    const editButton = page.locator(
      'button:has-text("Edit"), button[aria-label*="edit"]'
    );
    if (await editButton.isVisible()) {
      await editButton.click();
    }

    // Try to edit display name
    const nameInput = page.locator(
      'input[placeholder*="display name"], input[name*="name"]'
    );
    if (await nameInput.isVisible()) {
      await nameInput.fill("Test User Updated");
    }

    // Try to edit bio
    const bioInput = page.locator(
      'textarea[placeholder*="bio"], textarea[name*="bio"]'
    );
    if (await bioInput.isVisible()) {
      await bioInput.fill("Updated bio for testing");
    }

    // Look for save button
    const saveButton = page.locator(
      'button:has-text("Save"), button[type="submit"]'
    );
    if (await saveButton.isVisible()) {
      await saveButton.click();

      // Wait for save confirmation
      await expect(page.locator("text=/saved|updated|success/i")).toBeVisible({
        timeout: 5000,
      });
    }
  });

  test("should display recent activity or usage stats", async ({ page }) => {
    // Login first
    await loginUser(page);

    // Look for activity section
    await expect(
      page.locator("text=/recent|activity|history|usage/i")
    ).toBeVisible();

    // Look for any data tables or lists
    await expect(
      page.locator(
        'table, .activity-list, .usage-stats, [data-testid*="activity"]'
      )
    ).toBeVisible();
  });
});

// Helper function to login user
async function loginUser(page: any) {
  await page.goto(`${BASE_URL}/login`);
  await page.fill('input[type="email"]', TEST_EMAIL);
  await page.fill('input[type="password"]', TEST_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/.*\/dashboard/);
}