const createStoryPages = require('./src/server/createStoryPages');

exports.createPages = async props => {
  await createStoryPages(props);
};
