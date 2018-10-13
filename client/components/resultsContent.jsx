import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { browserHistory } from "../main.jsx";

import SavingsChart from './savingsChart.jsx'

const mapStateToProps = (state) => {
  return {
      solarCalc: state.solarCalc,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

class ResultsContent extends React.Component {
  constructor() {
    super();
    this.state = {
       loading: true,
       results: false,
    };
  }

  render() {

      if (this.props.solarCalc.isRequesting) {
          return null
      }

      return(
          <ResultsWrapper style={this.props.styleProps}>
                  <ResultTitleWrapper>
                      <ResultTitle>Congrats! You could be saving <span style={{color: '#76d33a'}}>${this.props.solarCalc.yearlyBillSavings}</span> per year!</ResultTitle>
                  </ResultTitleWrapper>

                  <Section>
                      <SubSection>
                          <ResultTitle style={{textAlign: 'left'}}>Long Term Savings</ResultTitle>
                          <p>Solar will save you ${this.props.solarCalc.yearlyBillSavings * 15} over the next 15 years, when compared to electricty without solar.</p>
                      </SubSection>
                      <SubSection>
                          <SavingsChart withSolar={this.props.solarCalc.avgYearlyBillsWithSolarOver15years} withoutSolar={this.props.solarCalc.avgYearlyBillsOver15Years} />
                      </SubSection>
                  </Section>

                  <Section>
                      <SubSection style={{alignItems: 'center', justifyContent: 'center'}}>
                          <img style={{width: 'calc(100% - 6em)', maxWidth: '400px'}} src="/static/media/solar-roof.png" />
                      </SubSection>
                      <SubSection>
                          <ResultTitle style={{textAlign: 'left'}}>Increase Your Homes Value</ResultTitle>
                          <p>Solar panels would increase your homes value by an approximately ${this.props.solarCalc.increaseInHomeValue} in your suburb. People are willing to pay more for green, clean and cheaper energy.</p>
                      </SubSection>
                  </Section>

                  <MainSection style={{height: '130vh'}}>
                      <PlanetImage src="/static/media/planet.png" />
                      <PlanetTitle>Help save the <span style={{color: '#76d33a'}}>planet.</span></PlanetTitle>
                      <p style={{color: '#FFF', margin: '1em', zIndex: 1}}><span style={{color: '#76d33a'}}>{this.props.solarCalc.co2Displaced} Tonnes. </span>That’s how much CO2 you’ll offset over the next 15 years by installing solar panels.</p>
                  </MainSection>

                  <MainSection style={{backgroundColor: '#FFF'}}>
                      <ResultTitle>
                          Ready to save on your bills?
                          <br/>
                          Find solar installers near you.
                      </ResultTitle>

                      <StyledButton href='https://www.google.com.au/search?q=solar+installers+near+me'>
                          Get solar quotes
                      </StyledButton>

                  </MainSection>
          </ResultsWrapper>
      )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResultsContent);

const PlanetImage = styled.img`
    width: 80%;
    max-width: 600px;
    transform: rotate(-90deg);
    margin: -1em;
    position: absolute;
    @media (max-width: 425px) {
    position: relative;
    width: 100%
    }
`;

const PlanetTitle = styled.h1`
    color: #FFF;
    z-index: 1;
    margin: -0.5em 0 0;
    text-align: center;
    visibility: visible;
    opacity: 1;
    transition: opacity .2s linear;
    @media (min-width: 992px) {
    font-weight: 800;
    line-height: 70px;
    font-size: 40px;
    }
    @media (min-width: 425px) {
    margin: 6.5em 0 0;
    }
`;

const StyledButton = styled.a`
    text-decoration: none;
    border-radius: 2px;
    font-size: 16px;
    background-color: #76d33a;
    font-family: Graphik, sans-serif;
    font-weight: 500;
    color: white;
    cursor: pointer;
    margin-top: 12px;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 4px 4px, rgba(0, 0, 0, 0.08) 0px 8px 18px;
    padding: 20px 25px;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    transition: background-color 0.2s ease 0s;
    &:hover {
    background-color: #6ec735;
    transition: background-color 0.2s ease 0s;
    }
`;

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
    height: 70vh;
    visibility: visible;
    opacity: 1;
    transition: opacity .2s linear;
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
    transition: opacity .2s linear;
`;

const ResultsWrapper = styled.div`
    z-index: 1;
    background-color: #fff;
    visibility: visible;
    opacity: 1;
    transition: opacity .2s linear;
`;

const ResultTitleWrapper = styled.div`
    height: 30vh;
    position: relative;
    width: 100%;
    justify-content: center;
    display: flex;
    text-align: left;
    align-items: center;
    visibility: visible;
    opacity: 1;
    transition: opacity .2s linear;
`;

const ResultTitle = styled.h1`
    text-align: center;
    color: #000;
    visibility: visible;
    opacity: 1;
    transition: opacity .2s linear;
    @media (min-width: 992px) {
    font-weight: 800;
    line-height: 70px;
    font-size: 40px;
    }
`;

const Section = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    width: calc(100% - 6em);
    height: 70vh;
    padding: 0 3em;
    justify-content: center;
    align-items: center;
    @media (max-width: 425px) {
    flex-direction: column-reverse;
    height: 100%;
    padding: 5em 1em;
    width: calc(100% - 2em);
    }
`;

const SubSection = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    @media (max-width: 425px) {
    width: 100%;
    }
`;

const MainSection = styled.div`
    height: 100vh;
    width: 100%;
    background-color: #000;
    justify-content: center;
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
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