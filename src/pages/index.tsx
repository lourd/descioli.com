import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import TopPanel from 'components/home/TopPanel';
import Meta from 'components/Meta';

const Homepage = () => {
  const data = useStaticQuery(graphql`
    query HomeQuery {
      bylinesYaml {
        bylines
      }
      headerImage: imageSharp(original: { src: { regex: "/header/" } }) {
        fluid(maxWidth: 1600) {
          src
        }
      }
    }
  `);
  return (
    <main>
      <Meta image={data.headerImage.fluid.src} />
      <TopPanel
        bylines={data.bylinesYaml.bylines}
        img={data.headerImage.fluid.src}
      />
    </main>
  );
};

export default Homepage;
