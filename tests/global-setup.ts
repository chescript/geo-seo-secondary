import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  console.log("🚀 Starting global test setup...");

  // Get base URL from config
  const baseURL = config.projects[0].use.baseURL || "http://localhost:3000";

  // Launch browser for setup
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Wait for the application to be ready
    console.log("⏳ Waiting for application to be ready...");
    await page.goto(baseURL);

    // Wait for the page to load completely
    await page.waitForLoadState("networkidle");

    // Check if the application is responding
    const title = await page.title();
    console.log(`✅ Application is ready. Page title: ${title}`);

    // Optional: Create test user if needed
    // await createTestUser(page);
  } catch (error) {
    console.error("❌ Global setup failed:", error);
    throw error;
  } finally {
    await browser.close();
  }

  console.log("✅ Global setup completed successfully");
}

// Optional: Function to create test user
async function createTestUser(page: any) {
  const testEmail = process.env.TEST_EMAIL || "test@example.com";
  const testPassword = process.env.TEST_PASSWORD || "testpassword123";

  try {
    // Navigate to registration page
    await page.goto("/register");

    // Check if registration form exists
    const emailInput = page.locator('input[type="email"]');
    if (await emailInput.isVisible()) {
      // Fill registration form
      await emailInput.fill(testEmail);
      await page.fill('input[type="password"]', testPassword);

      // Handle confirm password if present
      const confirmPasswordInput = page.locator(
        'input[name*="confirm"], input[placeholder*="confirm"]'
      );
      if (await confirmPasswordInput.isVisible()) {
        await confirmPasswordInput.fill(testPassword);
      }

      // Submit registration
      await page.click('button[type="submit"]');

      console.log("✅ Test user created successfully");
    }
  } catch (error) {
    console.log("ℹ️ Test user creation skipped or failed:", error.message);
    // Don't fail setup if user creation fails (user might already exist)
  }
}

export default globalSetup;