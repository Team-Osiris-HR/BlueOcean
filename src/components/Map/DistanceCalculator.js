import axios from 'axios';

const getAllLocations = (users) => {
  return Promise.all(users.map(fetchLocation));
}
const fetchLocation = (user) => {
  return axios.get(`/api/users/${user}`)
  .then((result) => {
    return result.data.data.location ? result.data.data.location : null;
  })
  .catch((err) => {
    return err;
  })
}

getAllLocations(users)
  .then(result => {
    setAllLocations(result);
});

async function getUser () {
  const result = await axios.get('/api/users/');
  return result.data.data.filter(user => user.name===props.donor)[0]._id;
  // returns user id
}

async function getLocation () {
  const id = await getUser();
  const result = await axios.get(`/api/users/${id}`);
  if (result.data.data.location) {
    var loc = {
      lat: result.data.data.location.latitude,
      lng: result.data.data.location.longitude
    }
    setUserLocation(loc);
  }
}

const getDistance = (lat1, lng1, lat2, lng2) => {
  // Haversine formula
  var R = 3959; // using miles
  var dLat = lat2-lat1 * (Math.PI/180);
  var dLon = lon2-lon1 * (Math.PI/180);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}