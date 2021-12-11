import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
// import data from '../../../mockData.js';
import Photos from './Photos.jsx';


class ItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: {}
    };

    this.askClicked = this.askClicked.bind(this);
    this.reportClicked = this.reportClicked.bind(this);
    this.messageClicked = this.messageClicked.bind(this);
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
    axios.get('http://localhost:3000/api/posts/61b3a70c216a5fdea297ed6d')
      .then((res) => {
        var post = res.data.post;
        var newPost = { title: post.title, donor: post.user.name, photos: post.photos, description: post.description, condition: post.condition, deliveryOptions: post.deliveryOptions };
        this.setState({ postData: newPost });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  askClicked(event) {
    console.log('Someone wants to ask a question');
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
            <Button variant="primary" onClick={this.messageClicked}>Send Message</Button>{' '}
          </div>
          <p>{this.state.postData.donor}</p>
          <p className="description">{this.state.postData.description}</p>
          {/* <div className="qaContainer">
            <h4>Q&A</h4>
            <div className="qaTile">
              <h6>{this.state.postData.qa[0].question}</h6>
              <p>- {this.state.postData.qa[0].answer}</p>
            </div>
            <div className="qaTile">
              <h6>{this.state.postData.qa[1].question}</h6>
              <p>- {this.state.postData.qa[1].answer}</p>
            </div>
          </div> */}

          <div className="bottombuttonscontainer">
            <Button style={{ "marginTop": "2%" }} variant="info" onClick={this.askClicked} >Ask Question </Button>
            <Button style={{ "marginTop": "2%" }} variant="danger" onClick={this.reportClicked} >Report Posting</Button>{' '}
          </div>
        </Col>
      </Container >
    );
  }
}

export default ItemPage;