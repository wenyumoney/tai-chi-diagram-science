import { test, expect } from "@playwright/test";

test.describe("Domain Detail Page", () => {
  test("navigates from homepage card to detail page", async ({ page }) => {
    await page.goto("/zh");

    // Click the first domain card
    await page.locator("a[href='/zh/domain/taiji-math']").first().click();
    await expect(page).toHaveURL("/zh/domain/taiji-math");
    await expect(page.locator("h1")).toContainText("太极八卦与数学");

    // Overview section exists
    await expect(page.locator("text=概述")).toBeVisible();
  });

  test("prev/next navigation works with boundaries", async ({ page }) => {
    await page.goto("/zh/domain/taiji-math");

    // First domain should NOT have previous link active
    const prevDisabled = page.locator('[aria-disabled="true"]').first();
    await expect(prevDisabled).toBeVisible();

    // Next link should go to quantum-entanglement
    const nextLink = page.locator('a[href*="quantum-entanglement"]').last();
    await nextLink.click();
    await expect(page).toHaveURL(/quantum-entanglement/);
  });

  test("invalid slug shows 404", async ({ page }) => {
    await page.goto("/zh/domain/nonexistent");
    await expect(page.locator("text=404")).toBeVisible();
  });
});
