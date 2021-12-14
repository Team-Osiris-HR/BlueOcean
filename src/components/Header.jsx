import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import OffcanvasHeader from 'react-bootstrap/OffcanvasHeader'
import OffcanvasBody from 'react-bootstrap/OffcanvasBody'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Search from './Search.jsx'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import Cookies from 'js-cookie'

import axios from 'axios'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleSearch: 'hide-search'
    }
    this.chooseCategory = this.chooseCategory.bind(this)
    this.choosePickup = this.choosePickup.bind(this)
    this.logout = this.logout.bind(this)
  }

  chooseCategory(e) {
    this.props.setCategory(e.target.outerText)
  }

  choosePickup(e) {
    this.props.setPickup(e.target.outerText)
  }

  logout() {
    axios.get('/api/users/logout')
      .then((result) => {
        alert('see you again!')
        Cookies.remove('jwt')
        this.props.setRenderState("login")
      }).catch((err) => {
        console.log(err)
      });
  }

  render() {
    return (
      <Navbar bg="light" expand={false}>
        <Container fluid>
          <Col className="p-2 flex-shrink-1">
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
          </Col>
          {this.props.render === 'itempage' || this.props.render === 'donoritempage' || this.props.render === 'chat' ? <Button type="button" variant='warning' onClick={() => { this.props.setRenderState('feed') }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
          </Button> : null}
          <Col className="p-2 flex-fill">
            <Search setSearch={this.props.setSearch} />
          </Col>
          <Col className="d-flex justify-content-end" xs>
            {this.props.render === 'feed' ? <button className='search-button' alt-text="messages" onClick={() => { this.props.setRenderState('chat') }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-text" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button> : null}
          </Col>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">mikeslist</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <h6 className='mb-3' onClick={(e) => this.chooseCategory(e)}>account</h6>
                <ButtonGroup className="mb-3" aria-label="pickupOption">
                  <Button variant="primary" onClick={(e) => this.choosePickup(e)}>pick up</Button>
                  <Button variant="secondary" onClick={(e) => this.choosePickup(e)}>delivery</Button>
                  <Button variant="primary" onClick={(e) => this.choosePickup(e)}>negotiable</Button>
                </ButtonGroup>
                <h6>category</h6>
                <ListGroup as="ul">
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)}>appliances</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)}>electronics</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)}>food</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)}>pet</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)}>furnitures</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)}>vehicles</ListGroup.Item>
                </ListGroup>
              </Nav>
              <Button onClick={() => { this.logout() }}>
                logout
              </Button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    )
  }

}

export default Header;

/**

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
 */