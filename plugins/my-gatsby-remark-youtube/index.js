const { parse } = require('url');
const visit = require(`unist-util-visit`);

const YT_LONG = 'www.youtube.com';
const YT_SHORT = 'youtu.be';

module.exports = ({ markdownAST }, options) => {
  visit(markdownAST, 'link', node => {
    const url = parse(node.url, true);
    if (![YT_LONG, YT_SHORT].includes(url.host)) {
      return;
    }
    // Only turn naked links into embeds
    if (node.url !== node.children[0].value) {
      return;
    }
    const videoId = url.host === YT_LONG ? url.query.v : url.pathname.slice(1);
    const opts = { width: 400, height: 225, ...options };
    node.type = `html`;
    node.value = `<iframe
      src="//www.youtube.com/embed/${videoId}"
      width="${opts.width}"
      height="${opts.height}"></iframe>`;
  });
};
