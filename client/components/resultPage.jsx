import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Map from './mapPage.jsx'
import ResultsContent from './resultsContent.jsx'

import { newSolarCalc } from '../reducers/solarCalcReducer'
import {checkAddressRequest} from "../reducers/checkAddressReducer";
import LoadingSpinner from "./loadingSpinner.jsx";


const mapStateToProps = (state) => {
  return {
      checkAddress: state.checkAddress,
      solarCalc: state.solarCalc,
      solarData: state.solarData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      checkAddressRequest: (payload) => dispatch(checkAddressRequest(payload)),
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

  componentDidMount() {
      if (!this.props.solarCalc.success) {
          let pathnames = location.pathname.split('/');

          this.props.checkAddressRequest({
              url: pathnames[pathnames.length - 1]
          })
      }
  }

  render() {
      var displayMapHeader = this.props.solarCalc.success ? {display: 'none'} : null;

      if (this.props.checkAddress.success || this.props.solarCalc.success) {
          return (
              <WrapperDiv>
                  <div style={{height: '70vh'}}>
                      <Map styleProps={displayMapHeader} resultPage={true}/>
                      <DarkOverlay/>
                      <LightOverlay/>
                      <FormattedAddress><Pin src="/static/media/circle.svg"/>{this.props.solarData.formatted_address}
                      </FormattedAddress>
                  </div>
                  <ResultsContent styleProps={null}/>
              </WrapperDiv>
          )
      }

      return(
          <LoadingSpinner color={"#607d8b"} message={'Checking for address'}/>
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

const FormattedAddress = styled.p`
    font-size: 13px;
    position: absolute;
    top: 0;
    padding: 1em 2em;
    color: #FFF;
    font-weight: 500;
    display: flex;
    line-height: 27px;
`;

const Pin = styled.img`
    height: 25px;
    padding: 0 1em 0 0;
`;