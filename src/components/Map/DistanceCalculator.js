module.exports = (lat1, lng1, lat2, lng2) => {
  // Haversine formula
  var R = 3959; // using miles
  var dLat = lat2-lat1 * (Math.PI/180);
  var dLon = lon2-lon1 * (Math.PI/180);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}


/*
componentDidMount() {
  this.getUserLocations();
  this.sortByDistance();
}

getUserLocations () {
  var userLocations = [];
  var users = [];
  this.props.posts.map((post) => {
    users.push(post.user);
  })
  const runAsync = async () => {
    Promise.all(
      users.map(async (user) => {
        const userLocation = await fetchLocation(user);
        //console.log(userLocation)
        userLocations.push(userLocation);
      })
    )
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

  runAsync();
  this.setState({userLocations: userLocations});

}

sortByDistance() {
  if (this.props.currentUser.location) {
    var currentLocation = this.props.currentUser.location;
    var tupleList = [];
    this.props.posts.map((post) => {
      var tuple = [post._id, post.user];
      tupleList.push(tuple);
     })
  this.state.userLocations.map((l) => console.log(l))

    //console.log(tupleList);
  } else {
    // ?
    console.log('~ERROR - CURRENTUSER LOCATION UNDEFINED ~');
  }


}

*/