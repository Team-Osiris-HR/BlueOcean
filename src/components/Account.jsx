import React from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import Cookies from 'js-cookie'
import SearchBar from './Map/SearchBar.jsx';

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.searchBox = null;
    this.state = {
      currentUser: this.props.currentUser,
      id: this.props.currentUser._id,
      password: '',
      passwordConfirm: '',
      passwordCurrent: '',
      type: 'password'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeType = this.changeType.bind(this)
    this.disableSubmit = this.disableSubmit.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.onPlacesChanged = this.onPlacesChanged.bind(this)
    this.onSearchBoxMounted = this.onSearchBoxMounted.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.patch(`/api/users/${this.props.currentUser._id}/updateinfo`, {
      name: this.state.name,
      role: this.props.currentUser.role,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      loggedIn: this.props.currentUser.loggedIn
    })
      .then((result) => {
        this.props.setCurrentUser(result.data.data)
        alert('your info has been updated!')
        this.props.setRenderState('feed')
      }).catch((err) => {
        console.log("🚀 ~ file: Account.jsx ~ line 41 ~ Account ~ .then ~ err", err)
      });
  }

  handleChangePassword(e) {
    e.preventDefault()
    axios.patch(`/api/users/updatemypassword`, {
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      passwordCurrent: this.state.passwordCurrent,
    })
      .then((result) => {
        Cookies.remove('jwt')
        alert('success. please log in again')
        this.props.setRenderState('login')
      }).catch((err) => {
        console.log("🚀 ~ file: Account.jsx ~ line 63 ~ Account ~ .then ~ err", err)
      });
  }

  disableSubmit() {
    if (this.state.password.length < 6) {
      return true
    } else if (this.state.passwordConfirm.length < 6) {
      return true
    } else if (this.state.password !== this.state.passwordConfirm) {
      return true
    } else {
      return false
    }
  }

  changeType() {
    if (this.state.type === 'password') {
      this.setState({ type: 'text' })
    } else {
      this.setState({ type: 'password' })
    }
  }

  onSearchBoxMounted (ref) {
    this.searchBox = ref;
  }

  onPlacesChanged() {
    const places = this.searchBox.getPlaces();
    this.setState({
      address: places[0].formatted_address,
      lat: places[0].geometry.location.lat(),
      lng: places[0].geometry.location.lng()})
  }

  render() {
    return (
      <Tabs defaultActiveKey="account" className="mb-3 justify-content-center">
        <Tab eventKey="account" title="account">
          <Container as='div' className='w-25'>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formGridName"
                  className="mb-3">
                  <FloatingLabel
                    label='name'
                    className='mb-3'
                  >
                    <Form.Control type='input' defaultValue={this.state.currentUser.name} name='name' placeholder="Name" onChange={(e) => this.handleChange(e)} />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridEmail">
                  <FloatingLabel
                    label='email'
                    className='mb-3'
                  >
                    <Form.Control defaultValue={this.state.currentUser.email} type="email" name='email' placeholder=" Email" onChange={(e) => this.handleChange(e)} />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress" >
                    <SearchBar onChange={(e) => this.handleChange(e)}
                    onPlacesChanged={this.onPlacesChanged}
                    onSearchBoxMounted={this.onSearchBoxMounted}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridPhone" >
                  <FloatingLabel
                    label='phone'
                    className='mb-3'
                  >
                    <Form.Control defaultValue={this.state.currentUser.phone} placeholder="1230001234" name='phone' onChange={(e) => this.handleChange(e)} />
                  </FloatingLabel>
                </Form.Group>
                {this.state.currentUser.role === 'charity' ?
                  <>
                    <Form.Group className="mb-3" controlId="formGridOrgAddress" >
                      <FloatingLabel
                        label='organization address'
                        className='mb-3'
                      >
                        <Form.Control placeholder="Organization Address" name='organizationAddress' onChange={(e) => this.handleChange(e)} />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridOrgPhone" >
                      <FloatingLabel
                        label='organization phone'
                        className='mb-3'
                      >
                        <Form.Control placeholder="Organization Phone" name='organizationPhone' onChange={(e) => this.handleChange(e)} />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridOrgURL" >
                      <FloatingLabel
                        label='organization url'
                        className='mb-3'
                      >
                        <Form.Control placeholder="Organization URL" name='organizationURL' onChange={(e) => this.handleChange(e)} />
                      </FloatingLabel>
                    </Form.Group>
                  </>
                  : null}

                <button className='button' size="lg" type="submit">
                  Submit
                </button>
              </Form >
            </Col>
          </Container>
        </Tab>
        <Tab eventKey="password" title="password">
          <Container as='div' className='w-25'>
            <Col >
              <Form onSubmit={this.handleChangePassword}>

                <Form.Group controlId="formGridCurrentPassword"
                  className="mb-3">
                  <FloatingLabel
                    label='current password'
                    className='mb-3'>
                    <Form.Control type={this.state.type} name='passwordCurrent' placeholder="current password" onChange={(e) => this.handleChange(e)} />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="formGridPassword"
                  className="mb-3">
                  <FloatingLabel
                    label='new password'
                    className='mb-3'>
                    <Form.Control type={this.state.type} name='password' placeholder="new password" onChange={(e) => this.handleChange(e)} />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridPasswordConfirm">
                  <FloatingLabel
                    label='confirm password'
                    className='mb-3'>
                    <Form.Control type={this.state.type} name='passwordConfirm' placeholder="confirm password" onChange={(e) => this.handleChange(e)} />
                  </FloatingLabel>
                  <button type='button' className='forgot-password' onClick={() => this.changeType()}>
                    <span>see password</span>
                  </button>
                </Form.Group>
                <button className='button' size="lg" type="submit" disabled={this.disableSubmit()}>
                  Update
                </button>
              </Form >
            </Col>
          </Container>
        </Tab>
      </Tabs>
    )
  }
}

export default Account

