import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle, StandaloneSearchBox } from '@react-google-maps/api';
import { API_Key } from '../../../config.js';


const CharityMap = (props) => {

  const [ selected, setSelected ] = useState({});

  const onSelect = item => {
    setSelected(item);
  }

  //const onLoad = (ref) => this.searchBox = ref;

  const onPlacesChanged = () => console.log(this.searchBox.getPlaces());

  const mapStyles = {
    height: "40vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 40.75127626575399, lng: -73.98404960675472
  }
  // Will be passed as props
  const locations = [
    {
      name: "Goodwill (Midtown)",
      location: {
        lat: 40.76057336363583,
        lng: -73.98096009546289
      },
      address: "123 Charity Lane",
      img: "https://images.crowdspring.com/blog/wp-content/uploads/2010/08/27132550/goodwill-logo.jpg"
    },
    {
      name: "Charity 2",
      location: {
        lat: 40.74158715401439,
        lng: -74.005850993123
      },
    },
    {
      name: "Charity 3",
      location: {
        lat: 40.7255877152931,
        lng: -73.98902817953203
      },
    },
    {
      name: "Location 4",
      location: {
        lat: 41.3797,
        lng: 2.1682
      },
    },
    {
      name: "Location 5",
      location: {
        lat: 41.4055,
        lng: 2.1915
      },
    }
  ];

  return (
    <>
     <LoadScript
       googleMapsApiKey={API_Key}
       libraries={["places"]}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          options={{
            styles: require('./map.json')
          }}
          mapTypeId='terrain'
          zoom={15}
          center={defaultCenter}>
         {
            locations.map(item => {
              return (
              /* <Marker key={item.name}
                position={item.location}
                onClick={() => onSelect(item)}
              /> */
              <Circle key={item.name}
                center={item.location}
                radius={500}
                options={{geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.5,
                strokeWeight: 2}}
                onClick={() => onSelect(item)}
              />
              )
            })
         }
        {
            selected.location &&
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <>
              <img src={selected.img} width="50" height="50" />
              <p>{selected.name}</p>
              <p>{selected.address}</p>
              </>
            </InfoWindow>
            )
         }
     </GoogleMap>
     <br />
     <StandaloneSearchBox
      //onLoad={onLoad}
      onPlacesChanged={onPlacesChanged}
      libraries={["places"]}>
      <input
        type="text"
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
    <br />
    <button>Enter address</button>
     </LoadScript>
     </>
  )
}

export default CharityMap;
