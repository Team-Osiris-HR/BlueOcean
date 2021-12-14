import React from 'react';
import CharityMap from './CharityMap.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2>Nearby Charities</h2>
        <CharityMap />
      </div>

    );
  }
}

export default App;