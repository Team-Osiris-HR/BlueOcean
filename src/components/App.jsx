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
import Cookies from 'js-cookie'
import ItemPage from './itempage/ItemPage.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      render: "itempage",
    }
    this.renderView = this.renderView.bind(this)
    this.getPosts = this.getPosts.bind(this)
    this.setRenderState = this.setRenderState.bind(this)
    this.getCookies = this.getCookies.bind(this)
  }

  componentDidMount() {
    this.getCookies()
  }

  getPosts() {
    axios.get('/api/posts', (req, res) => {
      console.log('this is req')
    })
  }

  getCookies() {
    if (Cookies.get("jwt")) {
      this.setState({ render: 'feed' }) // change this later
    } else {
      this.setState({ render: 'login' })
    }
  }

  setRenderState(whatState) {
    this.setState({ render: whatState })
    this.renderView()
  }


  renderView() {
    if (this.state.render === "login") {
      return (
        <Container>
          <Col>
            <Login setRenderState={this.setRenderState} />
          </Col>
        </Container>
      )
    } else if (this.state.render === "signup") {
      return (
        <Container>
          <Col>
            <Signup setRenderState={this.setRenderState} />
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
    } else if (this.state.render === 'feed') {
      return <Feed />
    } else if (this.state.render === 'itempage') {
      return (
        <ItemPage />
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.render === "feed" || this.state.render === "itempage" ? <Header setRenderState={this.setRenderState} /> : null}
        {this.renderView()}
      </React.Fragment>
    );
  }
}

export default App;
