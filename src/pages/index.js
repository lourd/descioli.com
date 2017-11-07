import React, { Component } from 'react';

import TopPanel from 'components/home/TopPanel';
import MissionPanel from 'components/home/MissionPanel';

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
