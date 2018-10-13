import { combineReducers } from 'redux';

import { solarCalc } from "./solarCalcReducer"
import { solarData } from './solarDataReducer'

const rootReducer = combineReducers({
  solarCalc,
  solarData
});

export default rootReducer;