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
import ListGroup from 'react-bootstrap/ListGroup'
import Cookies from 'js-cookie'

import axios from 'axios'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.clickCategory = this.clickCategory.bind(this)
    this.logout = this.logout.bind(this)
  }

  clickCategory(e) {
    console.log(e.target.outerText)
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
          <Col>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
          </Col>
          <Col xs>
            <span>mikeslist</span>
          </Col>
          <Col>
            <Search />
          </Col>
          <Col>
            <Button variant='primary'>
              Message
            </Button>
          </Col>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">mikeslist</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Account</Nav.Link>
                <h6>category</h6>
                <ListGroup as="ul">
                  <ListGroup.Item as="li" onClick={(e) => this.clickCategory(e)}>clothes</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.clickCategory(e)}>food</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.clickCategory(e)}>furniture</ListGroup.Item>
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