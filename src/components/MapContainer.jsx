import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
​
const MapContainer = () => {

  const mapStyles = {
    height: "100vh",
    width: "100%"};

  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }

  return (
     <LoadScript
       googleMapsApiKey='YOUR_API_KEY_HERE'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        />
     </LoadScript>
  )
}
​
export default MapContainer;