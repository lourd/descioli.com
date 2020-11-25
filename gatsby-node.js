const path = require('path');
const createStoryPages = require('./src/server/createStoryPages');
const augmentMarkdownNode = require('./src/server/augmentMarkdownNode');
const generatePdf = require('./src/server/generatePdf');

exports.createPages = async props => {
  await createStoryPages(props);
};

exports.onCreateNode = props => {
  augmentMarkdownNode(props);
};

// Only runs during Gatsby build process, not during dev
exports.onPostBuild = async ({ graphql }) => {
  const outputPath = path.join(__dirname, 'public');
  const generatedPagePath = path.join(outputPath, 'resume', 'index.html');
  const {
    data: {
      resumeYaml: { pdfFilename },
    },
  } = await graphql(`
    query {
      resumeYaml {
        pdfFilename
      }
    }
  `);
  const pdfPath = path.join(outputPath, pdfFilename);
  await generatePdf(generatedPagePath, pdfPath);
};
