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
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";

import axios from 'axios'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleSearch: 'hide-search'
    }
    this.chooseCategory = this.chooseCategory.bind(this)
    this.choosePickup = this.choosePickup.bind(this)
    this.chooseSort = this.chooseSort.bind(this)
    this.logout = this.logout.bind(this)
  }

  chooseCategory(e) {
    this.props.setCategory(e.target.outerText)
  }

  choosePickup(e) {
    this.props.setPickup(e.target.outerText)
  }

  chooseSort(e) {
    this.props.setSort(e.target.outerText)
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
          {this.props.render === 'itempage' || this.props.render === 'donoritempage' || this.props.render === 'chat' || this.props.render === 'account' ? <button className='search-button' type="button" variant='warning' onClick={() => { this.props.setRenderState('feed') }}>
            <BsArrowLeft size={24} />
          </button> : null}
          <Col className="p-2 flex-fill">
            <Search setSearch={this.props.setSearch} />
          </Col>
          <Col className="d-flex justify-content-end" xs>
            {this.props.render === 'feed' ?
              <button
                className='search-button' alt-text="messages" onClick={() => { this.props.setRenderState('chat') }}>
                <BsFillChatLeftTextFill size={24} />
              </button>
              : null}
          </Col>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              {/* <Offcanvas.Title id="offcanvasNavbarLabel">mikeslist</Offcanvas.Title> */}
              <Offcanvas.Title id="offcanvasNavbarLabel">sample app</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <h6 className='mb-3' onClick={() => this.props.setRenderState('account')}>account</h6>
                <ButtonGroup className="mb-3" aria-label="pickupOption">
                  <Button variant="primary" onClick={(e) => this.choosePickup(e)}>pickup</Button>
                  <Button variant="secondary" onClick={(e) => this.choosePickup(e)}>delivery</Button>
                  <Button variant="primary" onClick={(e) => this.choosePickup(e)}>negotiable</Button>
                </ButtonGroup>
                <ButtonGroup className="mb-3" aria-label="sort">
                  <Button variant="primary" onClick={(e) => this.chooseSort(e)}>date</Button>
                  <Button variant="secondary" onClick={(e) => this.chooseSort(e)}>distance</Button>
                </ButtonGroup>
                <h6>category</h6>
                <ListGroup as="ul">
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)}>all</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)}>appliances</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)}>clothes</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)}>electronics</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)}>food</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)}>furniture</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)}>pets</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)}>toys</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)}>vehicles</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)}>other</ListGroup.Item>
                </ListGroup>
              </Nav>
              <Button onClick={() => { this.logout() }}>
                logout
              </Button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar >
    )
  }

}

export default Header;

/**

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
 */