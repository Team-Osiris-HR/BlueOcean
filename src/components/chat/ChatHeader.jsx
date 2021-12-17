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
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import Cookies from 'js-cookie'
import { BsChatLeftText } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";

import axios from 'axios'

class ChatHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleSearch: 'hide-search',
      chosenCategory: 'all'
    }
    this.chooseCategory = this.chooseCategory.bind(this)
    this.choosePickup = this.choosePickup.bind(this)
    this.chooseSort = this.chooseSort.bind(this)
    this.logout = this.logout.bind(this)
    this.backButton = this.backButton.bind(this)
  }

  chooseCategory(e) {
    this.props.setCategory(e.target.outerText)
    this.setState({ chosenCategory: e.target.outerText })
  }

  choosePickup(e) {
    this.props.setPickup(e.target.outerText)
    this.setState({ chosenPickup: e.target.outerText })
  }

  chooseSort(e) {
    this.props.setSort(e.target.outerText)
    this.setState({ chosenSort: e.target.outerText })
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

  backButton() {
    if (!this.props.chatSelectedStatus) {
      this.props.setRenderState('feed')
    } else {
      this.props.leaveChat()
    }
  }

  render() {
    return (
      <Navbar className='header-container' bg="light" expand={false}>
        <Container fluid>
          <button className='search-button' type="button" variant='warning' onClick={() => { this.backButton() }}>
            <BsArrowLeft size={24} />
          </button>
          <Col className="p-2 flex-fill">
            {!this.props.chatSelectedStatus ?
            <span>Feed</span>
            :
            <>
              <span>Inbox</span>
              <span style={{paddingLeft: '40px', color: 'white'}}>{this.props.nameSelected}</span>
            </>
            }
          </Col>
        </Container>
      </Navbar >
    )
  }

}

export default ChatHeader;

