import React from 'react';
import Feed from './Feed.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Feed/>
      </div>
    );
  }
}

export default App;