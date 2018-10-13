const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
} = require("react-google-maps");
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { browserHistory } from "../main.jsx";

import {
    updatePlaceId, updateFormattedAddress, updateLocationLat, updateLocationLng,
    updateAddressComponents
} from '../reducers/solarDataReducer'

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCT7EJv-t4u_4-nlEH_7p9Z6ymS3pxx6Ok&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div className="spinner">
  <div className="bounce1"></div>
  <div className="bounce2"></div>
  <div className="bounce3"></div>
</div>,
    containerElement: <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => this.props.onPlacesChanged(refs.searchBox.getPlaces()),
      })
    },
  }),
  withScriptjs
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
      loadMap={props.loadMap}
    >
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'calc(100vw - 20px)'}} >
          <SearchBox>
              <SearchInput
                type="text"
                placeholder="Enter your address..."
              />
              <SearchButton onClick={() => props.loadMap()}>
                  Get Started
              </SearchButton>
          </SearchBox>
      </div>
    </StandaloneSearchBox>
    <CountryAvailability>
        Available in: 🇦🇺 🇺🇸
    </CountryAvailability>
    {/*<ol>*/}
      {/*{props.places.map(({ place_id, formatted_address, geometry: { location } }) =>*/}
        {/*<li key={place_id}>*/}
          {/*{formatted_address}*/}
          {/*{" at "}*/}
          {/*({location.lat()}, {location.lng()})*/}
        {/*</li>*/}
      {/*)}*/}
    {/*</ol>*/}
  </div>
);

const mapStateToProps = (state) => {
  return {
      solarData: state.solarData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      updatePlaceId: (place_id) => dispatch(updatePlaceId(place_id)),
      updateFormattedAddress: (formatted_address) => dispatch(updateFormattedAddress(formatted_address)),
      updateLocationLat: (location_lat) => dispatch(updateLocationLat(location_lat)),
      updateLocationLng: (location_lng) => dispatch(updateLocationLng(location_lng)),
      updateAddressComponents: (location_lng) => dispatch(updateAddressComponents(location_lng)),
  };
};


class SearchBoxComponent extends React.Component {
    constructor() {
    super();
    }

    loadMap() {
        if (this.props.solarData.place_id !== null) {
            browserHistory.push('/map')
        } else {
            console.log('no data!')
        }
    }

    loadAddressComponents(place) {
      const componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

      const addressDetails = {
        street_number: '',
        route: '',
        locality: '',
        administrative_area_level_1: '',
        country: '',
        postal_code: ''
      };

      for (let i = 0; i < place.address_components.length; i++) {
          let addressType = place.address_components[i].types[0];
          if (componentForm[addressType]) {
              addressDetails[addressType] = place.address_components[i][componentForm[addressType]];
          }
      }
      this.props.updateAddressComponents(addressDetails);
    }

    onPlacesChanged(places) {
      this.loadAddressComponents(places[0]);
      places.map(({ place_id, formatted_address, geometry: { location } }) => {
        this.props.updatePlaceId(place_id),
        this.props.updateFormattedAddress(formatted_address),
        this.props.updateLocationLat(location.lat()),
        this.props.updateLocationLng(location.lng())},
      )
    }

    render() {
        return(
            <PlacesWithStandaloneSearchBox loadMap={() => this.loadMap()} onPlacesChanged={places => this.onPlacesChanged(places)} />
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBoxComponent);

const CountryAvailability = styled.p`
    color: #FFF;
    text-align: center;
`;

const SearchBox = styled.div`
    max-width: 850px;
    width: 90%;
    height: 70px;
    background: #FFF;
    border-radius: 2px;
    align-items: center;
    display: flex;
    padding-left: 20px;
    flex-direction: row;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    justify-content: space-between;
    @media (min-width: 425px) {
    width: 60%;
    }
`;

const SearchInput = styled.input`
    color: #76d33a;
    font-size: 16px;
    width: 75%;
    height: 100%;
    padding: 0;
    margin: 0;
    border: 0;
    text-shadow: 0px 0px 0px #000;
    -webkit-text-fill-color: transparent;
`;

const SearchButton = styled.div`
    height: inherit;
    justify-content: center;
    align-items: center;
    display: flex;
    background-color: #79D146;
    padding: 0 10px;
    border-radius: 0 2px 2px 0;
    color: #FFF;
    font-weight: 500;
    width: 25%;
    &:hover {
    background-color: #6ec735;
    transition: background-color 0.2s ease 0s;
    }
`;