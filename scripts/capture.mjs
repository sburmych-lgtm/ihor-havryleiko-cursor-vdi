import { chromium } from "playwright";

const url = "http://localhost:5173/";

async function skipIntro(page) {
  try {
    const btn = page.locator(".intro-skip");
    await btn.waitFor({ state: "visible", timeout: 4000 });
    await btn.click();
  } catch {
    // ignore if intro skip is missing or not visible
  }
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(url, { waitUntil: "load" });
await skipIntro(page);
await page.waitForTimeout(1200);
await page.screenshot({ path: "screenshots/pass2-hero.png" });
await page.screenshot({ path: "screenshots/final_desktop.png" });

await page.locator("#about").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page.screenshot({ path: "screenshots/pass2-about.png" });

await page.evaluate(() => {
  const el = document.querySelector(".story-beats");
  if (el) el.scrollIntoView();
});
await page.waitForTimeout(800);
await page.screenshot({ path: "screenshots/pass2-story.png" });

await page.locator("#media").scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await page.screenshot({ path: "screenshots/pass2-media.png" });

await page.locator("#contact").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page.screenshot({ path: "screenshots/pass2-contact.png" });

await page.screenshot({ path: "screenshots/pass2-full.png", fullPage: true });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(url, { waitUntil: "load" });
await skipIntro(page);
await page.waitForTimeout(1200);
await page.screenshot({ path: "screenshots/final_mobile.png" });
await page.screenshot({ path: "screenshots/pass2-mobile.png" });

await page.locator("#about").scrollIntoViewIfNeeded();
await page.screenshot({ path: "screenshots/pass2-mobile-about.png" });

await browser.close();
console.log("CAPTURE_OK");