import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
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
      name: this.state.email,
      password: this.state.password
    })
      .then((result) => {
        console.log('logged in')
      }).catch((err) => {
        console.log(err)
      });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Login page</h1>
        <Form.Group className="mb-3 mw-50" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" name="email" placeholder="Enter email" onChange={(e) => this.handleChange(e)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => this.handleChange(e)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default Login;