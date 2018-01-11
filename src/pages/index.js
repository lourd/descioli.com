import React, { Component } from 'react';

import TopPanel from 'components/home/TopPanel';
import MissionPanel from 'components/home/MissionPanel';
import ProjectPanel from 'components/home/ProjectPanel';

class Homepage extends Component {
  render() {
    return (
      <main>
        <TopPanel
          bylines={this.props.data.allBylinesYaml.edges.map(edge => edge.node)}
        />
      </main>
    );
  }
}

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
  }
`;
