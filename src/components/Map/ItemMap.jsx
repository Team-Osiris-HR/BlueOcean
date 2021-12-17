import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle, StandaloneSearchBox, Loader } from '@react-google-maps/api';
import { API_KEY } from '../../../config.js';
import { Button } from 'react-bootstrap';
import axios from 'axios';
require("babel-polyfill");

const ItemMap = (props) => {

  const defaultLocation = {
    lat: 40.75127626575399,
    lng: -73.98404960675472
  }

  const [ selected, setSelected ] = useState({});
  const [ userLocation, setUserLocation ] = useState(defaultLocation);
  const [ isBusy, setIsBusy ] = useState(true);

  const mapStyles = {
    height: "40vh",
    width: "80%",
  };

  async function getUser () {
    const result = await axios.get('/api/users/');
    return result.data.doc.filter(user => user.name===props.donor)[0]._id;
    // returns user id
  }

  async function getLocation () {
    const id = await getUser();
    const result = await axios.get(`/api/users/${id}`);
    if (result.data.doc.location) {
      var loc = {
        lat: result.data.doc.location.latitude,
        lng: result.data.doc.location.longitude
      }
      console.log(loc);
      setUserLocation(loc);
    }
  }

  useEffect(() => {
    // clean-up control
    var isSubscribed = true;

    if (isBusy) {
      getLocation();
      setIsBusy(false);
    }

  //return () => (isSubscribed=false);
  }, []);

  const onSelect = item => {
    setSelected(item);
    console.log(item)
  }

  return (
    isBusy ? (
      <>
      <p>loading...</p>
      </>
    ) : (
    <>
    <LoadScript
       googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          options={{
            styles: require('./map.json')
          }}
          mapTypeId='terrain'
          zoom={15}
          center={userLocation}>
           <Circle key={'name'}
                center={userLocation}
                radius={350}
                options={{geodesic: true,
                strokeOpacity: 1.5,
                strokeWeight: 2}}
                onClick={() => onSelect(item)}
              />
     </GoogleMap>
     </LoadScript>
     </>
  ))
}


export default ItemMap;