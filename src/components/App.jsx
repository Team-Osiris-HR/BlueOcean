import React from 'react';
import ItemPage from './itemPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div>
        <p>Home Page</p>
        <ItemPage />
      </div>
    );
  }
}

export default App;