module.exports = {
  siteMetadata: {
    title: `Louis R. DeScioli`,
    description: 'The personal site and portfolio of one Louis R DeScioli',
    siteUrl: `descioli.design`,
    keywords: [
      'software engineer',
      'portfolio',
      'design',
      'personal site',
      'software',
      'augmented reality',
      'indie game dev'
    ]
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-react-next`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-catch-links`,
    `gatsby-remark-external-links`,
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'stories',
        path: `${__dirname}/src/stories/`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'my-gatsby-remark-images',
            options: { maxWidth: 800, addCaptions: true }
          },
          'gatsby-remark-copy-linked-files',
          'my-gatsby-remark-youtube',
          // This has to come after the youtube plugin
          'gatsby-remark-responsive-iframe'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-53420391-3'
      }
    }
  ]
};
