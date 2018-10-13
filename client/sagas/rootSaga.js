import { all } from 'redux-saga/effects'

import newSolarCalcSaga from './solarCalcSaga'


export default function* rootSaga() {
  yield all([
      newSolarCalcSaga(),
  ])
}

