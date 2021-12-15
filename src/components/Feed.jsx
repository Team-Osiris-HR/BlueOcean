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
      feed: 'public',
      sort: 'date',
      showDonate: false,
      title: '',
      description: '',
      category: 'appliances',
      deliveryOptions: 'negotiable',
      charitiesOnly: true,
      files: [],
      view: "sort"
    };
    this.toggleDonate = this.toggleDonate.bind(this);
    this.makeDonation = this.makeDonation.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.makeDonation = this.makeDonation.bind(this);
    this.toggleFeed = this.toggleFeed.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    this.toggleMap = this.toggleMap.bind(this);
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

    let photoFiles = new FormData()
    let files = this.state.files;
    photoFiles.append(`photos`, files.concat(photoUrls))

    this.toggleDonate(e)

    axios.post('/api/posts', {
      name: this.props.currentUser.name,
      email: this.props.currentUser.email,
      title: this.state.title,
      description: this.state.description,
      category: this.state.category,
      condition: this.state.condition,
      deliveryOptions: this.state.deliveryOptions,
      charitiesOnly: this.state.charitiesOnly,
      //photos: photoFiles
    })
      .then((res) => {
        this.props.update()
        console.log(`Success! ${res}`)
      })
      .catch((err) => {
        console.log("🚀 ~ file: Feed.jsx ~ line 68 ~ Feed ~ makeDonation ~ err", err)
      })
  }

  toggleMap(e) {
    if (this.state.view === 'map') {
      this.setState({view: 'sort'})
    } else {
      this.setState({ view: e.target.innerHTML });
    }
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

  toggleFeed() {
    this.state.feed === 'public' ?
      this.setState({ feed: 'myFeed' }) :
      this.setState({ feed: 'public' })
  }

  toggleSort() {
    this.state.sort === 'date' ?
      this.setState({ sort: 'distance' }) :
      this.setState({ sort: 'date' })
  }

  render() {

    return (
      <div className="page">
        <div className="top">
          <Stack direction="horizontal" gap={1}>
            <ButtonGroup className="ms-auto">
              <Button variant="primary" size="sm" onClick={(e) => this.toggleMap(e)}>map</Button>
              <Button variant="info" size="sm" onClick={this.toggleFeed}>Public Feed</Button>
              <Button variant="primary" size="sm" onClick={this.toggleFeed}>My Posts</Button>
            </ButtonGroup>
          </Stack>
        </div>
        {this.state.view === "map" ?
          (<div>
            <Map type="feedView"
              posts={this.props.posts}
              currentUser={this.props.currentUser} />
          </div>)
          :
          (<>
            <div className="middle">
              <Container>
                <Row xs={1} sm={2} md={3}>
                  {this.props.posts.filter((val) => {
                    if (this.props.currentUser.role === 'charity') {
                      return val
                    }
                    if (this.props.currentUser.role === 'user') {
                      return !val.charitiesOnly
                    }
                  }).filter((val) => {
                    if (this.state.feed === 'public') {
                      return val
                    }
                    if (this.state.feed === 'myFeed') {
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
            <div className="bottom">
              <Container>
                <Button className='button' variant="primary" size="lg" onClick={this.toggleDonate}>Donate</Button>
              </Container>
              {this.state.showDonate ?
                <Donate
                  toggleDonate={this.toggleDonate}
                  handleOnChange={this.handleOnChange}
                  handleFileChange={this.handleFileChange}
                  makeDonation={this.makeDonation}
                /> : null}
            </div>
          </>
          )}
      </div>
    )
  }

}

export default Feed;

