import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Cookies from 'js-cookie'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
        this.props.setRenderState("feed",)
      }).catch((err) => {
        alert('wrong user and/or password bud')
      });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Login page</h1>
        <Form.Group className="mb-3 mw-50" controlId="formBasicEmail">
          <Form.Label>name</Form.Label>
          <Form.Control type="text" name="name" placeholder="name" onChange={(e) => this.handleChange(e)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => this.handleChange(e)} />
        </Form.Group>
        <Button size="lg" variant="primary" type="submit">
          Submit
        </Button>
        <Button size="lg" variant="info" type="button" onClick={() => this.props.setRenderState('signup')}>Create account</Button>
      </Form>
    )
  }
}

export default Login;