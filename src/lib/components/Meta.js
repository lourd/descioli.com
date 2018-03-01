import React from 'react'
import PropTypes from 'prop-types'
import Head from 'react-helmet'

const Meta = props => (
  <Head>
    {props.title && <title>{props.title}</title>}
    {props.title && <meta property="og:title" content={props.title} />}
    {props.description && <meta name="description" content={props.description} />}
    {props.description && <meta property="og:description" content={props.description} />}
    {props.keywords.length > 0 && (
      <meta name="keywords" content={props.keywords.join(',')} />
    )}
    {/* Open graph & twitter */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content={props.authorHandle} />
    {props.image && <meta property="og:image" content={props.url + props.image} />}
  </Head>
)

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string,
  authorHandle: PropTypes.string.isRequired,
}

Meta.defaultProps = {
  keywords: [],
  // not hard coding these would be nice
  authorHandle: '@louisdescioli',
  url: 'https://www.descioli.design',
}

export default Meta
