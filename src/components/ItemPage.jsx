import React from 'react';

const ItemPage = (props) => {
  const imageStyle = {
    width: "50px",
    height: "50px"
  }
  return (
    <div>
      <h2>Item Page</h2>
      <p>Donor Username</p>
      <p>Description: This is a mock Description for testing purposes</p>
      <div>
        <p>Image</p>
        <img style={imageStyle} src="https://cdn.shopify.com/s/files/1/0272/4770/6214/articles/when-do-puppies-start-walking.jpg?v=1593020034"></img>
        <img style={imageStyle} src="https://www.rd.com/wp-content/uploads/2021/03/GettyImages-1133605325-scaled-e1617227898456.jpg?resize=1536,1023"></img>
      </div>
      <div>
        <h4>Q&A</h4>
        <p>Question</p>
        <p> - Answer</p>
      </div>
      <button type="button" >Message Donor</button>
      <button type="button" >Request</button>
      <button type="button" >Report</button>
    </div >
  );
}

export default ItemPage;