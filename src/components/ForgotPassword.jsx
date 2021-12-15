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
      render: 'form'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.disableSubmit = this.disableSubmit.bind(this)
  }

  // todo handle change
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  // Todo handle submit
  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/user/forgot', {
      email: this.state.email
    })
      .then((result) => {
        this.setState({ render: 'confirm' }) // * this is gonna happen upon successful response from server
      }).catch((err) => {

      });

  }

  disableSubmit() {
    if (this.state.email === '') {
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
                <Button variant='primary' className='button' type="submit" disabled={this.disableSubmit()}>
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
          <span>We've sent you a reset link, please check your email</span>
        </div>
      )
    }
  }
}

export default ForgotPassword;