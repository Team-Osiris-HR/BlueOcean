import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';


var Donate = ({toggleDonate, currentUser}) => (

  <Modal show={toggleDonate} onHide={toggleDonate}>
    <Modal.Body>
      <Form>
        <Form.Group>
          <Form.Label column sm="2">
            Username
          </Form.Label>
          <Form.Control type="text" defaultValue={currentUser.name} readOnly />
        </Form.Group>
        <Button variant="secondary" onClick={toggleDonate}>
          Close
        </Button>{" "}
        <Button variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
    </Modal.Body>
  </Modal>

)

export default Donate;