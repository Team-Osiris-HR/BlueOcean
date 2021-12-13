import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Alert from 'react-bootstrap/Alert'
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
        this.props.setCurrentUser(result.data.data.user)
        this.props.setRenderState("feed",)
      }).catch((err) => {
        alert('wrong user and/or password bud')
      });
  }

  render() {
    return (
      <Form className='text-center' onSubmit={this.handleSubmit}>
        <h1>Hello</h1>
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
          <Button className='mb-3' size="lg" variant="primary" type="submit">
            Submit
          </Button>
        </div>
        <div>
          <button className='forgot-password' type="button">forgot password?</button>
        </div>
        <div>
          <button className="create-acc-btn" type="button" onClick={() => this.props.setRenderState('signup')}>don't have an account? click here.</button>
        </div>
      </Form>
    )
  }
}

export default Login;