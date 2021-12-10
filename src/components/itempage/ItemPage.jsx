import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
// import data from '../../../mockData.js';
// import Carousel from './Carousel.jsx';


class ItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };

    this.askClicked = this.askClicked.bind(this);
    this.reportClicked = this.reportClicked.bind(this);
    this.messageClicked = this.messageClicked.bind(this);
  }

  componentDidMount() {
    console.log('Component Did Mount');
    console.log(data);
    axios.get('http://localhost:3000/api/posts/61b3a70c216a5fdea297ed6d')
      .then((res) => {
        console.log(res.data);
        this.setState({ data: res.data });
        saveData();
      })
      .catch((err) => {
        console.log(err);
      })

  }

  saveData() {
    var data = this.state.data[0];
    var name = data.
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
      // <Carousel />
      // <Container className="itemContainer">
      //   <Col>
      //     <Carousel fade className="mx-auto">
      //       <Carousel.Item >
      //         <img
      //           className="d-block mw-100 mx-auto"
      //           src="https://cdn.shopify.com/s/files/1/0272/4770/6214/articles/when-do-puppies-start-walking.jpg?v=1593020034"
      //           alt="First slide"
      //         // style={imageStyle}
      //         />
      //       </Carousel.Item>
      //       <Carousel.Item>
      //         <img
      //           className="d-block mw-100  mx-auto"
      //           src="https://www.rd.com/wp-content/uploads/2021/03/GettyImages-1133605325-scaled-e1617227898456.jpg?resize=1536,1023"
      //           alt="Second slide"
      //         // style={imageStyle}
      //         />
      //       </Carousel.Item>
      //     </Carousel>
      //     <div className="nameBox">
      //       <h2>{data.post[1].title}</h2>
      //       <Button variant="primary" onClick={this.messageClicked}>Send Message</Button>{' '}
      //     </div>
      //     <p>{data.post[1].users.name}</p>
      //     {/* <Button variant="success">Request</Button>{' '} */}
      //     <p className="description">{data.post[1].description}</p>
      //     <div className="qaContainer">
      //       <h4>Q&A</h4>
      //       <div className="qaTile">
      //         <h6>{data.post[1].qa[0].question}</h6>
      //         <p>- {data.post[1].qa[0].answer}</p>
      //       </div>
      //       <div className="qaTile">
      //         <h6>{data.post[1].qa[1].question}</h6>
      //         <p>- {data.post[1].qa[1].answer}</p>
      //       </div>
      //     </div>

      //     <div className="bottombuttonscontainer">
      //       <Button style={{ "marginTop": "2%" }} variant="info" onClick={this.askClicked} >Ask Question </Button>
      //       <Button style={{ "marginTop": "2%" }} variant="danger" onClick={this.reportClicked} >Report Posting</Button>{' '}
      //     </div>
      //   </Col>
      // </Container >
      <p>PlaceHolder</p>
    );
  }
}

export default ItemPage;