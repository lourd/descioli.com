import React, { Component } from 'react';

import TopPanel from './_home/TopPanel';
import MissionPanel from './_home/MissionPanel';

class Homepage extends Component {
  render() {
    return (
      <main>
        <TopPanel />
        <MissionPanel />
      </main>
    );
  }
}

export default Homepage;
