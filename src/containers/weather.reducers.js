
const defaultState = {
  weather: {},
  error: null
}

export default function images(state = defaultState, action) {
  switch(action.type) {
    case 'WEATHER_GET_SUCCEEDED':
      return {...state, weather: action.weather.daily}
    case 'WEATHER_GET_FAILED':
      console.error(action.message)
      return {...state, error: action.message}
    default:
      return defaultState;
  }
}
