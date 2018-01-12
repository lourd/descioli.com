const createStoryPages = require('./server/createStoryPages');

exports.createPages = async props => {
  await createStoryPages(props);
};
