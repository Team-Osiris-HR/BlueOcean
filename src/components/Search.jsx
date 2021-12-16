import React from 'react'
import Form from 'react-bootstrap/Form'
import Collapse from 'react-bootstrap/Collapse'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'


const Search = (props) => {

  // const handleChange = (event) => {
  //   props.setSearch(event.target.value);
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Form>
      <Form.Control
        type="text"
        placeholder="search sample app"
        // placeholder="search mikeslist"
        onChange={props.setSearch}
      />
    </Form>
  );

}

export default Search