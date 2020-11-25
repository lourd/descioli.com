const fs = require('fs');
const puppeteer = require('puppeteer');

const PIXELS_TO_INCH = 96;
const PAGE_WIDTH_INCHES = 8.5;

/**
 * Generates a PDF file for given page and adds it to the build directory
 * @param {String} input filepath to read HTML from
 * @param {String} output filepath to write the PDF to
 */
async function generatePdf(input, output) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    // calculating the rendered height at a fixed width
    width: PAGE_WIDTH_INCHES * PIXELS_TO_INCH,
    height: 42, // window height doesn't matter, rendered height will
  });
  const contentHtml = fs.readFileSync(input, 'utf8');
  await page.setContent(contentHtml);
  const height = await page.evaluate(pxToInch => {
    return document.body.clientHeight / pxToInch;
  }, PIXELS_TO_INCH);
  await page.pdf({
    width: `${PAGE_WIDTH_INCHES}in`,
    height: `${height + 0.5}in`,
    path: output,
  });
  await browser.close();
}

module.exports = generatePdf;
