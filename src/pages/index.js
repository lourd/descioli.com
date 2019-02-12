import React, { Component } from 'react';
import TopPanel from 'components/home/TopPanel';
import Meta from 'lib/components/Meta'

const Homepage = props => (
  <main>
    <Meta
      image={props.data.headerImage.sizes.src}
    />
    <TopPanel
      bylines={props.data.bylinesYaml.bylines}
      img={props.data.headerImage.sizes.src}
    />
  </main>
);

export default Homepage;

export const pageQuery = graphql`
  query HomeQuery {
    bylinesYaml {
      bylines
    }
    headerImage: imageSharp(id: { regex: "/header/" }) {
      sizes(maxWidth: 1600) {
        src
      }
    }
  }
`;
