import { take, fork, put, takeEvery, call, all, cancelled, cancel, race} from 'redux-saga/effects'

import { solarCalcAPI } from '../api/solarCalcAPI'

import {
  SOLAR_CALC_REQUEST,
  SOLAR_CALC_SUCCESS,
  SOLAR_CALC_FAILURE,
} from '../reducers/solarCalcReducer';

function* newSolarCalc({place_id, address, location_lat, location_lng, address_components, roof_area}) {
    try {
        const result = yield call(solarCalcAPI, place_id, address, location_lat, location_lng, address_components, roof_area);
        if (result.status === 'success') {
          yield put({type: SOLAR_CALC_SUCCESS, result});
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