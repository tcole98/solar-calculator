import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import SearchBoxComponent from './searchBox.jsx'


const mapStateToProps = (state) => {
  return {
      solarData: state.solarData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
      var message = (this.props.solarData.error ? <p style={{position: 'absolute', bottom: 10, color: '#FFF', fontWeight: 500, fontSize: '20px',textAlign: 'center', padding: '0 1em'}}>😢<br/>{this.props.solarData.error}</p> : null);
      return(
        <div>
          <WrapperDiv>
              <Overlay>
                  <Title>Discover your solar savings — instantly.</Title>

                  <SearchBoxComponent />
                  {message}

              </Overlay>
          </WrapperDiv>
          <BottomWrapper>
            <Column>
              <SiteTitle>solarcalculator<span style={{color: '#79D146'}}>.io</span></SiteTitle>
              <SiteDescription>
                Solar calculator exists to help you make the best decision possible when considering solar panels. We instantly calculate your estimated solar power and potential savings based on your usable roof size and tilt, rebates, incentives, electricity rates, and estimated installation costs.
                <br/><br/>
                We use data from <Link href="http://www.bom.gov.au" target="_blank">Australian Bureau of Meteorology</Link>, <Link href="https://openpv.nrel.gov/" target="_blank">Open PV Project</Link> and the <Link href="https://www.eia.gov/" target="_blank">United States Energy Information Administration</Link>.
                <br/><br/>
                Available in United States and Australia.
              </SiteDescription>
            </Column>

            <Column>
              <SiteTitle>Resources</SiteTitle>
              <SiteDescription>
                <Link>
                  How does solar work?
                </Link>
                <br/><br/>
                <Link>
                  Why should I get solar panels?
                </Link>
              </SiteDescription>
            </Column>
          </BottomWrapper>
        </div>
      )
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

const Link = styled.a`
  color: #FFF;
  &:hover {
  color: rgb(121, 209, 70);
  }
`;

const Column = styled.div`
  width: 50%;
  padding: 2em;
  @media (max-width: 425px) {
    width: calc(100% - 4em);
  }
`;

const SiteDescription = styled.p`
  color: #FFF;
`;

const SiteTitle = styled.h2`
    color: #FFF;
    margin: 0;
    @media (min-width: 992px) {
    font-weight: 800;
    line-height: 70px;
    font-size: 20px;
    }
`;

const BottomWrapper = styled.div`
  background-color: #2B333B;
  display: flex;
  @media (max-width: 425px) {
    flex-direction: column;
  }
`;

const WrapperDiv = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    background-image: url('static/media/background.jpg');
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