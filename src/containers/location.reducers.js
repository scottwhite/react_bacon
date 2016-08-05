const defaultState = {
  location: {
    locations: [],
    error: {}
  }
}

export default function locations(state = defaultState, action) {
  switch(action.type) {
    case 'LOCATIONS_GET_SUCCEEDED':
      return {...state, locations: action.locations.predictions}
    case 'LOCATION_DETAILS_GET_SUCCEEDED':
      let {lat, lng} = action.details.result.geometry.location
      let latlng = lat + ', ' + lng
      let placeid = action.details.result.id
      return {...state, placeid, latlng};
    case 'LOCATIONS_GET_FAILED':
      console.error(action.message)
      return {...state, error: action.message}
    default:
      return defaultState;
  }
}
