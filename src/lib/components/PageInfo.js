import React from 'react'
import PropTypes from 'prop-types'
import Head from 'react-helmet'

const PageInfo = props => (
  <Head>
    <title>{props.title}</title>
    <meta name="description" content={props.description} />
    {props.keywords.length > 0 && (
      <meta name="keywords" content={props.keywords.join(',')} />
    )}
  </Head>
)

PageInfo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
}

PageInfo.defaultProps = {
  keywords: [],
}

export default PageInfo
