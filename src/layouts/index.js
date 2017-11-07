import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import './index.css';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Louis DeScioli"
      meta={[
        {
          name: 'description',
          content: 'The personal site and portfolio of one Louis R DeScioli'
        },
        {
          name: 'keywords',
          content: 'software engineer, portfolio, design, personal site'
        }
      ]}
    />
    {children()}
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
