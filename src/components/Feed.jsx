import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container, Row, Col, Offcanvas, Stack } from 'react-bootstrap';

import FeedTile from './FeedTile.jsx'
import Donate from './Donate.jsx'

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDonate: false
    };
    this.toggleDonate = this.toggleDonate.bind(this);
  }

  toggleDonate(e) {
    var toggle = this.state.showDonate;
    if (toggle) {
      this.setState({ showDonate: false });
    } else {
      this.setState({ showDonate: true });
    }
  }


  render() {
    return (
      <div className="page">
        <div className="top">
          <Stack direction="horizontal" gap={2}>
            <Button className="rounded-pill ms-auto" variant="outline-primary" size="sm">sort</Button>
            <Button className="rounded-pill" variant="outline-primary" size="sm">map</Button>
          </Stack>
        </div>
        <div className="middle">
          <Container>
            <Row xs={1} sm={2} md={3}>
              {this.props.posts.filter((value) => {
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
          <Container className="text-center">
            <Button variant="primary" size="lg" onClick={this.toggleDonate}>Donate</Button>
          </Container>
          {this.state.showDonate ? <Donate toggleDonate={this.toggleDonate} currentUser={this.props.currentUser} /> : null}
        </div>
      </div>
    )
  }

}




export default Feed;