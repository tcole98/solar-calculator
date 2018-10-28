import { fetchJsonp } from 'fetch-jsonp'
import {generateQueryString} from '../utils'

export const checkAddressAPI = (query) => {
  const query_string = generateQueryString(query);
  return fetch(`/api/building/${query_string}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET',
  }).then(response => {
      return response.json();
    })
    .catch(error => {
      throw error;
    })
};