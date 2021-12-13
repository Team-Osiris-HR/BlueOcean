import React from 'react';
import Chat from './chat/Chat.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    return (
      <div>
        <p>Home Page</p>
        <Chat />
      </div>
    );
  }
}

export default App;