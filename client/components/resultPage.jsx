import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Map from './mapPage.jsx'
import ResultsContent from './resultsContent.jsx'

import { newSolarCalc } from '../reducers/solarCalcReducer'


const mapStateToProps = (state) => {
  return {
      solarCalc: state.solarCalc,
      solarData: state.solarData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      newSolarCalc: (payload) => dispatch(newSolarCalc(payload)),
  };
};

class ResultPage extends React.Component {
  constructor() {
    super();
    this.state = {
       loading: true,
       results: false,
       isRequesting: false,
    };
  }

  solarCalcRequest(area) {
      this.props.newSolarCalc({
          place_id: this.props.solarData.place_id,
          address: this.props.solarData.address,
          location_lat: this.props.solarData.location_lat,
          location_lng: this.props.solarData.location_lng,
          address_components: this.props.solarData.address_components,
          roof_area: area,
      })
  }

  render() {
      if (this.props.solarCalc.success) {
          var mapStyle = {height: '70vh'};

          var loadingSpinner = null;

          var darkOverlay = <DarkOverlay />;
          var lightOverlay = <LightOverlay />;

          var results = <ResultsContent styleProps={null} />;

      } else if (this.props.solarCalc.isRequesting) {
          mapStyle = null;
          loadingSpinner = <div className="spinner" style={{zIndex: 2, position: 'absolute', top: '50%', margin: 'auto'}}>
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>;
          darkOverlay = <DarkOverlay style={{zIndex: 1}} />;
          lightOverlay = null;
          results = <ResultsContent styleProps={{display: 'none', visibility: 'hidden', opacity: 0}} />;

      } else {
          mapStyle = null;
          loadingSpinner = null;
          darkOverlay = <DarkOverlay style={{visibility: 'hidden', opacity: 0}} />;
          lightOverlay = <LightOverlay style={{visibility: 'hidden', opacity: 0}} />;
          results = <ResultsContent styleProps={{display: 'none', visibility: 'hidden', opacity: 0}} />;
      }

      var displayMapHeader = this.props.solarCalc.success ? {display: 'none'} : null;

      return(
          <WrapperDiv>
              <div style={mapStyle}>
                  <Map styleProps={displayMapHeader} resultRequest={(area) => this.solarCalcRequest(area)} />
                  {loadingSpinner}
                  {darkOverlay}
                  {lightOverlay}
              </div>
              {results}
          </WrapperDiv>
      )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);

const WrapperDiv = styled.div`
    width: 100vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
`;

const DarkOverlay = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    visibility: visible;
    opacity: 1;
    transition: opacity .15s linear;
`;

const LightOverlay = styled.div`
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
    position: absolute;
    top: calc(70vh - 20vh);
    width: 100%;
    height: 20vh;
    visibility: visible;
    opacity: 1;
    transition: opacity .15s linear;
`;