import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle, StandaloneSearchBox, Loader } from '@react-google-maps/api';
import { API_Key } from '../../../config.js';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const ItemMap = (props) => {

  const [ selected, setSelected ] = useState({});
  var userLocation;

  const mapStyles = {
    height: "40vh",
    width: "80%",
  };

  const defaultCenter = {
    lat: 40.75127626575399, lng: -73.98404960675472
  }

  useEffect(() => {
    // clean-up control
    var isSubscribed = true;

    axios.get('/api/users/')
      .then ((results) => {
        if (isSubscribed) {
          console.log(props);
          var id = results.data.data.filter(user => user.name===props.donor)[0]._id;
          axios.get(`/api/users/${id}`)
            .then((result) => {
              if (result.data.data.location) {
                userLocation = result.data.data.location;
              } else {
                userLocation = defaultCenter;
              }
            })
            .catch((err) => {
              console.log(err);
            })

        }
      })
      .catch((err) => {
        if (isSubscribed) {
          console.log(err);
        };
      })
      return () => (isSubscribed=false);
    }, []);

  const onSelect = item => {
    setSelected(item);
  }


  return (
    <>
    <LoadScript
       googleMapsApiKey={API_Key}>
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
                radius={300}
                options={{geodesic: true,
                strokeOpacity: 1.5,
                strokeWeight: 2}}
                //onClick={() => onSelect(item)}
              />
      {
        selected.location &&
            (
              <InfoWindow
              position={location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <>
              <p>{selected.name}</p>
              <p>{selected.address}</p>
              </>
            </InfoWindow>
            )
         }
     </GoogleMap>
     </LoadScript>
     </>
  )
}


export default ItemMap;