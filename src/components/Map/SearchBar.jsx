import React, { useState, useEffect } from 'react';
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import { API_Key } from '../../../config.js';
import { Button, Container, Row, Col, Offcanvas, Stack } from 'react-bootstrap';

const SearchBar = (props) => {
  const onPlacesChanged = () => console.log(this.searchBox.getPlaces());

  return (
  <LoadScript
       googleMapsApiKey={API_Key}
       libraries={["places"]}>
       <StandaloneSearchBox
       //onLoad={onLoad}
       onPlacesChanged={onPlacesChanged}
       libraries={["places"]}>
      <input
        type="text"
        name="address"
        onChange={props.onChange}
        placeholder="Search an address..."
        style={{
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
        }}
      />
    </StandaloneSearchBox>
    </LoadScript>
  )
}

export default SearchBar;