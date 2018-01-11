import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Nav from 'components/Nav';

import 'style/global.css';

const keywords = [
  'software engineer',
  'portfolio',
  'design',
  'personal site'
].join(',');

const TemplateWrapper = props => (
  <div>
    <Helmet titleTemplate="%s | Louis DeScioli" defaultTitle="Louis DeScioli">
      <meta
        name="description"
        content="The personal site and portfolio of one Louis R DeScioli"
      />
      <meta name="keywords" content={keywords} />
    </Helmet>
    <Nav links={props.data.allMenuLinksYaml.edges.map(edge => edge.node)} />
    {props.children()}
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export const pageQuery = graphql`
  query LayoutQuery {
    allMenuLinksYaml {
      edges {
        node {
          path
          copy
          url
        }
      }
    }
  }
`;

export default TemplateWrapper;
