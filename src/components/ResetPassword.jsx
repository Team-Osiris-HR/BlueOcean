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
      type: 'password',
      render: 'form'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeType = this.changeType.bind(this)
  }

  // todo handle change
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  // Todo handle submit
  handleSubmit(e) {
    e.preventDefault()
    // todo post request to change password

    // console.log(this.state) // * i know where getting the new password on submit
    this.setState({ render: 'confirm' }) // * this is gonna happen upon successful response from server
  }

  changeType() {
    if (this.state.type === 'password') {
      this.setState({ type: 'text' })
    } else {
      this.setState({ type: 'password' })
    }
  }


  render() {
    // todo email form
    if (this.state.render === 'form') {

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
            <Button size='sm' variant="outline-secondary" id="button-addon2" onClick={() => this.changeType()}>
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
    } else {
      return (
        <div onClick={() => this.props.backToLogin('login')}>
          <span>Congrats! click here to login</span>
        </div>
      )
    }
  }
}

export default ResetPassword;
