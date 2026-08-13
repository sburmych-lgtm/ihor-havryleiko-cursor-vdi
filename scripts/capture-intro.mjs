import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"
import path from "node:path"

const outDir = path.resolve(
  "G:/01_PROJECTS/Web Design/ihor_havryleiko_fitnesstrainer/Assets/Animation_1/Antigravity_Final",
)
const origin = process.argv[2] ?? "http://127.0.0.1:4173"

await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: outDir, size: { width: 1920, height: 1080 } },
})
const page = await context.newPage()
await page.goto(origin, { waitUntil: "domcontentloaded", timeout: 60000 })
await page.waitForTimeout(2000)
await page.screenshot({ path: path.join(outDir, "poster.jpg"), type: "jpeg", quality: 86 })
await page.waitForTimeout(9500)
await context.close()
await browser.close()
console.log(`Captured intro preview into ${outDir}`)
