import { chromium } from 'playwright'

const url = process.argv[2] || 'http://localhost:5174/category'
const outPath = process.argv[3] || 'category-screenshot.png'

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  permissions: ['geolocation'],
  geolocation: { latitude: 28.6139, longitude: 77.209 },
})
const page = await context.newPage()

const consoleErrors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text())
})
page.on('pageerror', (err) => consoleErrors.push(String(err)))

await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await page.screenshot({ path: outPath, fullPage: false })

console.log('Console errors:', JSON.stringify(consoleErrors, null, 2))

await browser.close()
