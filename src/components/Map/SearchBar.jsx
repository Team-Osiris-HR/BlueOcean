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
              /* style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }} */
            />
            </FloatingLabel>
          </Form.Group>
      </StandaloneSearchBox>
      </LoadScript>
    )
  }

}

export default SearchBar;