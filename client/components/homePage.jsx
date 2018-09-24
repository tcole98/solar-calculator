import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {tenderList, tenderListRequest} from "../reducers/tenderReducer";
import LoadingSpinner from "./loadingSpinner.jsx";


const mapStateToProps = (state) => {
  return {
    resourceData: state.authenticatedResourceData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tenderListRequest: () => dispatch(tenderListRequest()),
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
              <p>Hello</p>
          </WrapperDiv>
      )
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

const WrapperDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const Button = styled.button`
    border: none;
    outline: none;
    white-space: nowrap;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding: 0 14px;
    box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
    border-radius: 4px;
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .025em;
    text-decoration: none;
    transition: all .15s ease;
    color: #fff;
    background: #3ecf8e;
    text-shadow: 0 1px 3px rgba(36,180,126,.4);
    &:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
    }
    &:active {
    transform: translateY(1px);
    box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
    }
`;

const Message = styled.div`
  margin: 1em;
`;

