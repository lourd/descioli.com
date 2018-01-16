import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Nav from 'components/Nav';

import 'style/global.css';

const TemplateWrapper = props => {
  const meta = props.data.site.siteMetadata;
  const links = props.data.allMenuLinksYaml.edges.map(edge => edge.node);
  return (
    <div>
      <Helmet titleTemplate={`%s | ${meta.title}`} defaultTitle={meta.title}>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords.join(',')} />
      </Helmet>
      <Nav links={links} />
      {props.children()}
    </div>
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
