import React from 'react';
import MapContainer from './MapContainer.jsx';

class App extends React.Components {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div>
        <p>Home Page</p>
        <MapContainer />
      </div>
    );
  }
}