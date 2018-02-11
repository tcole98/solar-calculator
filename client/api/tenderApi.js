import { getToken } from './authApi'

const handle_response = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw response
};

//Auth API Call
export const requestTenderListApi= () => {
  return fetch('/api/tender/' , {
    headers: {
      'Authorization': getToken()
    },
    method: 'get'
    })
    .then(response => {
      return handle_response(response)
    })
    .catch(error => {
      throw error;
    })
};