import { all } from 'redux-saga/effects'

import newSolarCalcSaga from './solarCalcSaga'
import checkAddressSaga from './checkAddressSaga'


export default function* rootSaga() {
  yield all([
      newSolarCalcSaga(),
      checkAddressSaga(),
  ])
}

