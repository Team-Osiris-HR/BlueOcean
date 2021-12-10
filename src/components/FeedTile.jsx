import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';


var FeedTile = () => (
<Card className="text-center" border="info">
  <Card.Img className="img-thumbnail" variant="top" src="https://picsum.photos/seed/picsum/50/30" />
  <Card.Body>
    <Card.Title>Item name</Card.Title>
    <Card.Text>
      Item Description
    </Card.Text>
  </Card.Body>
</Card>

)

export default FeedTile;