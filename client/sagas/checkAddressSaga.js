import { take, fork, put, takeEvery, call, all, cancelled, cancel, race} from 'redux-saga/effects'

import { checkAddressAPI } from '../api/checkAddressAPI'
import { browserHistory } from '../main.jsx'

import {
    CHECK_ADDRESS_REQUEST,
    CHECK_ADDRESS_SUCCESS,
    CHECK_ADDRESS_FAILURE,
} from '../reducers/checkAddressReducer';
import {SOLAR_CALC_SUCCESS} from "../reducers/solarCalcReducer";
import {UPDATE_SOLAR_DATA} from "../reducers/solarDataReducer";

function* checkAddressRequest({payload}) {
    try {
        const result = yield call(checkAddressAPI, payload);
        if (result.message === 'success') {
          yield put({type: CHECK_ADDRESS_SUCCESS, result});
          yield put({type: SOLAR_CALC_SUCCESS, result});
          let payload = result.building;
          yield put({type: UPDATE_SOLAR_DATA, payload});
          browserHistory.push('/address/' + result.building.url)
        } else if (result.origin === 'place_id') {
          yield put({type: CHECK_ADDRESS_FAILURE, error: result.message});
          browserHistory.push('/map')
        } else {
          yield put({type: CHECK_ADDRESS_FAILURE, error: result.message});
          browserHistory.push('/')
        }
    } catch (error) {
        yield put({type: CHECK_ADDRESS_FAILURE, error: error})
    }
}

function* watchCheckAddress() {
    yield takeEvery(CHECK_ADDRESS_REQUEST, checkAddressRequest);
}

export default function* checkAddressSaga() {
    yield all([
        watchCheckAddress()
    ])
}