import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';


var FeedTile = ({ post, getPostId }) => (
  < Card
    className="text-center tile"
    border="dark"
    bg="info"
    text="white"
    style={{ width: '18rem' }}
    onClick={() => { getPostId(post._id, post.user) }}>

    <div className="photobox">
      {post.photos.length > 0 ?
        <Card.Img className="feed_image" variant="top" src={post.photos[0]} />
        : <Card.Img className="feed_image" variant="top" src="https://www.indexdirect.ie/images/ownproducts/Credit57x40x127.jpg" />}
    </div>
    <div className="cardTextBox">
      < Card.Body >
        <Card.Title>{post.title}</Card.Title>
      </Card.Body >
    </div>
  </Card >

)

export default FeedTile;