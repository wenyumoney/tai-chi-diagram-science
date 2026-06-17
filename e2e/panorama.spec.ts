import { test, expect } from "@playwright/test";

test.describe("Panorama Map", () => {
  test("loads with canvas and legend", async ({ page }) => {
    await page.goto("/zh/panorama");
    await expect(page.locator("h1")).toContainText("太极图科学宇宙地图");

    // Canvas should be present
    const canvas = page.locator("canvas");
    await expect(canvas).toBeVisible();

    // Legend should show core/extended labels
    await expect(page.locator("text=核心深耕")).toBeVisible();
    await expect(page.locator("text=扩展领域")).toBeVisible();
  });

  test("back link returns to home", async ({ page }) => {
    await page.goto("/zh/panorama");
    await page.click("text=返回首页");
    await expect(page).toHaveURL("/zh");
  });
});
