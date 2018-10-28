import { combineReducers } from 'redux';

import { solarCalc } from "./solarCalcReducer"
import { solarData } from './solarDataReducer'
import { checkAddress} from "./checkAddressReducer";

const rootReducer = combineReducers({
  solarCalc,
  solarData,
  checkAddress,
});

export default rootReducer;