import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Accordion from 'react-bootstrap/Accordion'
import SearchBar from './Map/SearchBar.jsx'
import axios from 'axios'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.searchBox = null;
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      address: '',
      lat: '',
      lng: '',
      loggedIn: false,
      role: 'user',
      organizationAddress: '',
      organizationPhone: '',
      organizationURL: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeRole = this.changeRole.bind(this)
    this.onPlacesChanged = this.onPlacesChanged.bind(this)
    this.onSearchBoxMounted = this.onSearchBoxMounted.bind(this)
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSearchBoxMounted (ref) {
    this.searchBox = ref;
  }
  onPlacesChanged() {
    const places = this.searchBox.getPlaces();
    console.log(places);
    this.setState({
      address: places[0].formatted_address,
      lat: places[0].geometry.location.lat(),
      lng: places[0].geometry.location.lng()})
  }



  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/users/signup', {
      name: this.state.name,
      role: this.state.role,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      phone: this.state.phone,
      address: this.state.address,
      location: {latitude: this.state.lat,
      longitude: this.state.lng},
      loggedIn: false,
      orgnization: {
        phone: this.state.organizationPhone,
        address: this.state.organizationAddress,
        url: this.state.organizationURL
      }
    })
      .then((result) => {
        alert('created')
        this.props.setRenderState('login')
      }).catch((err) => {
        console.log(err)
        alert('check all fields')
      });
  }

  changeRole() {
    if (this.state.role === 'user') {
      this.setState({ role: 'charity' })
    } else {
      this.setState({ role: 'user' })
    }
  }

  render() {
    return (
      <Container className="text-center">
        <Form onSubmit={this.handleSubmit}>
          <h1>Create</h1>
          <Form.Group controlId="formGridName"
            className="mb-3">
            <FloatingLabel
              label='name'
              className='mb-3'
            >
              <Form.Control name='name' placeholder="Name" onChange={(e) => this.handleChange(e)} />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" as={Col} controlId="formGridEmail">
            <FloatingLabel
              label='email'
              className='mb-3'
            >
              <Form.Control type="email" name='email' placeholder=" Email" onChange={(e) => this.handleChange(e)} />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" as={Col} controlId="formGridPassword" >
            <FloatingLabel
              label='password'
              className='mb-3'
            >
              <Form.Control type="password" placeholder="Password (min 6 char)" name='password' onChange={(e) => this.handleChange(e)} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridConfirmPassword" >
            <FloatingLabel
              label='confirm password'
              className='mb-3'
            >
              <Form.Control type="password" placeholder="Confirm Password" name='passwordConfirm' onChange={(e) => this.handleChange(e)} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress" >
            <SearchBar onChange={(e) => this.handleChange(e)} onPlacesChanged={this.onPlacesChanged}
            onSearchBoxMounted={this.onSearchBoxMounted}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridPhone" >
            <FloatingLabel
              label='phone'
              className='mb-3'
            >
              <Form.Control placeholder="1230001234" name='phone' onChange={(e) => this.handleChange(e)} />
            </FloatingLabel>
          </Form.Group>

          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header onClick={() => this.changeRole()}>non-profit organization?</Accordion.Header>
              <Accordion.Body>
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

              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className='text-center'>
            <Button className='button' size="lg" variant="primary" type="submit">
              Submit
            </Button>
          </div>
          <div>
            <button className='create-acc-back-btn' type="button" onClick={() => this.props.setRenderState('login')}>already have an account? log in here.</button>
          </div>
        </Form >
      </Container>
    )
  }
}

export default Signup;
