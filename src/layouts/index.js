import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import Nav from 'components/Nav';
import theme from 'style/theme';

import 'style/global.css';

const TemplateWrapper = props => {
  const meta = props.data.site.siteMetadata;
  const links = props.data.allMenuLinksYaml.edges.map(edge => edge.node);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Helmet titleTemplate={`%s | ${meta.title}`} defaultTitle={meta.title}>
          <meta name="description" content={meta.description} />
          <meta name="keywords" content={meta.keywords.join(',')} />
        </Helmet>
        <Nav links={links} />
        {props.children()}
      </div>
    </ThemeProvider>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export const pageQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        keywords
        description
        siteUrl
      }
    }
    allMenuLinksYaml {
      edges {
        node {
          path
          copy
          url
          color
        }
      }
    }
  }
`;

export default TemplateWrapper;
