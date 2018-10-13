import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import SearchBoxComponent from './searchBox.jsx'

import { updatePlaceId, updateFormattedAddress, updateLocationLat, updateLocationLng } from '../reducers/solarDataReducer'


const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      updatePlaceId: (place_id) => dispatch(updatePlaceId(place_id)),
      updateFormattedAddress: (formatted_address) => dispatch(updateFormattedAddress(formatted_address)),
      updateLocationLat: (location_lat) => dispatch(updateLocationLat(location_lat)),
      updateLocationLng: (location_lng) => dispatch(updateLocationLng(location_lng)),
  };
};

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
       loading: true,
    };
  }

  render() {
      return(
          <WrapperDiv>
              <Overlay>
                  <Title>Discover your solar savings — instantly.</Title>

                  <SearchBoxComponent />

              </Overlay>
          </WrapperDiv>
      )
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

const WrapperDiv = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    background-image: url('static/media/background.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center; 
`;

const Overlay = styled.div`
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;
`;

const Title = styled.h1`
    text-align: center;
    color: #FFF;
    @media (min-width: 992px) {
    font-weight: 800;
    line-height: 70px;
    font-size: 40px;
    }
`;