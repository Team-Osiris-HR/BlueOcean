import React from 'react'
import Form from 'react-bootstrap/Form'
import Collapse from 'react-bootstrap/Collapse'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import BsSearch from 'react-icons/bs'


class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.setOpen = this.setOpen.bind(this)
  }

  setOpen() {
    if (!this.state.open) {
      this.setState({ open: true })
    } else {
      this.setState({ open: false })
    }
  }

  render() {
    return (
      <InputGroup>
        <Collapse in={this.state.open} dimension="width">
          <Form.Control id="example-collapse-text"
            placeholder="Search"
            aria-label="Search"
          />
        </Collapse>
        <Button onClick={() => this.setOpen()}
          aria-controls="collapse-search"
          aria-expanded={this.state.open}
        >
        </Button>
      </InputGroup >
    )
  }
}

export default Search