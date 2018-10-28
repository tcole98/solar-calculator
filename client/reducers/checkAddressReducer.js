export const CHECK_ADDRESS_REQUEST = 'CHECK_ADDRESS_REQUEST';
export const CHECK_ADDRESS_SUCCESS = 'CHECK_ADDRESS_SUCCESS';
export const CHECK_ADDRESS_FAILURE = 'CHECK_ADDRESS_FAILURE';

export const initialCheckAddressState = {
  isRequesting: false,
  success: false,
  error: null,
};

export const checkAddress = (state = initialCheckAddressState, action) => {
  switch (action.type) {
    case CHECK_ADDRESS_REQUEST:
      return {...state, isRequesting: true};
    case CHECK_ADDRESS_SUCCESS:
      return {
          ...state,
          isRequesting: false,
          success: true,
      };
    case CHECK_ADDRESS_FAILURE:
      return {...state, isRequesting: false, success: false, error: action.error || 'unknown error'};
    default:
      return state;
  }
};

// Actions
export const checkAddressRequest = (payload) => (
    {
        type: CHECK_ADDRESS_REQUEST,
        payload
    }
);