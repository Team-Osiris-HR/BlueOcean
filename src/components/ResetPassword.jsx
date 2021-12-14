import React from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import axios from 'axios'


class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'password'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // todo handle change
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  // Todo handle submit
  handleSubmit(e) {
    e.preventDefault()
    // todo post request to change password
    // this.setState({ render: 'confirm' }) // * this is gonna happen upon successful response from server
  }

  render() {
    // todo email form
    return (
      <Form className='text-center' onSubmit={this.handleSubmit}>
        <h1>new password here</h1>
        <InputGroup className="mb-3">
          <Form.Group className="mb-3 mw-50" controlId="formBasicPassword">
            <FloatingLabel
              label='password'
              className='mb-3'
            >
              <Form.Control
                aria-describedby="basic-addon2"
                type={this.state.type}
                name="password"
                placeholder="password"
                onChange={(e) => this.handleChange(e)} />
            </FloatingLabel>
          </Form.Group>
          <Button size='sm' variant="outline-secondary" id="button-addon2">
            see password
          </Button>
        </InputGroup>

        <InputGroup>
          <Form.Group className="mb-3 mw-50" controlId="formBasicPasswordConfirm">
            <FloatingLabel
              label='confirm password'
              className='mb-3'
            >
              <Form.Control
                aria-describedby="basic-addon2"
                type={this.state.type}
                name="passwordConfirm"
                placeholder="confirm password"
                onChange={(e) => this.handleChange(e)} />
            </FloatingLabel>
          </Form.Group>
          <Button size='sm' variant="outline-secondary" id="button-addon2">
            see password
          </Button>
        </InputGroup>
        <div className='text-center'>
          <Button className='button' type="submit">
            Reset password
          </Button>
        </div>
      </Form >
    )
  }
}

export default ResetPassword;

/*
 <Form.Group className="mb-3 mw-50" controlId="formBasicPassword">
          <FloatingLabel
            label='password'
            className='mb-3'
          >
            <Form.Control type="password" name="password" placeholder="password" onChange={(e) => this.handleChange(e)} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3 mw-50" controlId="formBasicPasswordConfirm">
          <FloatingLabel
            label='confirm password'
            className='mb-3'
          >
            <Form.Control type="password" name="passwordConfirm" placeholder="confirm password" onChange={(e) => this.handleChange(e)} />
          </FloatingLabel>
        </Form.Group>
        <div className='text-center'>
          <Button className='button' type="submit">
            Reset password
          </Button>
        </div>

*/