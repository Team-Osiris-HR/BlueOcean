import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, Form, Button, FloatingLabel, Row, Col, Stack } from 'react-bootstrap';


var Donate = ({toggleDonate, currentUser}) => (

  <Modal show={toggleDonate} onHide={toggleDonate}>
    <Modal.Body>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextUser">

          <Form.Label as={Col} column sm="3">
            Username:
          </Form.Label>
          <Col sm="9">
            <Form.Control readOnly defaultValue={currentUser.name} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label as={Col} column sm="3">
            Email:
          </Form.Label>
          <Col sm="9">
            <Form.Control readOnly defaultValue={currentUser.email} />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingPickupDelivery" label="Pickup/Delivery">
            <Form.Select aria-label="Floating label select example">
              <option value="negotiable">Negotiable</option>
              <option value="pickup">Pickup Only</option>
              <option value="delivery">Delivery Only</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingWhoCanSee" label="Item available for ">
            <Form.Select aria-label="Floating label select example">
              <option value="pickup">Charities Only</option>
              <option value="delivery">All Users</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingWhoCanSee" label="Category My Item Best Fits In">
            <Form.Select aria-label="Floating label select example">
              <option value="appliances">Appliances</option>
              <option value="clothes">Clothes</option>
              <option value="electronics">Electronics</option>
              <option value="food">Food</option>
              <option value="furniture">Furniture</option>
              <option value="pets">Pets</option>
              <option value="toys">Toys</option>
              <option value="vehicles">Vehicles</option>
              <option value="vehicles">Other</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <FloatingLabel
            controlId="floatingInput"
            label="I am donating a..."
            className="mb-3"
          >
            <Form.Control type="text" placeholder='Item Name'/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <FloatingLabel
            controlId="floatingTextArea"
            label="Description of Donation"
            className="mb-3"
          >
            <Form.Control as='textarea' placeholder='Description' style={{height: '100px'}}/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="photos" className="mb-3">
          <Form.Label>Upload Photos</Form.Label>
          <Form.Control type="file" multiple />
        </Form.Group>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button variant="secondary" onClick={toggleDonate}>
              Close
            </Button>{" "}
          </Col>
          <Col>
            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal.Body>
  </Modal>

)

export default Donate;