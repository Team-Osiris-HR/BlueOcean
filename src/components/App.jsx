import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import OrgSignup from './OrgSignup.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      render: "signup"
    }

    this.renderView = this.renderView.bind(this)
  }

  renderView() {
    if (this.state.render === "login") {
      return <Login />
    } else if (this.state.render === "signup") {
      return <Signup />
    } else if (this.state.render === 'organization') {
      return <OrgSignup />
    } else {
      return (<h1>hello world</h1>)
    }
  }

  render() {
    return (
      <Container className='app-container'>
        <Col >
          {this.renderView()}
        </Col>
      </Container >
    );
  }
}

export default App;
