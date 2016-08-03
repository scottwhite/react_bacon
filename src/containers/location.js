import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Places } from '../components/places/places'

export const locationActions = {
  locationChange(evnt){
    if (evnt.charCode == 13){
      let search = evnt.target.value;
      return{
        type: 'LOCATIONS_GET_REQUESTED',
        search
      }
    }
    return { type: 'NOTHING' }
  },
  locationDetails(placeid){
    return {
      type: 'LOCATION_DETAILS_GET_REQUESTED',
      placeid
    }
  },
  weatherFor(latlng){
    let path = '/weather/' + latlng
    return {
      type: 'ROUTE_TO',
      path
    }
  }
}

class Location extends Component {
  render() {
    const {error, locations, locationDetails, locationChange} = this.props;
    let err;
    if(error){
      err = (<div className='alert alert-danger'>{error}</div>)
    }
    return (
      <div className='container-fluid'>
        {err}
        <div>Search for a place for weather</div>
        <input onKeyPress={locationChange} />
        <Places locations={locations || []} onSelected={locationDetails} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { locations, error } = state.location;
  return {
    locations,
    error
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(locationActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location);
