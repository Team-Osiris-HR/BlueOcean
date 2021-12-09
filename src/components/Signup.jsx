import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class Signup extends React.Component {

  render() {
    return (
      <Form>
        <h1>Create an account</h1>

        <Form.Group controlId="formGridName" md>
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="First Name, Last Name" />
        </Form.Group>

        <Row className="mb-3" md>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword" md>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridConfirmPassword" md>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>
        </Row>

        <Form.Group controlId="formGridAddress" md>
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group controlId="formGridPhone" md>
          <Form.Label>Phone</Form.Label>
          <Form.Control placeholder="555-555-5555" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form >
    )
  }
}

export default Signup;

/**

  <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>
         <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
                  </Row>
 */