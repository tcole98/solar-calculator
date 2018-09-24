import { combineReducers } from 'redux';

import { authenticatedResourceData } from './authenticedResourceReducer'
import { tenderList } from "./tenderReducer"

const rootReducer = combineReducers({
  authenticatedResourceData,
  tenderList
});

export default rootReducer;