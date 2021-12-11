import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Photos = ({ images }) => {
  return (
    <div>
      <Carousel fade className="mx-auto" >
        {images ? images.map((image, index) => (
          <Carousel.Item key={index} >
            <img
              className="d-block mw-100 mx-auto"
              src={image}
              alt={`slide ${index}`}
            />
          </Carousel.Item>
        )) : null}
      </Carousel>
    </div>
  );
}

export default Photos;


/*
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
*/