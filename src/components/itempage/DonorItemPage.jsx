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
      answer: "",
      imageAddress: ""
    };

    this.editClicked = this.editClicked.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.editModal = this.editModal.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.descChange = this.descChange.bind(this);
    this.answerChange = this.answerChange.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  componentDidMount() {
    console.log('Component Did Mount');
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
    axios.get(`http://localhost:3000/api/posts/61b3a70c216a5fdea297ed6d`)
      .then((res) => {
        var post = res.data.post;
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
    var address = this.state.imageAddress;
    address = address.split(', ');
    address = post.photos.concat(address);
    // console.log(address);
    axios.patch(`http://localhost:3000/api/posts/${this.state.postData.id}`, { "title": post.title, "description": post.description, photos: address })
      .then((res) => {
        // console.log(res.data);
        this.getItem();
        this.toggleEdit();
      })
      .catch((err) => {
        console.log(err);
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

  answerChange(e) {
    var cAnswer = this.state.answer;
    cAnswer = e.target.value;
    this.setState({ answer: cAnswer });
  }

  submitAnswer(id) {
    console.log(`The Product id is: ${this.state.postData.id}\nThe id is: ${id}\nThe answer is: ${this.state.answer}`);
    axios.post(`http://localhost:3000/api/posts/${this.state.postData.id}/${id}`, { "answerText": this.state.answer })
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
            <Button variant="primary" onClick={this.toggleEdit}>Edit Post</Button>
            {this.state.showEdit ? this.editModal() : null}
          </div>
          <p>{this.state.postData.donor}</p>
          <p className="description">{this.state.postData.description}</p>
          <Qa QAs={this.state.postData.qas} donor={true} answer={this.state.answer} answerChange={this.answerChange} submitAnswer={this.submitAnswer} />
          <div>
            <p>Map Place Holder</p>
          </div>
        </Col>
      </Container >
    );
  }
}

export default DonorItemPage;