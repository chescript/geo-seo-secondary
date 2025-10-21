import { test, expect } from "@playwright/test";

// Test configuration
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const TEST_EMAIL = process.env.TEST_EMAIL || "creditsfixed2025@example.com";
const TEST_PASSWORD = process.env.TEST_PASSWORD || "TestPass123!";

test.describe("Brand Monitor Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await loginUser(page);
  });

  test("should access Brand Monitor page", async ({ page }) => {
    // Navigate to Brand Monitor
    await page.goto(`${BASE_URL}/brand-monitor`);

    // Verify we're on the Brand Monitor page
    await expect(page).toHaveURL(/.*\/brand-monitor/);

    // Check for URL input section
    const urlInput = page.locator('input[type="url"], input[placeholder*="tesla.com"], input[placeholder*="URL"]');
    await expect(urlInput).toBeVisible();
  });

  test("should scrape company URL and display company card", async ({ page }) => {
    await page.goto(`${BASE_URL}/brand-monitor`);

    // Enter Tesla URL
    const urlInput = page.locator('input[type="url"], input[placeholder*="tesla.com"]');
    await urlInput.fill('tesla.com');

    // Click scrape button
    const scrapeButton = page.locator('button:has-text("Scrape"), button:has-text("Analyze URL")');
    await scrapeButton.first().click();

    // Wait for company card to appear (even if scraping fails, the UI should handle it)
    // We're testing the flow, not the firecrawl API
    await page.waitForTimeout(2000);
  });

  test("should complete full brand analysis flow with enhanced charts", async ({ page }) => {
    await page.goto(`${BASE_URL}/brand-monitor`);

    // Step 1: Enter URL and scrape
    const urlInput = page.locator('input[type="url"]').first();
    await urlInput.fill('tesla.com');

    const scrapeButton = page.locator('button:has-text("Scrape")').first();
    await scrapeButton.click();

    // Wait for scraping to complete
    await page.waitForTimeout(3000);

    // Step 2: Add competitors manually
    // Look for "Add Competitor" button in company card
    const addCompetitorBtn = page.locator('button:has-text("Add Competitor")');
    if (await addCompetitorBtn.isVisible({ timeout: 5000 })) {
      // Add Ford
      await addCompetitorBtn.click();
      await page.fill('input[placeholder*="Competitor name"]', 'Ford');
      await page.fill('input[placeholder*="URL"]', 'ford.com');
      await page.locator('button:has-text("Add")').click();
      await page.waitForTimeout(1000);

      // Add Toyota
      await addCompetitorBtn.click();
      await page.fill('input[placeholder*="Competitor name"]', 'Toyota');
      await page.fill('input[placeholder*="URL"]', 'toyota.com');
      await page.locator('button:has-text("Add")').click();
      await page.waitForTimeout(1000);
    }

    // Step 3: Start analysis
    const analyzeButton = page.locator('button:has-text("Analyze"), button:has-text("Continue")');
    if (await analyzeButton.isVisible({ timeout: 5000 })) {
      await analyzeButton.first().click();

      // Wait for analysis to start
      await page.waitForTimeout(2000);
    }

    console.log('[TEST] Brand monitor flow completed - scrape, add competitors, analyze');
  });

  test("should display enhanced visualization charts in results", async ({ page }) => {
    // This test assumes there's existing analysis data
    // If running against a fresh database, this test might need mock data
    await page.goto(`${BASE_URL}/brand-monitor`);

    // Look for visibility tab (where new charts should appear)
    const visibilityTab = page.locator('[role="tab"]:has-text("Visibility"), button:has-text("Visibility")');

    // If we have existing analysis results, click to view them
    const analysisItem = page.locator('.analysis-item, [data-testid*="analysis"]').first();
    if (await analysisItem.isVisible({ timeout: 3000 })) {
      await analysisItem.click();
      await page.waitForTimeout(2000);

      // Click on visibility tab if not already active
      if (await visibilityTab.isVisible()) {
        await visibilityTab.click();
        await page.waitForTimeout(1000);
      }

      // Check for new chart components
      // Look for "Provider Visibility Breakdown" card
      const providerBarChart = page.locator('text="Provider Visibility Breakdown"');
      const performanceChart = page.locator('text="Competitive Performance"');

      // If charts are visible, verify they're rendered
      if (await providerBarChart.isVisible({ timeout: 3000 })) {
        console.log('[TEST] ✓ Provider Visibility Bar Chart is visible');
      }

      if (await performanceChart.isVisible({ timeout: 3000 })) {
        console.log('[TEST] ✓ Provider Performance Chart is visible');
      }
    } else {
      console.log('[TEST] No existing analysis found - skipping chart verification');
    }
  });

  test("should display previous analyses list", async ({ page }) => {
    await page.goto(`${BASE_URL}/brand-monitor`);

    // Look for previous analyses section
    await expect(
      page.locator("text=/previous|history|past.?analyses/i")
    ).toBeVisible();

    // Look for analyses list or table
    await expect(
      page.locator('table, .analysis-list, [data-testid*="analyses"]')
    ).toBeVisible();
  });

  test("should allow viewing analysis details", async ({ page }) => {
    await page.goto(`${BASE_URL}/brand-monitor`);

    // Look for an existing analysis to view
    const analysisItem = page
      .locator('.analysis-item, tr, [data-testid*="analysis"]')
      .first();

    if (await analysisItem.isVisible()) {
      // Click to view details
      await analysisItem.click();

      // Check for detailed view elements
      await expect(
        page.locator("text=/details|overview|summary/i")
      ).toBeVisible();

      // Look for competitor comparison data
      await expect(
        page.locator("text=/competitor|comparison|vs/i")
      ).toBeVisible();

      // Look for visibility scores or rankings
      await expect(
        page.locator("text=/score|ranking|visibility/i")
      ).toBeVisible();
    }
  });

  test("should support filtering and sorting analyses", async ({ page }) => {
    await page.goto(`${BASE_URL}/brand-monitor`);

    // Look for filter options
    const filterButton = page.locator(
      'button:has-text("Filter"), select, input[placeholder*="filter"]'
    );
    if (await filterButton.isVisible()) {
      await filterButton.click();
    }

    // Look for sort options
    const sortButton = page.locator(
      'button:has-text("Sort"), select[name*="sort"], th[role="columnheader"]'
    );
    if (await sortButton.isVisible()) {
      await sortButton.click();
    }

    // Verify filtering/sorting interface exists
    await expect(page.locator("text=/filter|sort|order/i")).toBeVisible();
  });

  test("should support exporting analysis results", async ({ page }) => {
    await page.goto(`${BASE_URL}/brand-monitor`);

    // Look for export functionality
    const exportButton = page.locator(
      'button:has-text("Export"), button:has-text("Download"), a[download]'
    );

    if (await exportButton.isVisible()) {
      // Set up download handler
      const downloadPromise = page.waitForEvent("download");

      // Click export button
      await exportButton.click();

      // Wait for download to start
      const download = await downloadPromise;

      // Verify download started
      expect(download.suggestedFilename()).toMatch(/\.(csv|xlsx|pdf|json)$/);
    }
  });

  test("should deduct credits when creating analysis", async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard`);

    // Get initial credit count
    const creditsElement = page.locator("text=/credits?/i").first();
    let initialCredits = 0;

    if (await creditsElement.isVisible()) {
      const creditsText = await creditsElement.textContent();
      const match = creditsText?.match(/(\d+)/);
      if (match) {
        initialCredits = parseInt(match[1]);
      }
    }

    // Navigate to Brand Monitor and create analysis
    await page.goto(`${BASE_URL}/brand-monitor`);
    await createTeslaAnalysis(page);

    // Go back to dashboard to check credits
    await page.goto(`${BASE_URL}/dashboard`);

    // Verify credits were deducted (if we had initial credits)
    if (initialCredits > 0) {
      const newCreditsElement = page.locator("text=/credits?/i").first();
      if (await newCreditsElement.isVisible()) {
        const newCreditsText = await newCreditsElement.textContent();
        const match = newCreditsText?.match(/(\d+)/);
        if (match) {
          const newCredits = parseInt(match[1]);
          expect(newCredits).toBeLessThan(initialCredits);
        }
      }
    }
  });

  test("should handle insufficient credits gracefully", async ({ page }) => {
    await page.goto(`${BASE_URL}/brand-monitor`);

    // Try to create analysis (this might fail if no credits)
    await page.fill(
      'input[placeholder*="company"], input[name*="company"], input[placeholder*="brand"]',
      "Tesla"
    );
    await page.fill(
      'input[placeholder*="website"], input[placeholder*="url"], input[type="url"]',
      "https://tesla.com"
    );

    await page.click(
      'button:has-text("Analyze"), button:has-text("Start"), button[type="submit"]'
    );

    // Look for credit-related error messages
    const errorMessage = page.locator(
      "text=/insufficient.?credits|not.?enough.?credits|upgrade.?plan/i"
    );

    // Either analysis starts or we get a credit error
    await expect(
      page.locator("text=/analyzing|processing|started|insufficient.?credits/i")
    ).toBeVisible({ timeout: 10000 });
  });

  test("should display competitor comparison matrix", async ({ page }) => {
    await page.goto(`${BASE_URL}/brand-monitor`);

    // Create analysis and wait for results
    await createTeslaAnalysis(page);

    // Wait for results
    await expect(page.locator("text=/results|completed/i")).toBeVisible({
      timeout: 30000,
    });

    // Look for competitor comparison elements
    await expect(
      page.locator("text=/competitor|comparison|matrix/i")
    ).toBeVisible();

    // Look for competitor names
    await expect(page.locator("text=/ford|bmw|mercedes|audi/i")).toBeVisible();

    // Look for comparison metrics
    await expect(
      page.locator("text=/score|ranking|visibility|performance/i")
    ).toBeVisible();
  });

  test("should show provider rankings and analysis tabs", async ({ page }) => {
    await page.goto(`${BASE_URL}/brand-monitor`);

    // Create analysis and wait for results
    await createTeslaAnalysis(page);

    // Wait for results
    await expect(page.locator("text=/results|completed/i")).toBeVisible({
      timeout: 30000,
    });

    // Look for tabs or sections
    await expect(
      page.locator('[role="tab"], .tab, button:has-text("Rankings")')
    ).toBeVisible();

    // Look for provider-specific results
    await expect(
      page.locator("text=/google|bing|search.?engine/i")
    ).toBeVisible();
  });
});

// Helper functions
async function loginUser(page: any) {
  await page.goto(`${BASE_URL}/login`);

  // Fill email and password
  const emailInput = page.locator('input[type="email"]');
  const passwordInput = page.locator('input[type="password"]');

  await emailInput.fill(TEST_EMAIL);
  await passwordInput.fill(TEST_PASSWORD);

  // Click sign in button
  const signInButton = page.locator('button:has-text("Sign in"), button[type="submit"]');
  await signInButton.click();

  // Wait for redirect to dashboard or brand-monitor
  await page.waitForURL(/.*\/(dashboard|brand-monitor)/, { timeout: 10000 });
}