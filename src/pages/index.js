import React, { Component } from 'react';

import TopPanel from 'components/home/TopPanel';
import MissionPanel from 'components/home/MissionPanel';
import GrovePanel from 'components/home/GrovePanel';

class Homepage extends Component {
  render() {
    return (
      <main>
        <TopPanel />
        <MissionPanel />
        {this.props.data.allProjectsYaml.edges.map(edge => (
          <GrovePanel
            key={edge.node.id}
            copy={edge.node.byline}
            img={`/img/${edge.node.img}`}
          />
        ))}
      </main>
    );
  }
}

export default Homepage;

export const pageQuery = graphql`
  query ProjectsQuery {
    allProjectsYaml {
      edges {
        node {
          byline
          img
          id
        }
      }
    }
  }
`;
