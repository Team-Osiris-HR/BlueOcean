import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';


var FeedTile = ({ post, getPostId }) => (
  < Card className="text-center tile" border="dark" onClick={() => { getPostId(post._id, post.user) }}>
    {
      post.photos.length > 0 ?
        <Card.Img className="feed_image" variant="top" src={post.photos[0]} />
        : <Card.Img className="feed_image" variant="top" src="https://www.indexdirect.ie/images/ownproducts/Credit57x40x127.jpg" />
    }
    < Card.Body className="card_body" >
      <Card.Title>{post.title}</Card.Title>
    </Card.Body >
  </Card >

)

export default FeedTile;