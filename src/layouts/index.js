import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import 'style/global.css';

const keywords = [
  'software engineer',
  'portfolio',
  'design',
  'personal site'
].join(',');

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet titleTemplate="%s | Louis DeScioli" defaultTitle="Louis DeScioli">
      <meta
        name="description"
        content="The personal site and portfolio of one Louis R DeScioli"
      />
      <meta name="keywords" content={keywords} />
    </Helmet>
    {children()}
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
