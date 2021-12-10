import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container, Row, Col, Offcanvas, Stack } from 'react-bootstrap';

import FeedTile from './FeedTile.jsx'

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFeed: 'public',
    };
  }




  render () {
    return (
    <div className="page">
      <div className="top">
      <Stack direction="horizontal" gap={2}>
        <Button className="rounded-pill" variant="outline-primary" size="sm">map</Button>
        <Button className="rounded-pill ms-auto" variant="outline-primary" size="sm">filter</Button>
        <Button className="rounded-pill" variant="outline-primary" size="sm">sort</Button>
      </Stack>
      </div>
      <div className = "middle">
        <Container>
          <Col></Col>
          <Col className="text-center">
            <FeedTile/>
            <FeedTile/>
            <FeedTile/>
            <FeedTile/>
            <FeedTile/>
            <FeedTile/>
            <FeedTile/>
            <FeedTile/>
            <FeedTile/>
            <FeedTile/>
            <FeedTile/>
            <FeedTile/>
            <FeedTile/>
            <FeedTile/>
            <FeedTile/>
          </Col>
          <Col></Col>
        </Container>
      </div>
      <div className="bottom">
        <div className="donate">
          <Container className="text-center">
            <Button variant="primary" size="lg">Donate</Button>
          </Container>
        </div>
      </div>
    </div>


    )
  }

}




export default Feed;