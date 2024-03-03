import { NextRequest } from "next/server"
import puppeteer from "puppeteer"

/**
 * @fileoverview This endpoint is used to generate a PDF of /resume.
 * It's only used during local development to generate the file,
 * which is then moved into the appropriate spot in public/.
 * At prod runtime it returns a 404, statically.
 * It's not doable to generate the PDF and cache it at build time
 * because making a request to localhost:3000/resume during the
 * build is an error; there's no server running at that time.
 */

export const dynamic = "force-static"

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return new Response(undefined, { status: 404 })
  }

  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(`${req.nextUrl.origin}/resume`)

    await page.waitForNetworkIdle()

    const clientHeight = await page.evaluate(() => {
      return document.body.clientHeight
    })

    // change all the anchor tag elements that have an href that starts
    // with "/" to be prefixed with "https://www.descioli.com/"
    await page.evaluate(() => {
      const anchors = document.querySelectorAll("a")
      anchors.forEach((anchor) => {
        const href = anchor.getAttribute("href")
        if (href && href.startsWith("/")) {
          anchor.setAttribute("href", `https://www.descioli.com${href}`)
        }
      })
    })

    const buffer = await page.pdf({
      width: "8.5in",
      height: clientHeight + 48, // magic number to make it right ¯\_(ツ)_/¯
    })
    console.log("PDF generated")

    await browser.close()

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return new Response("Error generating PDF", { status: 500 })
  }
}
