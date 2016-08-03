import { takeEvery } from 'redux-saga'
import { call, put, fork, push } from 'redux-saga/effects'
import { push as routerpush } from 'react-router-redux'
import Api from '../api'

// worker Saga: will be fired on LOCATIONS_GET_REQUESTED actions
function* fetchLocations(action) {
  try {
    const data = yield call(Api.locations, action.search)
    yield put({type: 'LOCATIONS_GET_SUCCEEDED', locations: data})
  } catch (e) {
    yield put({type: 'LOCATIONS_GET_FAILED', message: e.message})
  }
}
// worker Saga: will be fired on LOCATION_DETAILS_GET_REQUESTED actions
function* fetchLocationDetails(action) {
  function latLng(data){
    let {lat, lng} = data.result.geometry.location
    return lat + ', ' + lng
  }
  try {
    const data = yield call(Api.location_details, action.placeid)
    yield put({type: 'LOCATION_DETAILS_GET_SUCCEEDED', details: data})
    yield put(routerpush('/weather/' + latLng(data)))
  } catch (e) {
    console.error(e)
    yield put({type: 'LOCATION_DETAILS_GET_FAILED', message: e.message})
  }
}

// worker Saga: will be fired on WEATHER_GET_REQUESTED actions
function* fetchWeather(action) {
  try {
    const data = yield call(Api.weather, action.latlng)
    yield put({type: 'WEATHER_GET_SUCCEEDED', weather: data})
  } catch (e) {
    yield put({type: 'WEATHER_GET_FAILED', message: e.message})
  }
}

function* sagas() {
  yield fork(takeEvery, 'LOCATIONS_GET_REQUESTED', fetchLocations)
  yield fork(takeEvery, 'LOCATION_DETAILS_GET_REQUESTED', fetchLocationDetails)
  yield fork(takeEvery, 'WEATHER_GET_REQUESTED', fetchWeather)
}

export default sagas
