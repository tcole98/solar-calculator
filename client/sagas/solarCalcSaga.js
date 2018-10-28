import { take, fork, put, takeEvery, call, all, cancelled, cancel, race} from 'redux-saga/effects'

import { solarCalcAPI } from '../api/solarCalcAPI'
import { browserHistory } from '../main.jsx'

import {
  SOLAR_CALC_REQUEST,
  SOLAR_CALC_SUCCESS,
  SOLAR_CALC_FAILURE,
} from '../reducers/solarCalcReducer';

function* newSolarCalc({payload}) {
    try {
        const result = yield call(solarCalcAPI, payload);
        if (result.message === 'success') {
          yield put({type: SOLAR_CALC_SUCCESS, result});
          browserHistory.push('/address/' + result.building.url)
        } else {
          yield put({type: SOLAR_CALC_FAILURE, error: result.message})
        }
    } catch (error) {
        yield put({type: SOLAR_CALC_FAILURE, error: error})
    }
}

function* watchNewSolarCalc() {
    yield takeEvery(SOLAR_CALC_REQUEST, newSolarCalc);
}

export default function* newSolarCalcSaga() {
    yield all([
        watchNewSolarCalc()
    ])
}