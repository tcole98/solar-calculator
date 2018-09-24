import { all } from 'redux-saga/effects'

import authenticatedResourceSagas from './authenticatedResourceSagas'
import tenderSagas from './tenderSagas'


export default function* rootSaga() {
  yield all([
    authenticatedResourceSagas(),
    tenderSagas(),
  ])
}

