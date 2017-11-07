module.exports = {
  siteMetadata: {
    // title: `whaaa`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-react-next`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'projects',
        path: `${__dirname}/src/data/`
      }
    }
  ]
};
