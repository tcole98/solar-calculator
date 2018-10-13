export const UPDATE_PLACE_ID = 'UPDATE_PLACE_ID';
export const UPDATE_FORMATTED_ADDRESS = 'UPDATE_FORMATTED_ADDRESS';
export const UPDATE_LOCATION_LAT = 'UPDATE_LOCATION_LAT';
export const UPDATE_LOCATION_LNG = 'UPDATE_LOCATION_LNG';
export const RESET_SOLAR_DATA = 'RESET_SOLAR_DATA';
export const UPDATE_ADDRESS_COMPONENTS = 'UPDATE_ADDRESS_COMPONENTS';

export const initialSolarDataState = {
    place_id: null,
    formatted_address: null,
    location_lat: null,
    location_lng: null,
    address_components: null,
};

export const solarData = (state = initialSolarDataState, action) => {
    switch (action.type) {
        case UPDATE_PLACE_ID:
            return {...state, place_id: action.place_id, };
        case UPDATE_FORMATTED_ADDRESS:
            return {...state, formatted_address: action.formatted_address};
        case UPDATE_LOCATION_LAT:
            return {...state, location_lat: action.location_lat};
        case UPDATE_LOCATION_LNG:
            return {...state, location_lng: action.location_lng};
        case UPDATE_ADDRESS_COMPONENTS:
            return {...state, address_components: action.address_components};
        case RESET_SOLAR_DATA:
            return initialSolarDataState;
        default:
            return state;
    }
};

// Actions

export const updateAddressComponents = (address_components) => {
    return (
        {
            type: UPDATE_ADDRESS_COMPONENTS,
            address_components: address_components
        })
};

export const updatePlaceId = (place_id) => {
    return (
        {
            type: UPDATE_PLACE_ID,
            place_id: place_id
        })
};

export const updateFormattedAddress = (formatted_address) => {
    return (
        {
            type: UPDATE_FORMATTED_ADDRESS,
            formatted_address: formatted_address
        })
};

export const updateLocationLat = (location_lat) => {

    return (
        {
            type: UPDATE_LOCATION_LAT,
            location_lat: location_lat
        })
};

export const updateLocationLng = (location_lng) => {

    return (
        {
            type: UPDATE_LOCATION_LNG,
            location_lng: location_lng
        })
};

export const resetSolarData = () => {

    return (
        {
            type: RESET_SOLAR_DATA,
        })
};