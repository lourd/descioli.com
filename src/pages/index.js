import React, { Component } from 'react';
import TopPanel from 'components/home/TopPanel';
import Meta from 'lib/components/Meta'

const Homepage = props => (
  <main>
    <Meta
      image={props.data.headerImage.sizes.src}
    />
    <TopPanel
      bylines={props.data.allBylinesYaml.edges.map(edge => edge.node.text)}
      img={props.data.headerImage.sizes.src}
    />
  </main>
);

export default Homepage;

export const pageQuery = graphql`
  query HomeQuery {
    allBylinesYaml {
      edges {
        node {
          text
        }
      }
    }
    headerImage: imageSharp(id: { regex: "/header/" }) {
      sizes(maxWidth: 1600) {
        src
      }
    }
  }
`;
