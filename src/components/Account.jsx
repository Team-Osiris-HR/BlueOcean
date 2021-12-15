import React from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Col from 'react-bootstrap/Col'
import axios from 'axios'

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: this.props.currentUser,
      id: this.props.currentUser._id,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.patch(`/api/users/${this.props.currentUser._id}/updateinfo`, {
      name: this.state.name,
      role: this.props.currentUser.role,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      loggedIn: this.props.currentUser.loggedIn
    })
      .then((result) => {
        this.props.setCurrentUser(result.data.data)
        alert('your info has been updated!')
      }).catch((err) => {
        console.log("🚀 ~ file: Account.jsx ~ line 41 ~ Account ~ .then ~ err", err)
      });
  }

  render() {
    return (
      <>
        <h1>this is account page</h1>
        <Container>
          <Col className='account-container' >
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formGridName"
                className="mb-3">
                <FloatingLabel
                  label='name'
                  className='mb-3'
                >
                  <Form.Control type='input' defaultValue={this.state.currentUser.name} name='name' placeholder="Name" onChange={(e) => this.handleChange(e)} />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridEmail">
                <FloatingLabel
                  label='email'
                  className='mb-3'
                >
                  <Form.Control defaultValue={this.state.currentUser.email} type="email" name='email' placeholder=" Email" onChange={(e) => this.handleChange(e)} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridAddress" >
                <FloatingLabel
                  label='address'
                  className='mb-3'
                >
                  <Form.Control defaultValue={this.state.currentUser.address} placeholder="Address" name='address' onChange={(e) => this.handleChange(e)} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridPhone" >
                <FloatingLabel
                  label='phone'
                  className='mb-3'
                >
                  <Form.Control defaultValue={this.state.currentUser.phone} placeholder="1230001234" name='phone' onChange={(e) => this.handleChange(e)} />
                </FloatingLabel>
              </Form.Group>
              {this.state.currentUser.role === 'charity' ?
                <>
                  <Form.Group className="mb-3" controlId="formGridOrgAddress" >
                    <FloatingLabel
                      label='organization address'
                      className='mb-3'
                    >
                      <Form.Control placeholder="Organization Address" name='organizationAddress' onChange={(e) => this.handleChange(e)} />
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridOrgPhone" >
                    <FloatingLabel
                      label='organization phone'
                      className='mb-3'
                    >
                      <Form.Control placeholder="Organization Phone" name='organizationPhone' onChange={(e) => this.handleChange(e)} />
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridOrgURL" >
                    <FloatingLabel
                      label='organization url'
                      className='mb-3'
                    >
                      <Form.Control placeholder="Organization URL" name='organizationURL' onChange={(e) => this.handleChange(e)} />
                    </FloatingLabel>
                  </Form.Group>
                </>
                : null}

              <Button className='text-center' size="lg" variant="primary" type="submit">
                Submit
              </Button>
            </Form >
          </Col>
        </Container>
      </>
    )
  }
}

export default Account