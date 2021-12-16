import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import axios from 'axios'


class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      render: 'form',
      error: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.disableSubmit = this.disableSubmit.bind(this)
    this.errorMessage = this.errorMessage.bind(this)
  }

  // todo handle change
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  // Todo handle submit
  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/users/forgot', {
      email: this.state.email
    })
      .then((result) => {
        this.setState({ render: 'confirm' })
        this.props.setToken(result.data.token)
      }).catch((err) => {
        this.setState({ error: true })
        setTimeout(() => { this.setState({ error: false }) }, 1500)
      });

  }

  disableSubmit() {
    if (this.state.email === '') {
      return true
    } else {
      return false
    }
  }

  errorMessage(error) {
    return <span style={{ fontSize: '12px', color: 'red' }}>email not found. please try again</span>
  }

  render() {
    // todo email form
    if (this.state.render === 'form') {
      return (
        <Container>
          <Col className='login-container'>
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
                {this.state.error ? this.errorMessage() : null}
              </Form.Group>
              <div className='text-center'>
                <button className='button' type="submit" disabled={this.disableSubmit()}>
                  Reset password
                </button>
              </div>
              <div>
                <button className='create-acc-back-btn' type="button" onClick={() => this.props.backToLogin('login')}>back to login</button>
              </div>
            </Form >
          </Col>
        </Container>
      )
    } else {
      return (
        <div onClick={() => this.props.setPasswordPage('reset')}>
          <span>We've sent you a reset link, please check your email and click here</span>
        </div>
      )
    }
  }
}

export default ForgotPassword;