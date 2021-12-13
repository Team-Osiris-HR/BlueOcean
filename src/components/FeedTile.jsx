import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';


var FeedTile = ({post, getPostId}) => (
<Card className="text-center tile" border="primary" onClick={() => {getPostId(post._id)}}>
  {post.photos.length > 0 ?
    <Card.Img className="feed_image" variant="top" src={post.photos[0]}/>
    : null
  }
  <Card.Body className="card_body">
    <Card.Title>{post.title}</Card.Title>
  </Card.Body>
</Card>

)

export default FeedTile;