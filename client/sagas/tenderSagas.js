import { take, fork, put, takeEvery, call, all, cancelled, cancel, race} from 'redux-saga/effects'

import {
  TENDER_LIST_REQUEST,
  TENDER_LIST_SUCCESS,
  TENDER_LIST_FAILURE
} from '../reducers/tenderReducer.js';

import { requestTenderListApi } from '../api/tenderApi.js'

function* tenderListRequest() {
  try {
    const tenderListRequestResult = yield call(requestTenderListApi);
    yield put({type: TENDER_LIST_SUCCESS, tenderListRequestResult});
  } catch (error) {
    yield put({type: TENDER_LIST_FAILURE, error: error.statusText})
  }
}

function* watchTenderListRequest() {
  yield takeEvery(TENDER_LIST_REQUEST, tenderListRequest);
}


export default function* tenderSagas() {
  yield all([
    watchTenderListRequest()
  ])
}