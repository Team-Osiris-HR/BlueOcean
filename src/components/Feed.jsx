import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container, Row, Col, ButtonGroup, Stack } from 'react-bootstrap';
import FeedTile from './FeedTile.jsx'
import Donate from './Donate.jsx'
import Map from './Map/Map.jsx'

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: 'Public Feed',
      showDonate: false,
      title: '',
      description: '',
      category: 'appliances',
      deliveryOptions: 'negotiable',
      charitiesOnly: true,
      files: [],
      posts: [],
      mapBtn: 'top_buttons',
      publicBtn: 'selected',
      userFdBtn: 'top_buttons',

    };
    this.toggleDonate = this.toggleDonate.bind(this);
    this.makeDonation = this.makeDonation.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.toggleFeed = this.toggleFeed.bind(this);
  }


  toggleDonate(e) {
    var toggle = this.state.showDonate;
    if (toggle) {
      this.setState({ showDonate: false });
    } else {
      this.setState({ showDonate: true });
    }
  }

  makeDonation(e) {
    e.preventDefault()
    let photoUrls = []
    if (this.state.photo1) { photoUrls.push(this.state.photo1) }
    if (this.state.photo2) { photoUrls.push(this.state.photo2) }
    if (this.state.photo3) { photoUrls.push(this.state.photo3) }
    if (this.state.photo4) { photoUrls.push(this.state.photo4) }
    if (this.state.photo5) { photoUrls.push(this.state.photo5) }

    let formData = new FormData()
    let files = this.state.files;
    // for (var i = 0; i < files.length; i++) {
    //   formData.append('photos', {
    //     uri: files[i].uri,
    //     type: files[i].type,
    //     name: files[i].fileName
    //   })
    // }
    formData.append('photos', files[0]);
    formData.append('name', this.props.currentUser.name);
    formData.append('email', this.props.currentUser.email);
    formData.append('title', this.state.title);
    formData.append('description', this.state.description);
    formData.append('category', this.state.category);
    formData.append('condition', this.state.condition);
    formData.append('deliveryOptions', this.state.deliveryOptions);
    formData.append('charitiesOnly', this.state.charitiesOnly);
    formData.append('photoUrls', photoUrls);
    axios.post('/api/posts', formData, {
      headers: {
        'Content-Type': `multipart/form-data;`
      }
    })
      .then((res) => {
        this.props.update()
        console.log(`Success! ${res}`)
      })
      .catch((err) => {
        console.log("🚀 ~ file: Feed.jsx ~ line 68 ~ Feed ~ makeDonation ~ err", err)
      })
      this.toggleDonate(e);
  }

  handleFileChange(e) {
    let file = e.target.files[0]
    let files = this.state.files;
    if (files.length >= 5) {
      alert('Upload Limit Reached!! Max of 5 photos allowed!')
    }
    files.push(file)
    this.setState({ files: files })
  }

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  toggleFeed(e) {
    var selection = e.target.outerText
    if (selection === 'Public Feed') {
      this.setState({
        feed: 'Public Feed',
        mapBtn: 'top_buttons',
        publicBtn: 'selected',
        userFdBtn: 'top_buttons'
      })
    }
    if (selection === 'Map') {
      this.setState({
        feed:'Map',
        mapBtn: 'selected',
        publicBtn: 'top_buttons',
        userFdBtn: 'top_buttons'
      })
    }
    if (selection === 'My Posts') {
      this.setState({
        feed:'My Posts',
        mapBtn: 'top_buttons',
        publicBtn: 'top_buttons',
        userFdBtn: 'selected'
      })
    }
  }


  render() {
    var page;
    if (this.props.currentUser.role === 'user') { page="page"}
    if (this.props.currentUser.role === 'charity') { page="charityPage"}

    return (
      <div className={page}>
        <div className="top">
          <Stack direction="horizontal">
            <ButtonGroup className="ms-auto">
              <button className={this.state.mapBtn} onClick={this.toggleFeed}>Map</button>
              <button className={this.state.publicBtn} onClick={this.toggleFeed}>Public Feed</button>
              <button className={this.state.userFdBtn} onClick={this.toggleFeed}>My Posts</button>
            </ButtonGroup>
          </Stack>
        </div>
        {this.state.feed === "Map" ?
          (<div>
            <Map
              posts={this.props.posts}
              currentUser={this.props.currentUser} />
          </div>)
          :
          (<>
            <div className="middle">
              <Container>
                <Row xs={1} md={2} lg={3}>
                  {this.props.posts.filter((val) => {
                    if (val.active) {
                      return val
                    }
                  }).filter((val) => {
                    if (this.props.currentUser.role === 'charity' || this.props.currentUser.role === 'admin') {
                      return val
                    }
                    if (this.props.currentUser.role === 'user') {
                      return !val.charitiesOnly
                    }
                  }).filter((val) => {
                    if (this.state.feed === 'Public Feed') {
                      return val
                    }
                    if (this.state.feed === 'My Posts') {
                      return val.user === this.props.currentUser._id
                    }
                  }).filter((val) => {
                    if (this.props.category === 'none' || this.props.category === 'all' || !this.props.category) {
                      return val
                    } else {
                      return val.category === this.props.category
                    }
                  }).filter((val) => {
                    if (this.props.pickup === 'negotiable' || !this.props.pickup) {
                      return val
                    } else {
                      return val.deliveryOptions === this.props.pickup
                    }
                  }).filter((value) => {
                    if (this.props.searchItem.length < 3) {
                      return value;
                    } else if (value.title.toLowerCase().includes(this.props.searchItem.toLowerCase())) {
                      return value;
                    }
                  }).map((post) => (
                    <Col
                      className="text-center feed_card"
                      key={post._id}>
                      <FeedTile
                        post={post}
                        getPostId={this.props.getPostId}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
            {this.props.currentUser.role === 'user' || this.props.currentUser.role === 'admin' ?
            <div className="bottom">
              <Container>
                <button className='donateBtn' size="lg" onClick={this.toggleDonate}>Donate</button>
              </Container>
              {this.state.showDonate ?
                <Donate
                  toggleDonate={this.toggleDonate}
                  handleOnChange={this.handleOnChange}
                  handleFileChange={this.handleFileChange}
                  makeDonation={this.makeDonation}
                /> : null}
            </div> : null}
          </>
          )}
      </div>
    )
  }

}

export default Feed;

