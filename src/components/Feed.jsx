import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container, Row, Col, Offcanvas, Stack } from 'react-bootstrap';

import FeedTile from './FeedTile.jsx'

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFeed: 'public',
      showSide: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleClose () {
    if(this.state.showSide === true) {this.setState({ showSide: false })}
  }

  handleShow () {
    if(this.state.showSide === false) {this.setState({ showSide: true })}
  }


  render () {
    return (
    <div className="page">
      <Container>
        <Row>
          <Stack direction="horizontal" gap={3}>
            <Button className="mx-2" variant="primary" size="sm">leftButton</Button>
            <Button className="mx-2" variant="primary" size="sm">rightButton</Button>
          </Stack>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={10}>
            <input
              className="search"
              type="text"
              onChange={this.handleSearchInputChange}
              placeholder="Search Donations">
            </input>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <div className = "bottom">
        <Container>
          <Col></Col>
          <Col>
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
    </div>


    )
  }

}




export default Feed;