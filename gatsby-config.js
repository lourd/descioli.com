module.exports = {
  siteMetadata: {
    title: 'Louis R. DeScioli',
    description: 'The personal site and portfolio of Louis R. DeScioli',
    url: 'https://www.descioli.design',
    repo: 'https://github.com/lourd/descioli-design',
    keywords: [
      'software engineer',
      'portfolio',
      'design',
      'descioli',
      'personal site',
      'software',
      'augmented reality',
      'indie game dev',
      'MIT',
      'resume',
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-yaml`,
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-53420391-3',
      },
    },
    'gatsby-plugin-remove-trailing-slashes',
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        showSpinner: false,
        color: 'green',
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.tsx`),
      },
    },
    {
      resolve: 'gatsby-mdx',
      options: {
        gatsbyRemarkPlugins: [
          `gatsby-remark-external-links`,
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static/',
            },
          },
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-autolink-headers',
        ],
      },
    },
  ],
};
