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

      render: "feed",
      posts: [],
      currentPost: '',
      currentUser: {},
      search: ''

    }
    this.renderView = this.renderView.bind(this)
    this.getPosts = this.getPosts.bind(this)
    this.getPostId = this.getPostId.bind(this)
    this.setRenderState = this.setRenderState.bind(this)
    this.getCookies = this.getCookies.bind(this)
    this.setCurrentUser = this.setCurrentUser.bind(this)
    this.setSearch = this.setSearch.bind(this)
  }

  componentDidMount() {
    this.getPosts()
    this.getCookies()
  }

  getPosts() {
    axios.get('/api/posts')
      .then((res) => {
        this.setState({
          posts: res.data.posts
        })
      })
      .catch((err) => {
        console.log("🚀 ~ file: App.jsx ~ line 47 ~ App ~ getPosts ~ err", err)
      })
  }

  getPostId(id) {
    this.setState({
      currentPost: id,
      render: 'itempage'
    })
  }

  getCookies() {
    if (Cookies.get("jwt")) {
      this.setState({ render: 'feed' })
      this.getPosts(); // change this later
    } else {
      this.setState({ render: 'login' })
    }
  }

  setRenderState(whatState) {
    this.setState({ render: whatState })
    this.getPosts();
    this.renderView()
  }

  setCurrentUser(currentUser) {
    this.setState({ currentUser: currentUser })
  }

  setSearch(searchItem) {
    console.log('this is search item,')
    const filteredSearch = []
    this.setState({ search: searchItem })
    if (searchItem.length >= 3) {
      this.state.posts.filter((post) => {
        if (post.title.toLowerCase().includes(this.state.search)) {
          filteredSearch.push(post)
        }
      })
    } else {
      this.getPosts()
    }
    this.setState({ posts: filteredSearch })
  }


  renderView() {
    if (this.state.render === "login") {
      return (
        <Container>
          <Col>
            <Login setRenderState={this.setRenderState} setCurrentUser={this.setCurrentUser} />
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
      return (
        <Feed
          posts={this.state.posts}
          getPostId={this.getPostId}
        />
      )
    } else if (this.state.render === 'itempage') {
      return (
        <ItemPage
          currentPost={this.state.currentPost}
        />
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.render === "feed" || this.state.render === "itempage" ? <Header setRenderState={this.setRenderState} setSearch={this.setSearch} /> : null}
        {this.renderView()}
      </React.Fragment>
    );
  }
}

export default App;
