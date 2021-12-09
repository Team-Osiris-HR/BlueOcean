import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.renderView = this.renderView.bind(this)
  }

  renderView() {
    return (
      <Container className='app-container'>
        <Col>
          <div>
            <h1>Hello world</h1>
          </div>
        </Col>
      </Container >
    )
  }

  render() {
    return (
      this.renderView()
    );
  }
}

export default App;
