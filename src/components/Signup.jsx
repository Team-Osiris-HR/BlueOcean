import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Accordion from 'react-bootstrap/Accordion'
import axios from 'axios'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      address: '',
      loggedIn: false,
      role: 'user'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeRole = this.changeRole.bind(this)
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
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
      loggedIn: false
    })
      .then((result) => {
        alert('created')
        this.props.setRenderState('login')
      }).catch((err) => {
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
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <h1>Create an account</h1>
          <Form.Group controlId="formGridName"
            className="mb-3">
            <FloatingLabel
              label='name'
              className='mb-3'
            >
              <Form.Control name='name' placeholder="Name" onChange={(e) => this.handleChange(e)} />
            </FloatingLabel>
          </Form.Group>

          <Row className="mb-3" >
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
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress" >
            <FloatingLabel
              label='address'
              className='mb-3'
            >
              <Form.Control placeholder="Address" name='address' onChange={(e) => this.handleChange(e)} />
            </FloatingLabel>
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

              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Button size="lg" variant="primary" type="submit">
            Submit
          </Button>
          <Button size="lg" variant="warning" type="button" onClick={() => this.props.setRenderState('login')}>Go back</Button>
        </Form >
      </Container>
    )
  }
}

export default Signup;
