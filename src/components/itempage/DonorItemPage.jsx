import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import data from '../../../mockData.js';
import Photos from './Photos.jsx';
import Qa from './Qa.jsx';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


class DonorItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: {},
      showEdit: false,
      showDelete: false,
      answer: "",
      imageAddress: "",
      deliveryOptions: "negotiable",
      condition: "new",
      category: "appliances"
    };

    this.editClicked = this.editClicked.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.editModal = this.editModal.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.descChange = this.descChange.bind(this);
    this.answerChange = this.answerChange.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.deleteClicked = this.deleteClicked.bind(this);
  }

  componentDidMount() {
    // console.log('Component Did Mount');
    // axios.post('http://localhost:3000/api/users/login', { "name": "manny", "password": "123456" })
    //   .then((res) => {
    //     console.log("Recieved new Cookie");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    this.getItem();
  }

  getItem() {
    console.log(this.props);
    axios.get(`/api/posts/${this.props.id}`)
      .then((res) => {
        var post = res.data.doc;
        // console.log(post);
        var newPost = { id: post._id, title: post.title, donor: post.user.name, photos: post.photos, description: post.description, condition: post.condition, deliveryOptions: post.deliveryOptions, qas: post.QAs };
        this.setState({ postData: newPost });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  editClicked(event) {
    event.preventDefault();
    var post = this.state.postData;
    var post2 = this.state
    // console.log(post);
    var address = this.state.imageAddress;
    if (address !== '') {
      address = address.split(', ');
      address = post.photos.concat(address);
    }
    // console.log(address);
    axios.patch(`/api/posts/${this.state.postData.id}`, { "title": post.title, "description": post.description, photos: address ? address : post.photos, category: this.state.category, condition: this.state.condition, deliveryOptions: this.state.deliveryOptions })
      .then((res) => {
        // console.log(res.data);
        this.getItem();
        this.toggleEdit();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  deleteClicked(event) {
    event.preventDefault();
    axios.patch(`/api/posts/${this.state.postData.id}/toggle`)
      .then((res) => {
        console.log(res);
        this.props.setRenderState('feed');
      })
      .catch((err) => {
        console.log("🚀 ~ file: DonorItemPage.jsx ~ line 94 ~ DonorItemPage ~ deleteClicked ~ err", err)
      })
  }

  toggleEdit(event) {
    // console.log('Model was toggled');
    var toggle = this.state.showEdit;
    if (toggle) {
      this.setState({ showEdit: false });
    } else {
      this.setState({ showEdit: true });
    }
  }

  toggleDelete(event) {
    var toggle = this.state.showDelete;
    if (toggle) {
      this.setState({ showDelete: false });
    } else {
      this.setState({ showDelete: true });
    }
  }

  titleChange(e) {
    var post = this.state.postData;
    post.title = e.target.value;
    this.setState({ postData: post });
  }

  descChange(e) {
    var post = this.state.postData;
    post.description = e.target.value;
    this.setState({ postData: post });
  }

  imageChange(e) {
    var address = this.state.imageAddress;
    address = e.target.value;
    this.setState({ imageAddress: address });
  }

  handleOnChange(e) {
    // console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  editModal() {
    var post = this.state.postData;
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.toggleEdit}
        onHide={this.toggleEdit}
      >
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <FloatingLabel
                controlId="floatingInput"
                label="Title"
                className="mb-3"
              >
                <Form.Control type="input" value={post.title} style={{ "minHeight": "75px" }} onChange={(e) => this.titleChange(e)} />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <FloatingLabel
                controlId="floatingInput"
                label="Descriptioin"
                className="mb-3"
              >
                <Form.Control type="input" value={post.description} style={{ "minHeight": "75px" }} onChange={(e) => this.descChange(e)} />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <FloatingLabel
                controlId="floatingInput"
                label="Images"
                className="mb-3"
              >
                <Form.Control type="input" value={this.state.imageAddress} style={{ "minHeight": "75px" }} onChange={(e) => this.imageChange(e)} />
                <Form.Text className="text-muted">
                  Add URL with comma inbetween for multiple images
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingWhoCanSee" label="Category My Item Best Fits In">
                <Form.Select
                  aria-label="Floating label select example"
                  name='category'
                  onChange={this.handleOnChange}
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
                  onChange={this.handleOnChange}
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
                  name='deliveryOptions'
                  onChange={this.handleOnChange}
                >
                  <option value="negotiable">Negotiable</option>
                  <option value="pickup">Pickup Only</option>
                  <option value="delivery">Delivery Only</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Button variant="secondary" onClick={this.toggleEdit}>
              Close
            </Button>{" "}
            <Button variant="primary" type="submit" onClick={this.editClicked}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  deleteModal() {
    return (
      <Modal show={this.toggleDelete} onHide={this.toggleDelete} >
        <Modal.Body>
          <p>Are you sure you want to delete this post?</p>
          <Button variant="secondary" onClick={this.toggleDelete}>
            Close
          </Button>{" "}
          <Button variant="primary" type="submit" onClick={this.deleteClicked}>
            Submit
          </Button>
        </Modal.Body>

      </Modal>
    );
  }

  answerChange(e) {
    var cAnswer = this.state.answer;
    cAnswer = e.target.value;
    this.setState({ answer: cAnswer });
  }

  submitAnswer(id) {
    // console.log(`The Product id is: ${this.state.postData.id}\nThe id is: ${id}\nThe answer is: ${this.state.answer}`);
    axios.post(`/api/posts/${this.state.postData.id}/${id}`, { "answerText": this.state.answer })
      .then((res) => {
        // console.log(res.data);
        this.getItem();
      })
      .catch((err) => {
        console.log(err);
      })
  }


  render() {
    return (
      <Container className="itemContainer" >
        <Col>
          <Photos images={this.state.postData.photos} />
          <div className="nameBox">
            <h2>{this.state.postData.title}</h2>
            {/* <Button variant="primary" onClick={this.toggleEdit}>Edit Post</Button> */}
            <button type="button" className="editbutton" onClick={this.toggleEdit} >Edit Post</button>
            {this.state.showEdit ? this.editModal() : null}
          </div>
          <p>{this.state.postData.donor}</p>
          <p className="description">{this.state.postData.description}</p>
          <div className="options">
            <p>Delivery Options: {this.state.postData.deliveryOptions}</p>
            <p>Condition: {this.state.postData.condition}</p>
          </div>
          <Qa QAs={this.state.postData.qas} donor={true} answer={this.state.answer} answerChange={this.answerChange} submitAnswer={this.submitAnswer} />
          <div className="deletemodal">
            {/* <Button style={{ "marginTop": "2%" }} variant="danger" onClick={this.toggleDelete} >Delete Posting</Button> */}
            <button type="button" className="deletebutton" style={{ "marginTop": "2%" }} onClick={this.toggleDelete} >Delete Posting</button>
            {this.state.showDelete ? this.deleteModal() : null}
          </div>
        </Col>
      </Container >
    );
  }
}

export default DonorItemPage;