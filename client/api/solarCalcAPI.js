import { fetchJsonp } from 'fetch-jsonp'

export const solarCalcAPI = (place_id, address, location_lat, location_lng, address_components, roof_area) => {
  return fetch('/api/solar_calc/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
        place_id: place_id,
        address: address,
        location_lat: location_lat,
        location_lng: location_lng,
        address_components: address_components,
        roof_area: roof_area,
    })
  }).then(response => {
      return response.json();
    })
    .catch(error => {
      throw error;
    })
};