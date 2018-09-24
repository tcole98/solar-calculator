import React from 'react';

export default class LoadingSpinner extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
        }
    }

    render() {
        return(
          <div className="spinner" id="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        )
    }
}