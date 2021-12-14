import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, Form, Button, FloatingLabel, Row, Col, Stack } from 'react-bootstrap';


var Donate = ({toggleDonate, currentUser, handleOnChange, handleFileChange}) => (

  <Modal show={toggleDonate} onHide={toggleDonate}>
    <Modal.Body>
      <Form>
        <Form.Group>
          <FloatingLabel
            controlId="floatingInput"
            label="I am donating a..."
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder='Item Name'
              name='itemName'
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <FloatingLabel
            controlId="floatingTextArea"
            label="Description of Donation"
            className="mb-3"
          >
            <Form.Control
              as='textarea'
              placeholder='Description'
              name='description'
              style={{height: '100px'}}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingWhoCanSee" label="Category My Item Best Fits In">
            <Form.Select
              aria-label="Floating label select example"
              name='category'
              onChange={handleOnChange}
            >
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
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingCondition" label="Item Condition">
            <Form.Select
              aria-label="Floating label select example"
              name='condition'
              onChange={handleOnChange}
            >
              <option value="new">New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="used">Used</option>
              <option value="poor">Poor</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingPickupDelivery" label="Pickup/Delivery">
            <Form.Select
              aria-label="Floating label select example"
              name='pickupOrDelivery'
              onChange={handleOnChange}
            >
              <option value="negotiable">Negotiable</option>
              <option value="pickup">Pickup Only</option>
              <option value="delivery">Delivery Only</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingWhoCanSee" label="Item available for ">
            <Form.Select
              aria-label="Floating label select example"
              name='charitiesOnly'
              onChange={handleOnChange}
            >
              <option value={true}>Charities Only</option>
              <option value={false}>All Users</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="photosLinks" className="mb-3">
        <Form.Label>Link Photos</Form.Label>
          <FloatingLabel controlId="photo1" label="Link a Photo">
            <Form.Control
              type="text"
              name="photo1"
              placeholder="photo1"
              onChange={handleOnChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="photo2" label="Link a Photo">
            <Form.Control
              type="text"
              name="photo2"
              placeholder="photo2"
              onChange={handleOnChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="photo3" label="Link a Photo">
            <Form.Control
              type="text"
              name="photo3"
              placeholder="photo3"
              onChange={handleOnChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="photo4" label="Link a Photo">
            <Form.Control
              type="text"
              name="photo4"
              placeholder="photo4"
              onChange={handleOnChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="photo5" label="Link a Photo">
            <Form.Control
              type="text"
              name="photo5"
              placeholder="photo5"
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="photosUpload" className="mb-3">
          <Form.Label>Upload Photos</Form.Label>
          <Form.Control
            type="file"
            multiple
            name="files"
            onChange={handleFileChange}
          />
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

