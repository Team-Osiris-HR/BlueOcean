import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import axios from 'axios'


class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      render: 'form'
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
    this.setState({ render: 'confirm' }) // * this is gonna happen upon successful response from server
  }

  render() {
    // todo email form
    if (this.state.render === 'form') {
      return (
        <Form className='text-center' onSubmit={this.handleSubmit}>
          <h1>enter your email here</h1>
          <Form.Group className="mb-3 mw-50" controlId="formBasicEmail">
            <FloatingLabel
              label='email'
              className='mb-3'
            >
              <Form.Control
                type="email"
                name="email"
                placeholder="email"
                onChange={(e) => this.handleChange(e)} />
            </FloatingLabel>
          </Form.Group>
          <div className='text-center'>
            <Button className='button' type="submit">
              Reset password
            </Button>
          </div>
        </Form >
      )
    } else {
      return (
        <div onClick={() => this.props.backToLogin('login')}>
          <span>We've sent you a reset link, please check your email</span>
        </div>
      )
    }
  }
}

export default ForgotPassword;