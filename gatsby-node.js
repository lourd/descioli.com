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
exports.onPostBuild = async props => {
  if (process.env.GENERATE_RESUME_PDF) {
    await generateResumePdf(props);
  }
};

async function generateResumePdf({ graphql }) {
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
  const generatedPagePath = path.join(
    __dirname,
    'public',
    'resume',
    'index.html'
  );
  const pdfPath = path.join(__dirname, 'static', pdfFilename);
  await generatePdf(generatedPagePath, pdfPath);
}
