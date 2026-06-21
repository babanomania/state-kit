import { expect, test, type Page } from "@playwright/test";
import { COMPONENT_META } from "../src/lib/componentMeta";
import { THEME_META } from "../src/lib/themeMeta";

/**
 * Baseline scope: every (component × variant) from the Components browser, in both light and dark
 * page mode, under the default Aurora theme — the dimension most likely to hide real bugs (wrong
 * icon, copy, or layout per variant). The theme dimension itself is checked separately, below, via
 * one representative component (ErrorState) across all 5 built-in themes, since that's what proves
 * the theme-token pipeline renders correctly — the full (component × variant × theme × mode) matrix
 * would be ~700+ images for marginal extra coverage over this pairwise approach.
 */

async function setMode(page: Page, mode: "light" | "dark") {
  await page.addInitScript((m: string) => {
    window.localStorage.setItem("statekit-site-theme", m);
  }, mode);
}

test.describe("Components browser — component × variant × light/dark", () => {
  for (const entry of COMPONENT_META) {
    for (let v = 0; v < entry.variantLabels.length; v++) {
      for (const mode of ["dark", "light"] as const) {
        test(`${entry.id} / ${entry.variantLabels[v]} / ${mode}`, async ({ page }) => {
          await setMode(page, mode);
          await page.goto("/components");
          await page.getByTestId("component-nav").getByRole("button", { name: entry.name, exact: true }).click();
          if (v > 0) {
            await page
              .getByTestId("variant-switcher")
              .getByRole("button", { name: entry.variantLabels[v], exact: true })
              .click();
          }
          const stage = page.getByTestId("preview-stage");
          await expect(stage).toHaveScreenshot(`${entry.id}-v${v}-${mode}.png`);
        });
      }
    }
  }
});

test.describe("Themes page — theme-token pipeline across all 5 built-in themes", () => {
  for (const meta of THEME_META) {
    for (const mode of ["dark", "light"] as const) {
      test(`${meta.id} / ${mode}`, async ({ page }) => {
        await setMode(page, mode);
        await page.goto("/themes");
        await page.getByTestId("theme-switcher").getByRole("button", { name: meta.label, exact: false }).click();
        const stage = page.getByTestId("theme-stage");
        await expect(stage).toHaveScreenshot(`theme-${meta.id}-${mode}.png`);
      });
    }
  }
});
