import React from 'react';

export default class LoadingSpinner extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
        }
    }

    render() {
        let message = (this.props.message ? <p>{this.props.message}</p> : null);
        return(
            <div className="spinner" style={{zIndex: 2, position: 'absolute', top: '50%', margin: 'auto'}}>
              <div className="bounce1" style={{backgroundColor: (this.props.color : '#FFF')}}></div>
              <div className="bounce2" style={{backgroundColor: (this.props.color : '#FFF')}}></div>
              <div className="bounce3" style={{backgroundColor: (this.props.color : '#FFF')}}></div>
              {message}
            </div>
        )
    }
}