import React from 'react'
import styled from 'styled-components'
import Head from 'react-helmet'
import Img from 'gatsby-image'
import { shadows } from 'style/snippets'
import sizes from 'style/sizes'

const maxWidth = 800
const sidePadding = '2.5%'

const Page = styled.div``
const Content = styled.div`
  max-width: ${maxWidth}px;
  margin: 0 auto;
  padding: 20px ${sidePadding};
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
  main {
    padding-top: 10px;
    p,
    li {
      font-family: ${props => props.theme.serif};
    }
  }
  figcaption {
    font-size: 0.8em;
    margin: 10px auto 15px;
    color: #777;
    text-align: center;
    line-height: 1.3;
    max-width: ${0.9 * maxWidth}px;
  }
  blockquote {
    border-left: 4px solid #dfe2e5;
    color: #6a737c;
    margin: 0px 0px 16px 0px;
    padding: 0px 16px;
    white-space: pre;
    overflow: auto;
    p {
      margin: 0;
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
  color: ${props => props.theme.gray};
  font-size: 0.9em;
  margin-bottom: 20px;
`

const Description = styled.h2`
  font-weight: 300;
  margin-bottom: 15px;
  @media (min-width: ${sizes.medium}) {
    font-size: 2em;
  }
`

const Dates = props => {
  const written = <div>Published {props.publication}</div>
  const edited = props.publication !== props.lastEdit && (
    <div>Last edited {props.lastEdit}</div>
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
      <Head>
        <title>{data.markdownRemark.frontmatter.title}</title>
        <meta
          name="description"
          content={data.markdownRemark.frontmatter.description}
        />
        <meta
          name="keywords"
          content={data.markdownRemark.frontmatter.tags.join(',')}
        />
      </Head>
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
        />
        <main dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </Content>
    </Page>
  )
}

export default Story

export const pageQuery = graphql`
  query StoryQueryByPath($path: String!, $imageFocus: ImageCropFocus) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
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
