import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle, StandaloneSearchBox, Loader } from '@react-google-maps/api';
import { API_KEY } from '../../../config.js';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';


const Map = (props) => {

  const [ selected, setSelected ] = useState({});
  const [ view, setView] = useState({value: 'charities'});
  const [ markerList, setList ] = useState({});
  const [ charities, setCharities ] = useState([]);
  const [ items, setItems ] = useState({});
  const [ isBusy, setIsBusy ] = useState(true);
  const [ allLocations, setAllLocations ] = useState([]);
  const [ index, setIndex ] = useState(0);
  const [ markers, setMarkers ] = useState({});

  const users = [];
  props.posts.map((post) => {
    users.push(post.user)
  });

  const getAllLocations = (users) => {
    return Promise.all(users.map(fetchLocation));
  }
  const fetchLocation = (user) => {
    return axios.get(`/api/users/${user}`)
    .then((result) => {
      return result.data.doc.location ? result.data.doc.location : null;
    })
    .catch((err) => {
      return err;
    })
  }

  const onToggle = (e) => {
    //setMarkers({})
    if (e.target.innerHTML === "charities") {
      var locatedCharities = [];
      charities.map((charity) => {
        if (charity.location) {
          locatedCharities.push({
            name: charity.name,
            lat: charity.location.latitude,
            lng: charity.location.longitude,
            additionalInfo: charity.address});
        }
      })
      setMarkers(locatedCharities);
    } else if (e.target.innerHTML === "items") {
      var locatedItems = [];
      allLocations.map((loc, i) => {
        if (loc) {
          locatedItems.push({
            name: props.posts[i].title,
            lat: loc.latitude,
            lng: loc.longitude,
            additionalInfo: props.posts[i].description
          })
        }
      })
      setMarkers(locatedItems);
    }
  }

  const onSelect = (item, i) => {
    console.log(item);
    setSelected(item);
    setIndex(i);
  }

  const mapStyles = {
    height: "80vh",
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
          console.log(results.data)
          var charities = results.data.doc.filter(user => user.role==="charity")
          setCharities(charities);
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          console.log(err);
        };
      })
      if (isSubscribed) {
        getAllLocations(users)
        .then(result => {
          setAllLocations(result);
          setIsBusy(false);
        });
      }

    // unsubscribe
    return () => (isSubscribed=false);
  }, []);


  return (
    isBusy ? (
      <>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      </>
    ) : (
    <>
    <Button className="rounded-pill ms-auto" id="charities" variant="outline-primary" size="sm" onClick={(e) => onToggle(e)}>charities</Button>
    <Button className="rounded-pill ms-auto" variant="outline-primary" size="sm" onClick={(e) => onToggle(e)}>items</Button>
    <br/>

     <LoadScript
       googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          options={{
            styles: require('./map.json')
          }}
          mapTypeId='terrain'
          zoom={12}
          center={defaultCenter}>
          {markers.length > 0 ? (
            markers.map((marker, i) => {
              return (
                <Marker key={i}
                position={{
                  lat: marker.lat,
                  lng: marker.lng
                }}
                onClick={() => onSelect(marker)} />
              )
            })
          ) : null}
          {selected.lat && (
            <InfoWindow
            position={{
              lat: selected.lat,
              lng: selected.lng
            }}
            onCloseClick={() => setSelected({})}
          >
          <>
          <h4><b>{selected.name}</b></h4>
          <p>{selected.additionalInfo}</p>
          </>
          </InfoWindow>
          )}
     </GoogleMap>
     </LoadScript>
     </>
    )
  )
}


export default Map;

/* OLD CODE - BREAK WINDOW IN CASE OF EMERGENCY
{view === 'charities' ? (
  charities.length > 0 &&
   charities.map(charity => {
      return (
       charity.location ? (
       <>
     <Marker key={charity.name}
       position={{
         lat: charity.location.latitude,
         lng: charity.location.longitude
       }}
       onClick={() => onSelect(charity, 0)}
     />
   </>
     ) : null)
   })
) : null}


{view === 'charities' && (
  selected.location && (
 <InfoWindow
   position={{
     lat: selected.location.latitude,
     lng: selected.location.longitude
   }}
   onCloseClick={() => setSelected({})}
 >
   <>
   <p><b>{selected.name}</b></p>
   <p>{selected.address}</p>
   </>
 </InfoWindow>
   ))}

{view === 'items' ? (
  allLocations.length > 0 &&
  allLocations.map((loc, i) => {
    console.log(props.posts[i]);
    return (
      loc ? (
    <Marker key={props.posts[i]}
      position={{
        lat: loc.latitude,
        lng: loc.longitude
      }}
      onClick={() => onSelect(props.posts[i], i)}
    />
    ) : null)
   })
) : null}

{view === "items" ? (
   allLocations[index] && (
     <InfoWindow
     position={{
       lat: allLocations[index].latitude,
       lng: allLocations[index].longitude
     }}
     onCloseClick={() => setSelected({})}
     >
   <>
   <p><b>{selected.title}</b></p>

   </>
 </InfoWindow>
    )
) : null}
*/