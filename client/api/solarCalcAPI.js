import { fetchJsonp } from 'fetch-jsonp'

export const solarCalcAPI = (formatted_address, place_id, address, location_lat, location_lng, address_components, roof_area, roof_lat_lng) => {
  return fetch('/api/solar_calc/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
        formatted_address: formatted_address,
        place_id: place_id,
        address: address,
        location_lat: location_lat,
        location_lng: location_lng,
        address_components: address_components,
        roof_area: roof_area,
        roof_lat_lng: roof_lat_lng
    })
  }).then(response => {
      return response.json();
    })
    .catch(error => {
      throw error;
    })
};