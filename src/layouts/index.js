import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import Nav from 'components/Nav'
import theme from 'style/theme'
import Blur from 'lib/components/Blur'

import 'style/global.css'

class TemplateWrapper extends React.Component {
  state = {
    open: false,
  }

  toggle = () => this.setState(state => ({ open: !state.open }))

  render() {
    const meta = this.props.data.site.siteMetadata
    const links = this.props.data.allMenuLinksYaml.edges.map(edge => edge.node)
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Helmet
            titleTemplate={`%s | ${meta.title}`}
            defaultTitle={meta.title}
          >
            <meta name="description" content={meta.description} />
            <meta name="keywords" content={meta.keywords.join(',')} />
            <html lang="en" />
          </Helmet>
          <Nav links={links} toggle={this.toggle} open={this.state.open} />
          <Blur blurred={this.state.open}>{this.props.children()}</Blur>
        </div>
      </ThemeProvider>
    )
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export const pageQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        keywords
        description
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
`

export default TemplateWrapper
