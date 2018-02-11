import React from 'react';
import { connect } from 'react-redux';

import { tenderListRequest } from '../reducers/tenderReducer'

const mapStateToProps = (state) => {
  return {
    tenderListRequired: (state.tenderList.data == null)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tenderListRequest: () => dispatch(tenderListRequest())
  };
};


class LoadDataWrapper extends React.PureComponent {

  componentDidMount() {
    if (this.props.tenderListRequired) {
      this.props.tenderListRequest();
    }
  }

  render() {
    if (this.props.tenderListRequired) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <div style={{width: '100%'}}>
          {this.props.children}
        </div>
      );
    }


  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadDataWrapper);