export const UPDATE_SOLAR_DATA = 'UPDATE_SOLAR_DATA';
export const RESET_SOLAR_DATA = 'RESET_SOLAR_DATA';

import {mergeObjects} from "../utils"

export const initialSolarDataState = {
    place_id: null,
    formatted_address: null,
    lat: null,
    lng: null,
    address_components: null,
    url: null,
};

export const solarData = (state = initialSolarDataState, action) => {
    switch (action.type) {
        case UPDATE_SOLAR_DATA:
            return mergeObjects(state, action.payload);
        case RESET_SOLAR_DATA:
            return initialSolarDataState;
        default:
            return state;
    }
};

// Actions

export const updateSolarData = (payload) => ({
        type: UPDATE_SOLAR_DATA,
        payload,
});

export const resetSolarData = () => {

    return (
        {
            type: RESET_SOLAR_DATA,
        })
};