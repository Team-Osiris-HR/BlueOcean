import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
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
      loggedIn: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/users/signup', {
      name: this.state.name,
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
  render() {
    return (
      <Container>

        <Form onSubmit={this.handleSubmit}>
          <h1>Create an account</h1>
          <Form.Group controlId="formGridName" md
            className="mb-3">
            <Form.Control name='name' placeholder="Name" onChange={(e) => this.handleChange(e)} />
          </Form.Group>

          <Row className="mb-3" md="true">
            <Form.Group className="mb-3" as={Col} controlId="formGridEmail">
              <Form.Control type="email" name='email' placeholder=" Email" onChange={(e) => this.handleChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="formGridPassword" md>
              <Form.Control type="password" placeholder="Password (min 6 char)" name='password' onChange={(e) => this.handleChange(e)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridConfirmPassword" md>
              <Form.Control type="password" placeholder="Confirm Password" name='passwordConfirm' onChange={(e) => this.handleChange(e)} />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress" md>
            <Form.Control placeholder="Address" name='address' onChange={(e) => this.handleChange(e)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridPhone" md>
            <Form.Control placeholder="1230001234" name='phone' onChange={(e) => this.handleChange(e)} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="warning" type="button" onClick={() => this.props.setRenderState('login')}>Go back</Button>
        </Form >
      </Container>
    )
  }
}

export default Signup;
