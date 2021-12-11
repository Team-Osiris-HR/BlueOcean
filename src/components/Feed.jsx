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



  render() {
    return (
<<<<<<< HEAD
      <div className="page">
        <div className="top">
          <Stack direction="horizontal" gap={2}>
            <Button className="rounded-pill" variant="outline-primary" size="sm">map</Button>
            <Button className="rounded-pill ms-auto" variant="outline-primary" size="sm">filter</Button>
            <Button className="rounded-pill" variant="outline-primary" size="sm">sort</Button>
          </Stack>
        </div>
        <div className="middle">
          <Container>
            <Col></Col>
            <Col className="text-center">
              <FeedTile />
              <FeedTile />
              <FeedTile />
              <FeedTile />
              <FeedTile />
              <FeedTile />
              <FeedTile />
              <FeedTile />
              <FeedTile />
              <FeedTile />
              <FeedTile />
              <FeedTile />
              <FeedTile />
              <FeedTile />
              <FeedTile />
            </Col>
            <Col></Col>
=======
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
          <Row xs={1} sm={2} md={4}>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>
            <Col className="text-center feed_card">
              <FeedTile/>
            </Col>

          </Row>
        </Container>
      </div>
      <div className="bottom">
        <div className="donate">
          <Container className="text-center">
            <Button variant="primary" size="lg">Donate</Button>
<<<<<<< HEAD
>>>>>>> Phil
=======
>>>>>>> eff8c93ae01124b2654c5348971c1c49100e6ca9
>>>>>>> kim
          </Container>
          <div className="bottom">
            <Container>
              <Col></Col>
              <Col>
                <FeedTile />
                <FeedTile />
                <FeedTile />
                <FeedTile />
                <FeedTile />
                <FeedTile />
                <FeedTile />
                <FeedTile />
                <FeedTile />
                <FeedTile />
                <FeedTile />
                <FeedTile />
                <FeedTile />
                <FeedTile />
                <FeedTile />
              </Col>
              <Col></Col>
            </Container>
          </div>
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