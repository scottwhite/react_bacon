
export function locationChange(evnt, args){
  console.log(args);
  if (evnt.charCode == 13){
    let search = evnt.target.value;
    return{
      type: 'LOCATIONS_GET_REQUESTED',
      search
    }
  }
  return { type: 'NOTHING' }
}

export function weatherFor(placeid){
  return {
    type: 'LOCATION_DETAILS_GET_REQUESTED',
    placeid
  }
}
