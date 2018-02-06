import React from 'react'
import styled from 'styled-components'
import PageInfo from 'lib/components/PageInfo'

const Page = styled.main`
  padding: 2.5%;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 800px;
  background-color: red;
`

const Spiel = props => (
  <Page>
    <PageInfo
      title={props.data.markdownRemark.frontmatter.title}
      description={props.data.markdownRemark.frontmatter.description}
      keywords={props.data.markdownRemark.frontmatter.tags}
    />
    <Content
      dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
    />
  </Page>
)

export const pageQuery = graphql`
  query SpielQuery {
    markdownRemark(frontmatter: { title: { eq: "Spiel" } }) {
      html
      frontmatter {
        title
        description
        tags
      }
    }
  }
`

export default Spiel
