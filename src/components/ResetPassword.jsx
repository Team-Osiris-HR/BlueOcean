import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import axios from 'axios'


class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'password',
      render: 'form',
      password: '',
      passwordConfirm: '',
      email: '' // todo
      token: '' // todo
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeType = this.changeType.bind(this)
    this.disableSubmit = this.disableSubmit.bind(this)
  }

  // todo handle change
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  // Todo handle submit
  handleSubmit(e) {
    e.preventDefault()
    // todo post request to change password
    this.setState({
      type: 'password',
      render: 'confirm'
    }) // * this is gonna happen upon successful response from server
  }

  changeType() {
    if (this.state.type === 'password') {
      this.setState({ type: 'text' })
    } else {
      this.setState({ type: 'password' })
    }
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

  render() {
    // todo email form
    if (this.state.render === 'form') {
      return (
        <Container>
          <Col className='login-container'>

            <Form className='text-center' onSubmit={this.handleSubmit}>
              <h1>new password here</h1>
              <Form.Group className="mb-3 mw-50" controlId="formBasicPassword">
                <FloatingLabel
                  label='password min 6 char'
                  className='mb-3'
                >
                  <Form.Control
                    type={this.state.type}
                    name="password"
                    placeholder="password"
                    onChange={(e) => this.handleChange(e)} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3 mw-50" controlId="formBasicPasswordConfirm">
                <FloatingLabel
                  label='confirm password'
                  className=''
                >
                  <Form.Control
                    type={this.state.type}
                    name="passwordConfirm"
                    placeholder="confirm password"
                    onChange={(e) => this.handleChange(e)} />
                </FloatingLabel>
                <button type='button' className='see-password' onClick={() => this.changeType()}>
                  <span>see password</span>
                </button>
              </Form.Group>
              <div className='text-center'>
                <Button className='button' size="lg" type="submit" disabled={this.disableSubmit()}>
                  Reset password
                </Button>
              </div>
            </Form >
          </Col>
        </Container>
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
