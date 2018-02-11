import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { loginRequest, logout } from '../reducers/authReducer'

import AuthenticatedResource from './authenticatedResourceButton.jsx'
import LoadDataWrapper from './LoadDataWrapper.jsx'
import TenderTable from './tenderTable.jsx'
import {tenderList, tenderListRequest} from "../reducers/tenderReducer";


const mapStateToProps = (state) => {
  return {
    loggedIn: (state.auth.token !== null),
    resourceData: state.authenticatedResourceData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: () => dispatch(loginRequest()),
    logout:       () => dispatch(logout()),
    tenderListRequest: () => dispatch(tenderListRequest()),
  };
};


const HomePage = ({loginRequest, logout, loggedIn, resourceData, tender_list, tenderListRequired}) => {

    if (loggedIn) {
        var button = (
            <Button onClick={logout}>
                Logout
            </Button>
        )
    } else {
        var button = (
            <Button onClick={loginRequest}>
                Login
            </Button>
        )
    }

    if (tenderListRequired) {
        var tenders = (
            <div>
                Loading...
            </div>
        )
    } else {
        var tenders = (
            <TenderTable/>
        )
    }

    if (tenderListRequest.isRequesting) {
        var dataMessage = 'Loading...'
    } else if (tenderListRequest.error) {
        dataMessage = tenderListRequest.error
    } else if (tenderListRequest.data) {
        dataMessage = tenderListRequest.data
    } else {
        dataMessage = ''
    }

    if (loggedIn) {
        return (
                <WrapperDiv>
                    {button}
                    <LoadDataWrapper>
                        <TenderTable/>
                    </LoadDataWrapper>
                </WrapperDiv>
        )
    } else {
      return (
          <WrapperDiv>
            <h1>Not TenderMarket</h1>
              {button}
          </WrapperDiv>
      );
  }

};

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

