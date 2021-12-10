import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import OrgSignup from './OrgSignup.jsx'
import Header from './Header.jsx'
import Feed from './Feed.jsx'
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      render: "",
    }
    this.renderView = this.renderView.bind(this)
    this.getPosts = this.getPosts.bind(this)
  }

  componentDidMount() {
    // this.getPosts()
  }

  getPosts() {
    axios.get('/api/posts', (req, res) => {
      console.log('this is req')
    })
  }


  renderView() {
    if (this.state.render === "login") {
      return (
        <Container>
          <Col>
            <Login />
          </Col>
        </Container>
      )
    } else if (this.state.render === "signup") {
      return (
        <Container>
          <Col>
            <Signup />
          </Col>
        </Container>
      )
    } else if (this.state.render === 'organization') {
      return (
        <Container>
          <Col>
            <OrgSignup />
          </Col>
        </Container>
      )
    } else {
      return <Feed />
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.render === "" ? <Header /> : null}
        {this.renderView()}
      </React.Fragment>
    );
  }
}

export default App;
