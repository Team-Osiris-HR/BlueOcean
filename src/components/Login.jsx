import React from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import Cookies from 'js-cookie'
import ForgotPassword from './ForgotPassword.jsx'
import ResetPassword from './ResetPassword.jsx'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      render: 'login'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderForgotPassword = this.renderForgotPassword.bind(this)
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/users/login', {
      name: this.state.name,
      password: this.state.password
    })
      .then((result) => {
        this.props.setCurrentUser(result.data.data.user)
        this.props.setRenderState("feed",)
      }).catch((err) => {
        console.log("🚀 ~ file: Login.jsx ~ line 38 ~ Login ~ .then ~ err", err)
      });
  }

  renderForgotPassword() {
    if (this.state.render === 'login') {
      this.setState({ render: 'forgot' })
    } else {
      this.setState({ render: 'login' })
    }
  }

  render() {
    if (this.state.render === 'login') {
      return (
        <Form className='text-center' onSubmit={this.handleSubmit}>
          <div className='jumbotron'>
            <h1 style={{ fontSize: '128px' }}>Hello</h1>
          </div>
          <Form.Group className="mb-3 mw-50" controlId="formBasicEmail">
            <FloatingLabel
              label='name'
              className='mb-3'
            >
              <Form.Control type="text" name="name" placeholder="name" onChange={(e) => this.handleChange(e)} />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel
              label='password'
              className='mb-3'
            >
              <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => this.handleChange(e)} />
            </FloatingLabel>
          </Form.Group>
          <div className='text-center'>
            <Button className='button' size="lg" type="submit">
              Submit
            </Button>
          </div>
          <div>
            <button className='forgot-password' type="button" onClick={() => this.renderForgotPassword()}>forgot password?</button>
          </div>
          <div>
            <button className="create-acc-btn" type="button" onClick={() => this.props.setRenderState('signup')}>don't have an account? click here.</button>
          </div>
        </Form >
      )
    } else {
      // return (
      //   <Container>
      //     <ForgotPassword backToLogin={this.renderForgotPassword} />
      //   </Container>
      // )
      return (
        <Container>
          <ResetPassword backToLogin={this.renderForgotPassword} />
        </Container>
      )
    }
  }
}

export default Login;