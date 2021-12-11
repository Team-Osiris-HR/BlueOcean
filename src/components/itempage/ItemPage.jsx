import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
// import data from '../../../mockData.js';
import Photos from './Photos.jsx';
import Qa from './Qa.jsx';


class ItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: {},
      showAsk: false,
      askInput: ""
    };

    this.askClicked = this.askClicked.bind(this);
    this.reportClicked = this.reportClicked.bind(this);
    this.messageClicked = this.messageClicked.bind(this);
    this.toggleModel = this.toggleModel.bind(this);
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
    axios.get(`http://localhost:3000/api/posts/${this.props.id}`)
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

  askClicked(event) {
    // console.log('Someone wants to ask a question: ', this.state.askInput);
    event.preventDefault();
    var question = this.state.askInput;
    axios.post(`http://localhost:3000/api/posts/${this.state.postData.id}`, { "questionText": question })
      .then((res) => {
        // console.log(res.data);
        this.getItem();
        this.toggleModel();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  toggleModel(event) {
    // console.log('Model was toggled');
    var toggle = this.state.showAsk;
    if (toggle) {
      this.setState({ showAsk: false });
    } else {
      this.setState({ showAsk: true });
    }
  }

  askChange(e) {
    // console.log(e.target.value);
    this.setState({ askInput: e.target.value })
  }

  reportClicked(event) {
    console.log('Someone wants to report a post');
  }

  messageClicked(event) {
    console.log('Someone wants to message the donor');
  }


  render() {
    return (
      <Container className="itemContainer" >
        <Col>
          <Photos images={this.state.postData.photos} />
          <div className="nameBox">
            <h2>{this.state.postData.title}</h2>
            <Button variant="primary" onClick={this.messageClicked}>Message Poster</Button>{' '}
          </div>
          <p>{this.state.postData.donor}</p>
          <p className="description">{this.state.postData.description}</p>
          <Qa QAs={this.state.postData.qas} />
          <div>
            <p>Map Place Holder</p>
          </div>

          <div className="bottombuttonscontainer">
            <div className="askmodal">
              <Button style={{ "marginTop": "2%" }} variant="info" onClick={this.toggleModel} >Ask Question </Button>
              {this.state.showAsk ? <Modal show={this.toggleModel} onHide={this.toggleModel} >
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Ask a Question" style={{ "minHeight": "75px" }} onChange={(e) => this.askChange(e)} />
                    </Form.Group>
                    <Button variant="secondary" onClick={this.toggleModel}>
                      Close
                    </Button>{" "}
                    <Button variant="primary" type="submit" onClick={this.askClicked}>
                      Submit
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal> : null}


            </div>
            <Button style={{ "marginTop": "2%" }} variant="danger" onClick={this.reportClicked} >Report Posting</Button>{' '}
          </div>
        </Col>
      </Container >
    );
  }
}

export default ItemPage;