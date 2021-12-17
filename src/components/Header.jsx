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
import { BsChatLeftText } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import { ImMenu } from "react-icons/im"

import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

import axios from 'axios'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleSearch: 'hide-search',
      chosenCategory: 'all',
      pickupBtn: 'top_buttons',
      negoBtn: 'selected',
      deliveryBtn: 'top_buttons',
      dateBtn: 'selected',
      distanceBtn: 'top_buttons'
    }
    this.chooseCategory = this.chooseCategory.bind(this)
    this.choosePickup = this.choosePickup.bind(this)
    this.chooseSort = this.chooseSort.bind(this)
    this.logout = this.logout.bind(this)
    this.toggleFeed = this.toggleFeed.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
  }

  chooseCategory(e) {
    this.props.setCategory(e.target.outerText)
    this.setState({ chosenCategory: e.target.outerText })
  }

  choosePickup(input) {
    this.props.setPickup(input)
  }

  chooseSort(input) {
    this.props.setSort(input)
  }

  logout() {
    axios.get('/api/users/logout')
      .then((result) => {
        this.props.setRenderState('logout')
        Cookies.remove('jwt')
        setTimeout(() => {
          this.props.setRenderState("login")
        }, 1000)
      }).catch((err) => {
        console.log(err)
      });
  }

  toggleFeed(e) {
    var selection = e.target.outerText
    if (selection === 'pickup') {
      this.choosePickup(selection)
      this.setState({
        pickupBtn: 'selected',
        negoBtn: 'top_buttons',
        deliveryBtn: 'top_buttons'
      })
    }
    if (selection === 'delivery') {
      this.choosePickup(selection)
      this.setState({
        pickupBtn: 'top_buttons',
        negoBtn: 'top_buttons',
        deliveryBtn: 'selected'
      })
    }
    if (selection === 'negotiable') {
      this.choosePickup(selection)
      this.setState({
        pickupBtn: 'top_buttons',
        negoBtn: 'selected',
        deliveryBtn: 'top_buttons'
      })
    }
  }

  toggleSort(e) {
    var selection = e.target.outerText
    if (selection === 'date') {
      this.chooseSort(selection)
      this.setState({
        dateBtn: 'selected',
        distanceBtn: 'top_buttons',
      })
    }
    if (selection === 'distance') {
      this.chooseSort(selection)
      this.setState({
        dateBtn: 'top_buttons',
        distanceBtn: 'selected',
      })
    }
  }

  render() {
    return (
      <Navbar className='header-container' bg="light" expand={false}>
        <Container fluid>
          <Col className="p-2 flex-shrink            -1">
            <Navbar.Toggle bg="white" aria-controls="offcanvasNavbar">
              <ImMenu className="headerIcon" />
            </Navbar.Toggle>
          </Col>
          {this.props.render === 'itempage' || this.props.render === 'donoritempage' || this.props.render === 'chat' || this.props.render === 'account' ? <button className='search-button' type="button" variant='warning' onClick={() => { this.props.setRenderState('feed') }}>
            <BsArrowLeft className="headerIcon" size={24} />
          </button> : null}
          <Col className="p-2 flex-fill">
            <Search setSearch={this.props.setSearch} />
          </Col>
          <Col className="d-flex justify-content-end" xs>
            {this.props.render === 'feed' || this.props.render === 'itempage' || this.props.render === 'donoritempage' ?
              <button
                className='search-button' alt-text="messages" onClick={() => { this.props.setRenderState('chat') }}>
                <BsChatLeftText className="headerIcon" size={24} />
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
              <Offcanvas.Title id="offcanvasNavbarLabel">mikeslist</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Button variant="primary" className='mb-3' onClick={() => this.props.setRenderState('account')}>my account</Button>
                <h6>pickup</h6>
                <ButtonGroup className="">
                  <button className={this.state.deliveryBtn} onClick={this.toggleFeed}>delivery</button>
                  <button className={this.state.pickupBtn} onClick={this.toggleFeed}>pickup</button>
                  <button className={this.state.negoBtn} onClick={this.toggleFeed}>negotiable</button>
                </ButtonGroup>
                <h6>sort</h6>
                <ButtonGroup className="">
                  <button className={this.state.dateBtn} onClick={this.toggleSort}>date</button>
                  <button className={this.state.distanceBtn} onClick={this.toggleSort}>distance</button>
                </ButtonGroup>
                <h6>category: {this.state.chosenCategory}</h6>
                <ListGroup as="ul" className='mb-5'>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)} action >all</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)} action >appliances</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)} action >clothes</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)} action >electronics</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)} action >food</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)} action >furniture</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)} action >pets</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)} action >toys</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)} action >vehicles</ListGroup.Item>
                  <ListGroup.Item as="li" onClick={(e) => this.chooseCategory(e)} action >other</ListGroup.Item>
                </ListGroup>
                <div>
                  <button className='button' onClick={() => { this.logout() }}>
                    logout
                  </button>
                </div>
              </Nav>
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