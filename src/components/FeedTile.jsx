import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';


var FeedTile = ({post, getPostId}) => (
<Card className="text-center tile" border="info" onClick={() => {getPostId(post._id)}}>
  {post.photos.length > 0 ?
    <Card.Img className="img-thumbnail" variant="top" src={post.photos[0]}/>
    :
    <Card.Img className="img-thumbnail" variant="top" src="https://picsum.photos/seed/picsum/50/30" />
  }
  <Card.Body>
    <Card.Title>{post.title}</Card.Title>
    <Card.Text className="card_description">{post.description}</Card.Text>
  </Card.Body>
</Card>

)

export default FeedTile;