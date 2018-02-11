import { combineReducers } from 'redux';

import { auth } from './authReducer'
import { authenticatedResourceData } from './authenticedResourceReducer'
import { tenderList } from "./tenderReducer"

const rootReducer = combineReducers({
  auth,
  authenticatedResourceData,
  tenderList
});

export default rootReducer;