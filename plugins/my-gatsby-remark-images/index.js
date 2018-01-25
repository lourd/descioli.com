const select = require(`unist-util-select`);
const path = require(`path`);
const isRelativeUrl = require(`is-relative-url`);
const _ = require(`lodash`);
const { sizes } = require(`gatsby-plugin-sharp`);
const Promise = require(`bluebird`);
const cheerio = require(`cheerio`);
const slash = require(`slash`);

// Takes a node and generates the needed images and then returns
// the needed HTML replacement for the image
async function generateImagesAndHtml({
  markdownNode,
  node,
  options,
  getNode,
  files
}) {
  const fileType = node.url.slice(-3);

  // Ignore non-relative images as there's nothing for us to do.
  // Ignore gifs as we can't process them,
  // svgs as they are already responsive by definition
  if (!isRelativeUrl(node.url) || fileType === `gif` || fileType === `svg`) {
    return;
  }

  // Check if this markdownNode has a File parent. This plugin
  // won't work if the image isn't hosted locally.
  const parentNode = getNode(markdownNode.parent);
  let imagePath;
  if (parentNode && parentNode.dir) {
    imagePath = slash(path.join(parentNode.dir, node.url));
  } else {
    return;
  }

  const imageNode = _.find(files, file => {
    if (file && file.absolutePath) {
      return file.absolutePath === imagePath;
    }
    return null;
  });
  if (!imageNode || !imageNode.absolutePath) {
    return;
  }

  // assuming if this property is truthy, it's a number
  let args = options;
  if (node.maxWidth) {
    args = {
      ...options,
      maxWidth: node.maxWidth
    };
  }

  const responsiveSizesResult = await sizes({
    file: imageNode,
    args
  });

  // Calculate the paddingBottom %
  const ratio = `${1 / responsiveSizesResult.aspectRatio * 100}%`;

  const originalImg = responsiveSizesResult.originalImg;
  const fallbackSrc = responsiveSizesResult.src;
  const srcSet = responsiveSizesResult.srcSet;
  const presentationWidth = responsiveSizesResult.presentationWidth;

  // Generate default alt tag
  const srcSplit = node.url.split(`/`);
  const fileName = srcSplit[srcSplit.length - 1];
  const fileNameNoExt = fileName.replace(/\.[^/.]+$/, ``);
  const defaultAlt = fileNameNoExt.replace(/[^A-Z0-9]/gi, ` `);

  const alt = node.alt ? node.alt : defaultAlt;
  const title = node.title ? node.title : ``;

  // TODO
  // Fade in images on load.
  // https://www.perpetual-beta.org/weblog/silky-smooth-image-loading.html

  // Construct new image node w/ aspect ratio placeholder
  let rawHTML = `
<span
  class="${options.wrapperClass}"
  style="
    position: relative;
    display: block;
    ${options.wrapperStyle};
    max-width: ${presentationWidth}px;
    margin-left: auto;
    margin-right: auto;
    ${node.style || ''}
  "
>
  <span
    class="${options.placeholderClass}"
    style="
      padding-bottom: ${ratio};
      position: relative;
      bottom: 0;
      left: 0;
      background-image: url('${responsiveSizesResult.base64}');
      background-size: cover;
      display: block;
    "
  >
    <img
      class="${options.imgClass}"
      style="
        width: 100%;
        height: 100%;
        margin: 0;
        vertical-align: middle;
        position: absolute;
        top: 0;
        left: 0;
        box-shadow: inset 0px 0px 0px 400px ${options.backgroundColor};
      "
      alt="${alt}"
      title="${title}"
      src="${fallbackSrc}"
      srcset="${srcSet}"
      sizes="${responsiveSizesResult.sizes}"
    />
  </span>
</span>
  `;

  // Make linking to original image optional.
  if (options.linkImagesToOriginal) {
    rawHTML = `
<a
  class="gatsby-resp-image-link"
  href="${originalImg}"
  style="display: block"
  target="_blank"
  rel="noopener"
>
${rawHTML}
</a>
    `;
  }

  // Add an optional visible caption under the image using its alt attribute
  if (options.addCaptions) {
    rawHTML = `
<figure>
  ${rawHTML}
  <figcaption class="${options.captionClass}">${alt}</figcaption>
</figure>
    `;
  }

  return rawHTML;
}

// Mutates the node, returns nothing no matter what
async function processMarkdownImgNode({
  node,
  markdownNode,
  options,
  getNode,
  files
}) {
  const rawHTML = await generateImagesAndHtml({
    node,
    markdownNode,
    options,
    getNode,
    files
  });
  if (!rawHTML) return;
  // Replace the image node with an inline HTML node.
  node.type = `html`;
  node.value = rawHTML;
}

async function processHtmlNode({
  node,
  markdownNode,
  options,
  getNode,
  files
}) {
  if (!node.value) {
    return;
  }

  const $ = cheerio.load(node.value);
  if ($(`img`).length === 0) {
    // No img tags
    return;
  }

  let images = [];
  $(`img`).each(function() {
    images.push($(this));
  });

  for (const img of images) {
    // Get the details we need.
    let newNode = {};
    newNode.url = img.attr(`src`);
    newNode.title = img.attr(`title`);
    newNode.alt = img.attr(`alt`);
    // will result in NaN if attribute isn't set
    newNode.maxWidth = +img.data(`max-width`);
    if (!newNode.url) {
      return;
    }
    const rawHTML = await generateImagesAndHtml({
      node: newNode,
      markdownNode,
      options,
      getNode,
      files
    });
    if (!rawHTML) return;
    // Replace the image string
    img.replaceWith(rawHTML);
  }

  // Replace the image node with an inline HTML node.
  node.type = `html`;
  node.value = $(`body`).html(); // fix for cheerio v1
}

// If the image is relative (not hosted elsewhere)
// 1. Find the image file
// 2. Find the image's size
// 3. Filter out any responsive image sizes that are greater than the image's width
// 4. Create the responsive images.
// 5. Set the html w/ aspect ratio helper.
async function processMarkdownImages(
  { files, markdownNode, markdownAST, pathPrefix, getNode },
  pluginOptions
) {
  const defaults = {
    maxWidth: 650,
    wrapperStyle: ``,
    backgroundColor: `white`,
    linkImagesToOriginal: true,
    wrapperClass: 'gatsby-resp-image-wrapper',
    placeholderClass: 'gatsby-resp-image-background-image',
    imgClass: 'gatsby-resp-image-image',
    pathPrefix,
    addCaptions: false,
    captionClass: 'gatsby-remark-images-caption'
  };
  const options = _.defaults(pluginOptions, defaults);
  // This will only work for markdown syntax image tags
  const markdownImageNodes = select(markdownAST, `image`);
  // This will also allow the use of html image tags
  const rawHtmlNodes = select(markdownAST, `html`);
  const markdownImgNodeProcessingPromises = markdownImageNodes.map(node =>
    processMarkdownImgNode({ node, markdownNode, options, getNode, files })
  );
  const htmlNodeProcessingPromises = rawHtmlNodes.map(node =>
    processHtmlNode({ node, markdownNode, options, getNode, files })
  );
  await Promise.all(markdownImgNodeProcessingPromises);
  await Promise.all(htmlNodeProcessingPromises);
}

module.exports = processMarkdownImages;
