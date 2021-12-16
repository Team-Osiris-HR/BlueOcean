import React from 'react';
import Chat from './chat/Chat.jsx'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import OrgSignup from './OrgSignup.jsx'
import Header from './Header.jsx'
import Feed from './Feed.jsx'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import Cookies from 'js-cookie'
import ItemPage from './itempage/ItemPage.jsx';
import DonorItemPage from './itempage/DonorItemPage.jsx';
import Account from './Account.jsx'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      render: "feed",
      posts: [],
      currentPost: '',
      currentUser: {},
      search: '',
      newMessageStatus: false,
      itemObj: {},
      pickup: 'negotiable',
      category: 'none',
      sort: 'date'

    }
    this.renderView = this.renderView.bind(this)
    this.getPosts = this.getPosts.bind(this)
    this.getPostId = this.getPostId.bind(this)
    this.setRenderState = this.setRenderState.bind(this)
    this.getCookies = this.getCookies.bind(this)
    this.setCurrentUser = this.setCurrentUser.bind(this)
    this.setSearch = this.setSearch.bind(this)
    this.messagePoster = this.messagePoster.bind(this)
    this.clearMessageStatus = this.clearMessageStatus.bind(this)
    this.setCategory = this.setCategory.bind(this);
    this.setPickup = this.setPickup.bind(this);
    this.setSort = this.setSort.bind(this);
  }

  componentDidMount() {
    this.getPosts()
    this.getCookies()
  }

  // * Grabs all the post, unfiltered
  getPosts() {
    axios.get('/api/posts')
      .then((res) => {
        var posts = res.data.posts.reverse()
        this.setState({
          posts: posts
        })
      })
      .catch((err) => {
        console.log("🚀 ~ file: App.jsx ~ line 47 ~ App ~ getPosts ~ err", err)
      })
  }

  // * Grabs the post id
  getPostId(id, userId) {
    if (userId === this.state.currentUser._id) {
      this.setState({
        currentPost: id,
        render: 'donoritempage'
      })
    } else {
      this.setState({
        currentPost: id,
        render: 'itempage'
      })
    }
  }

  // * Check cookies. If present, straight to feed, otherwise, login
  getCookies() {
    if (Cookies.get("jwt")) {
      if (!this.state.currentUser.name) {
        axios.get('/api/users/myinfo')
          .then((result) => {
            this.setState({ currentUser: result.data.user })
          })
          .catch((error) => {
            console.log(error);
          })
      }
      this.setState({ render: 'feed' })
      this.getPosts(); // change this later
    } else {
      this.setState({ render: 'login' })
    }

  }

  // * set whatever page we want to render
  setRenderState(whatState) {
    this.setState({ render: whatState })
    this.getPosts();
    this.renderView()
  }

  // * set the current user to whoever is loggedin
  setCurrentUser(currentUser) {
    this.setState({ currentUser: currentUser })
  }

  // * set state for whatever item is being searched
  setSearch(e) {
    this.setState({ search: e.target.value })
  }

  messagePoster = (item) => {
    this.setState({ render: 'chat', newMessageStatus: true, itemObj: item })
  }

  clearMessageStatus = () => {
    this.setState({ newMessageStatus: false })
  }

  setCategory(inputCategory) {
    this.setState({ category: inputCategory })
  }
  setPickup(inputPickup) {
    this.setState({ pickup: inputPickup })
  }
  setSort(inputSort) {
    this.setState({ sort: inputSort })
  }

  renderView() {
    if (this.state.render === "login") {
      return (
        <Container >
          <Col className='login-container'>
            <Login setRenderState={this.setRenderState} setCurrentUser={this.setCurrentUser} />
          </Col>
        </Container>
      )
    } else if (this.state.render === "signup") {
      return (
        <Container>
          <Col className='login-container'>
            <Signup setRenderState={this.setRenderState} />
          </Col>
        </Container >
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
          searchItem={this.state.search}
          currentUser={this.state.currentUser}
          update={this.getPosts}
          category={this.state.category}
          pickup={this.state.pickup}
          sort={this.state.sort}
        />
      )
    } else if (this.state.render === 'itempage') {
      return (
        <ItemPage
          currentPost={this.state.currentPost}
          messagePoster={this.messagePoster}
        />
      )
    } else if (this.state.render === 'donoritempage') {
      return (
        <DonorItemPage
          id={this.state.currentPost}
          setRenderState={this.setRenderState}
        />)
    } else if (this.state.render === 'chat') {
      return (
        <Chat
          itemObj={this.state.itemObj}
          user={this.state.currentUser}
          currentPost={this.state.currentPost}
          newMessageStatus={this.state.newMessageStatus}
          setRenderState={this.setRenderState}
          clearMessageStatus={this.clearMessageStatus} />
      )
    } else if (this.state.render === 'account') {
      return (
        <Account
          currentUser={this.state.currentUser}
          setCurrentUser={this.setCurrentUser}
          setRenderState={this.setRenderState}
        />
      )
    } else if (this.state.render === 'logout') {
      return (
        <Container>
          <Col className='login-container text-center'>
            <h1>See you again!</h1>
          </Col>
        </Container>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.render === "feed" ||
          this.state.render === "itempage" ||
          this.state.render === 'donoritempage' ||
          this.state.render === 'chat' ||
          this.state.render === 'account' ?
          <Header
            setRenderState={this.setRenderState}
            setSearch={this.setSearch}
            setCategory={this.setCategory}
            setPickup={this.setPickup}
            setSort={this.setSort}
            setCurrentUser={this.setCurrentUser}
            render={this.state.render}
          />
          : null}
        {this.renderView()} {/* //* conditonal rendering based on what page we want to render */}
      </React.Fragment>

    );
  }
}

export default App;
