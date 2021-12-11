import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state.name)
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
              <Form.Control type="email" name='email address' placeholder="Enter email" onChange={(e) => this.handleChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="formGridPassword" md>
              <Form.Control type="password" placeholder="Password" name='password' onChange={(e) => this.handleChange(e)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridConfirmPassword" md>
              <Form.Control type="password" placeholder="Confirm Password" name='passwordConfirm' onChange={(e) => this.handleChange(e)} />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress" md>
            <Form.Control placeholder="Address" name='address' onChange={(e) => this.handleChange(e)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridPhone" md>
            <Form.Control placeholder="555-555-5555" name='phone' onChange={(e) => this.handleChange(e)} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form >
      </Container>
    )
  }
}

export default Signup;
