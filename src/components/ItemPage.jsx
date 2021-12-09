import React from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';


const ItemPage = (props) => {
  return (
    <Container className="itemContainer">
      <Col>
        <Carousel fade className="mx-auto">
          <Carousel.Item >
            <img
              className="d-block mw-100 mx-auto"
              src="https://cdn.shopify.com/s/files/1/0272/4770/6214/articles/when-do-puppies-start-walking.jpg?v=1593020034"
              alt="First slide"
            // style={imageStyle}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block mw-100  mx-auto"
              src="https://www.rd.com/wp-content/uploads/2021/03/GettyImages-1133605325-scaled-e1617227898456.jpg?resize=1536,1023"
              alt="Second slide"
            // style={imageStyle}
            />
          </Carousel.Item>
        </Carousel>
        <div className="nameBox">
          <h2>Item Name</h2>
          <Button variant="primary">Message Donor</Button>{' '}
        </div>
        <p>Donor Username</p>
        {/* <Button variant="success">Request</Button>{' '} */}
        <p className="description">Description: This is a mock Description for testing purposes. Jkieionv iooihwjk vhoiwhiybk vtvybqkjdn uvbiurvbjkq oviurbiyqkhi vrjwuneviupjb vnruiuvbr viuberv biu brecjbr uhv u jwrqvubroyvhkjfbvpq bivruirbv vnoqwocpbiuvbirqrnqv ubverpiubvr </p>
        <div className="qaContainer">
          <h4>Q&A</h4>
          <div className="qaTile">
            <h6>How Old Are They?</h6>
            <p> - 396 Years Old</p>
          </div>
          <div className="qaTile">
            <h6>Are these Puppies Cute?</h6>
            <p> - Are you a Monster?</p>
          </div>
        </div>
        <Button style={{ "marginTop": "2%" }} variant="danger">Report Posting</Button>{' '}
      </Col>
    </Container >
  );
}

export default ItemPage;