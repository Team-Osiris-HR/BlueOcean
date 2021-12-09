import React from 'react';
import ItemPage from './itemPage.jsx';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <Container>
        <Col>
          <p>Home Page</p>
          <ItemPage />
        </Col>
      </Container>
    );
  }
}

export default App;