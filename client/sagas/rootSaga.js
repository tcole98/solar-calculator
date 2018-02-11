import { all } from 'redux-saga/effects'

import authSagas from './authSagas'
import authenticatedResourceSagas from './authenticatedResourceSagas'
import tenderSagas from './tenderSagas'


export default function* rootSaga() {
  yield all([
    authSagas(),
    authenticatedResourceSagas(),
    tenderSagas(),
  ])
}

