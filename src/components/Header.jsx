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

class Header extends React.Component {

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
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    )
  }

}

export default Header;