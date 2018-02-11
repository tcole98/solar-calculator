export const TENDER_LIST_REQUEST = 'TENDER_LIST_REQUEST';
export const TENDER_LIST_SUCCESS = 'TENDER_LIST_SUCCESS';
export const TENDER_LIST_FAILURE = 'TENDER_LIST_FAILURE';

export const initialState = {
  isRequesting: false,
  data: null,
  error: null
};

export const tenderList = (state = initialState, action) => {
  switch (action.type) {
    case TENDER_LIST_REQUEST:
      return {...state, isRequesting: true, error: null};
    case TENDER_LIST_SUCCESS:
      return {...state, isRequesting: false, data: action.tenderListRequestResult.tenders};
    case TENDER_LIST_FAILURE:
      return {...state, isRequesting: false, error: action.error || 'unknown error'};
    default:
      return state;
  }
};

export const tenderListRequest = () => (
  {
    type: TENDER_LIST_REQUEST
  }
);