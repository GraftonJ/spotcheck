import store from '../store';

const RADIUS_SEARCH = 1000;

const config = {
  headers: { Authorization: 'Bearer VkRXEkxkuMiPqFY3xuJdHIMU3ggnwWrKaeCdL-cMm5Mh0q_b-OyMhmdZDMf8xSrbV0BPdAaPtu0aVY2vlHRCQ1JZzFl0N-ahFSjwDY16uAvQ0YviTfxrydO32n6dW3Yx' },
  params: {
    term: 'dog+friendly+restaurants',
  },
};

const API = 'https://api.yelp.com/v3/businesses/search';


/* *********************************************************
getResults()
@param location (string) ex: "Boulder, CO"
@return array of Yelp businesses with lots of fields!
************************************************************ */
export const getResults = async (location) => {
  config.params.location = location;
  console.log("api::getResults() for: ", location);
  const response = await fetch(`${API}?term=${config.params.term}&location=${location}`, config);
  const json = await response.json();
  return json.businesses;
};

/* *********************************************************
getResultsLatLon()
@param lat (number)
@param lon (number)
@return array of Yelp businesses with lots of fields!
// Example lat/lon for Galvanize"
//    latitude=40.016516
//    longitude=-105.281656
// Addl params sent to Yelp
//    sort_by=distance
//    radius=1000
************************************************************ */
export const getResultsLatLon = async (lat, lon, radius) => {
  // config.params.location = location;
  const response = await fetch(`${API}?term=${config.params.term}&latitude=${lat}&longitude=${lon}&sort_by=distance&radius=${radius}`, config);
  const json = await response.json();
  return json.businesses;
};

/* *********************************************************
getResultsCurrentLocation()
@param location (string) ex: "Boulder, CO"
@return array of Yelp businesses with lots of fields!
************************************************************ */
export const getResultsCurrentLocation = async () => {
  // config.params.location = location;
  // console.log("api::getResults() for: ", location);
  // const response = await fetch(`${API}?term=${config.params.term}&location=${location}`, config)
  // const json = await response.json();
  // return json.businesses;

  try {
    // const locationsByCity = await getResults('Boulder, CO');
    // Galvanize: (40.016516, -105.281656);
    // Avery (40.0625629,-105.2047427);
    const promise0 = getResults('Boulder, CO');
    const promise1 = getResultsLatLon(40.016516, -105.281656, RADIUS_SEARCH);
    // const promise1 = getResultsLatLon(40.0625629,-105.2047427, RADIUS_SEARCH);
    const aResults = await Promise.all([promise0, promise1]);
    const locationsByCity = aResults[0];
    const locationsByLatLon = aResults[1];
    console.log('locations city: ', locationsByCity);
    console.log('locations latlon: ', locationsByLatLon);

    const candidateLocations = [];

    for (const locationByLatLon of locationsByLatLon) {
      if (locationsByCity.find(locationByCity => locationByCity.id === locationByLatLon.id)) {
        candidateLocations.push(locationByLatLon);
      }
    }
    return candidateLocations;
  } catch (error) {
    console.log("ERROR api::getResultsCurrentLocation(): ", error);
  }
};
