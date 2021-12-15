import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle, StandaloneSearchBox, Loader } from '@react-google-maps/api';
import { API_Key } from '../../../config.js';
import { Button } from 'react-bootstrap';
import axios from 'axios';


const Map = (props) => {

  const [ selected, setSelected ] = useState({});
  const [ view, setView] = useState({value: 'charities'});
  const [ markerList, setList ] = useState({});
  const [ charities, setCharities ] = useState({});
  const [ items, setItems ] = useState({});
  const [ isBusy, setIsBusy ] = useState(true);

  useEffect(() => {
    // clean-up control
    var isSubscribed = true;

    axios.get('/api/users/')
      .then ((results) => {
        if (isSubscribed) {
          var charities = results.data.data.filter(user => user.role==="charity")
          setCharities(charities);

          //setUsers(results.data.data);
          setIsBusy(false);
          console.log(results.data.data);
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          console.log(err);
        };
      })

    // unsubscribe
    return () => (isSubscribed=false);
  }, []);

  const onToggle = (ref) => {
    setView(ref.target.innerHTML);
  }

  const onSelect = item => {
    setSelected(item);
  }

  const mapStyles = {
    height: "80vh",
    width: "80%",
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
    isBusy ? (
      <>
      <p>loading...</p>
      </>
    ) : (
      <>
    <Button className="rounded-pill ms-auto" id="charities" variant="outline-primary" size="sm" onClick={(e) => onToggle(e)}>charities</Button>
    <Button className="rounded-pill ms-auto" variant="outline-primary" size="sm" onClick={(e) => onToggle(e)}>items</Button>
     <LoadScript
       googleMapsApiKey={API_Key}>
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
              return view === 'charities' ?
              (
              <Marker key={item.name}
                position={item.location}
                onClick={() => onSelect(item)}
              />
              )
              :
              (
              <Circle key={item.name}
                center={item.location}
                radius={500}
                options={{geodesic: true,
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
     </LoadScript>
     </>
    )
  )

}

export default Map;
