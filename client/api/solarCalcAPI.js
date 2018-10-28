import { fetchJsonp } from 'fetch-jsonp'

export const solarCalcAPI = (payload) => {
  return fetch('/api/solar_calc/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  }).then(response => {
      return response.json();
    })
    .catch(error => {
      throw error;
    })
};