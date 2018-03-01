import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { shadows } from 'style/snippets'
import sizes from 'style/sizes'
import Meta from 'lib/components/Meta'

const maxWidth = 800
const sidePadding = '2.5%'

const Page = styled.div``
const Content = styled.div`
  max-width: ${maxWidth}px;
  margin: 0 auto;
  padding: 20px ${sidePadding};
  main {
    padding-top: 10px;
    p,
    li {
      font-family: ${props => props.theme.serif};
    }
    img,
    video,
    figure {
      display: block;
      margin: 0 auto;
      max-width: 100%;
    }
    img,
    .gatsby-resp-iframe-wrapper,
    .gatsby-resp-image-wrapper,
    video {
      ${shadows()};
    }
    .gatsby-resp-iframe-wrapper {
      margin-bottom: 10px;
    }
    @media (min-width: ${sizes.large}) {
      padding-left: 0;
      padding-right: 0;
    }
    figcaption {
      font-size: 0.8em;
      margin: 10px auto 15px;
      color: ${props => props.theme.comment};
      text-align: center;
      line-height: 1.3;
      max-width: ${0.9 * maxWidth}px;
    }
    blockquote,
    .quote {
      font-family: ${props => props.theme.serif};
      font-size: 1em;
      border-left: 4px solid #dfe2e5;
      color: {props => props.theme.quote};
      margin: 0px 0px 16px 0px;
      padding: 0px 16px;
      white-space: pre;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    h1,
    h2,
    h3,
    h4 {
      margin-top: 0.75rem;
    }
  }
`

const Header = styled.div`
  position: relative;
`

const HeaderImg = styled(Img)`
  min-height: 50vh;
  max-height: 700px;
`

const HeaderContent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  padding: 20px ${sidePadding};
  color: white;
  text-shadow: ${props => props.theme.textShadow};
  max-width: ${maxWidth}px;
  margin: 0 auto;
  @media (min-width: ${sizes.medium}) {
    font-size: 2em;
  }
  @media (min-width: ${sizes.large}) {
    padding-left: 0;
    padding-right: 0;
  }
  h1 {
    margin-bottom: 0;
    font-size: 3em;
  }
`

const DatesContainer = styled.div`
  font-size: 0.9em;
  margin-bottom: 20px;
  &,
  a {
    color: ${props => props.theme.gray};
  }
`

const Description = styled.h2`
  font-weight: 300;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.6em;
  @media (min-width: ${sizes.medium}) {
    font-size: 1.8em;
  }
`

const Dates = props => {
  const written = <div>Published {props.publication}</div>
  const edited = props.publication !== props.lastEdit && (
    <div>
      <a href={props.lastEditUrl} target="_blank" rel="noopener">
        Last edited
      </a>{' '}
      {props.lastEdit}
    </div>
  )
  return (
    <DatesContainer>
      {written}
      {edited}
    </DatesContainer>
  )
}

const Story = ({ data }) => {
  // default to the header, fallback to the image
  const image =
    data.markdownRemark.frontmatter.header ||
    data.markdownRemark.frontmatter.image
  return (
    <Page>
      <Meta
        title={data.markdownRemark.frontmatter.title}
        keywords={data.markdownRemark.frontmatter.tags}
        description={data.markdownRemark.frontmatter.description}
        image={image.childImageSharp.sizes.src}
      />
      <Header>
        <HeaderImg sizes={image.childImageSharp.sizes} />
        <HeaderContent>
          <h1>{data.markdownRemark.frontmatter.title}</h1>
        </HeaderContent>
      </Header>
      <Content>
        <Description>{data.markdownRemark.frontmatter.description}</Description>
        <Dates
          publication={data.markdownRemark.frontmatter.publication}
          lastEdit={data.markdownRemark.frontmatter.lastEdit}
          lastEditUrl={data.markdownRemark.fields.lastEditUrl}
        />
        <main dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </Content>
    </Page>
  )
}

export default Story

export const pageQuery = graphql`
  query StoryQueryByPath($path: String!, $imageFocus: ImageCropFocus) {
    site {
      siteMetadata {
        repo
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      parent {
        ... on File {
          relativePath
        }
      }
      html
      fields {
        lastEditUrl
      }
      frontmatter {
        publication(formatString: "dddd MMMM Do, YYYY")
        lastEdit(formatString: "dddd MMMM Do, YYYY")
        path
        title
        description
        tags
        image {
          childImageSharp {
            sizes(maxWidth: 1600, maxHeight: 700, cropFocus: $imageFocus) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
        header {
          childImageSharp {
            sizes(maxWidth: 1600, maxHeight: 700, cropFocus: $imageFocus) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
      }
    }
  }
`
