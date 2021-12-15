import React, { useState, useEffect } from 'react';
import { GoogleMap, StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import { API_Key } from '../../../config.js';
import { Form, FloatingLabel } from 'react-bootstrap';

const libraries = ["places"];

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.searchBox = null;
    this.state={
      places: [],
    }

  }

  render () {
    return (
    <LoadScript
       googleMapsApiKey={API_Key}
       libraries={libraries}>
       <StandaloneSearchBox
       onLoad={this.props.onSearchBoxMounted}
       onPlacesChanged={this.props.onPlacesChanged}
       libraries={["places"]}>
         <Form.Group className="mb-3" controlId="formGridAddress" >
            <FloatingLabel
              label='address'
              className='mb-3'
            >
            <Form.Control
              type="text"
              name="address"
              onChange={this.props.onChange}
              placeholder="Search an address..."
            />
            </FloatingLabel>
          </Form.Group>
      </StandaloneSearchBox>
      </LoadScript>
    )
  }

}

export default SearchBar;