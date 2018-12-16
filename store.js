/* store.js
   Simple app-wide data store (Redux-lite)
*/

export const URI = "http://localhost:3000";

let state = {

  // Search location set by homepage
  // Used to load the list of locations in Results
  searchFor: "Boulder, CO",

  // Locations set by Results after locations loaded from Yelp
  /* [
      {
        yelpId: 'DFGET5fgHGT43fg',
        name: 'Eureka',
        tbd....
      },
      { ... },
     ]
  */
  locations: [],

  // set by Results when clicking to get details for a location
  locationForDetail: '',

  // Location user has checked in to
  isCheckedIn: false,
  checkinLocationId: '',
  checkinLocationName: '',

  // Logged in user set by Login
  // Null when user is not logged in
  /* { id: 2,
       name: "Jane Doe",
       email: "jd@gmail.com",
       dogNames: "Sparky and Tilde",
     } */
  // user: null,
  // // convenience flag that is kept in sync with "user" key by Login
  // isLoggedIn: false,

  // TODO: reset these to the above so app doesn't strat logged in
  user:  { id: 2,
         name: "Jane Doe",
         email: "jd@gmail.com",
         dogNames: "Sparky and Tilde",
       },
  // convenience flag that is kept in sync with "user" key by Login
  isLoggedIn: true,


  // Global error state
  // Not sure if this will be used
  error: false,
};

let listeners = [];

export default {
  getState() {
    return state;
  },
  setState(newState) {
    state = { ...state, ...newState };
    console.log("---------------- store::setState ----------------------");
    console.log("Adding: ", newState);
    console.log("-------------------------------------");
    console.log("New store: ", state);
    console.log("-------------------------------------");
    console.log("Listener count: ", listeners.length);
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    listeners.forEach(listener => listener());
  },
  onChange(newListener) {
    listeners.push(newListener);
    // console.log("---------- store::AddListener ----------------------");
    // console.log("Listener count: ", listeners.length);
    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    // returns function to remove listener from list
    return () => {
      listeners = listeners.filter(listener => listener !== newListener);
    }
    // ORIGINAL CODE DIDN'T REMOVE LISTENERS! return () => listeners.filter(listener => listener !== newListener);
  },
};
