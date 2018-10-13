const { compose, withProps } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} = require("react-google-maps");
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");


import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';



const mapStateToProps = (state) => {
  return {
      solarData: state.solarData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const MapWithADrawingManager = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCT7EJv-t4u_4-nlEH_7p9Z6ymS3pxx6Ok&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={20}
    defaultCenter={new google.maps.LatLng(props.location_lat, props.location_lng)}
    mapTypeId={google.maps.MapTypeId.SATELLITE}
    defaultOptions={{disableDefaultUI: true}}
  >
    <DrawingManager
      drawingMode={props.drawingMode === true ? google.maps.drawing.OverlayType.POLYGON : null}
      defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
      defaultOptions={{
        drawingControl: false,
        polygonOptions: {
            strokeWeight: 0,
            fillOpacity: 0.65,
            editable: true,
            fillColor: '#76d33a'
        },
      }}
      onOverlayComplete={(e) => props.calculateArea(e)}
    />
  </GoogleMap>
);

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
       loading: true,
       drawingMode: true,
    };
  }

  calculateArea(e) {
    var area = google.maps.geometry.spherical.computeArea(e.overlay.getPath());
    console.log(area);
    this.props.resultRequest(area);
  }

  render() {
      return(
          <WrapperDiv>
              <ResultTitle style={this.props.styleProps}>Calculate Your Roof Area</ResultTitle>
              <MapWithADrawingManager location_lat={this.props.solarData.location_lat} location_lng={this.props.solarData.location_lng} drawingMode={this.state.drawingMode} calculateArea={(e) => this.calculateArea(e)} />
          </WrapperDiv>
      )
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Map);

const WrapperDiv = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
`;

const ResultTitle = styled.h1`
    text-align: center;
    z-index: 1;
    top: 0;
    color: #FFF;
    background-color: #0000007d;
    padding: 0 1em;
    position: absolute;
    @media (min-width: 992px) {
    font-weight: 800;
    line-height: 70px;
    font-size: 40px;
    }
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

const CountryAvailability = styled.p`
    color: #FFF;
    text-align: center;
`;

const SearchBox = styled.div`
    width: 90%;
    height: 70px;
    background: #FFF;
    border-radius: 10px;
    align-items: center;
    display: flex;
    padding-left: 20px;
    flex-direction: row;
    box-shadow: 0 2px 15px #00000045;
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
    border-radius: 0 10px 10px 0;
    color: #FFF;
    font-weight: 500;
    width: 25%;
`;