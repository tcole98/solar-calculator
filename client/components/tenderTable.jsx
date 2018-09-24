import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { loginRequest, logout } from '../reducers/authReducer'

const mapStateToProps = (state) => {
  return {
    tender_list: state.tenderList.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tenderListRequest: () => dispatch(tenderListRequest()),
  };
};

class TenderTable extends React.Component {
    render() {
        console.log(this.props.tender_list);
        return (
            <table style={{width: '100%'}}>
                <tr>
                    <th>Title</th>
                    <th>Sector</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Budget</th>
                </tr>
                {this.props.tender_list.map((tender) => {
                    return (
                      <tr>
                          <td>{tender.title}</td>
                          <td>{tender.sector}</td>
                          <td>{tender.city}</td>
                          <td>{tender.state}</td>
                          <td>{tender.budget}</td>
                      </tr>
                    )
                })}
            </table>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TenderTable);