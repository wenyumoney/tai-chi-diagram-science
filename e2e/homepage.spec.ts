import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with Taiji diagram and 6 domain cards", async ({ page }) => {
    await page.goto("/zh");

    // Page title
    await expect(page.locator("h1")).toContainText("太极图");

    // Taiji SVG is rendered
    const svg = page.locator("svg").first();
    await expect(svg).toBeVisible();

    // 6 orbit buttons
    const buttons = page.locator("button[data-slug]");
    await expect(buttons).toHaveCount(6);

    // 6 domain cards (links to detail pages)
    const cards = page.locator("a[href*='/domain/']");
    await expect(cards).toHaveCount(6);

    // Panorama link
    await expect(page.locator("a[href*='/panorama']").last()).toBeVisible();
  });

  test("language switcher works", async ({ page }) => {
    await page.goto("/zh");
    await expect(page.locator("h1")).toContainText("太极图");

    // Switch to English
    await page.click("text=EN");
    await expect(page).toHaveURL("/en");
    await expect(page.locator("h1")).toContainText("Taiji Diagram");

    // Switch back to Chinese
    await page.click("text=中文");
    await expect(page).toHaveURL("/zh");
  });
});
