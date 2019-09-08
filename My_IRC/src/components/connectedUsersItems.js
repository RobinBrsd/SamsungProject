import React, { Component } from 'react';

const userStyle = {
    color:'green',
    border:'2px solid black',
    display:'inline-block',
    margin:'3px',
    padding:'5px',
    borderRadius:'2px',
}

class ConnectedUserItems extends Component {
    render() {
        return (
            <p style={userStyle}> {this.props.name} </p>
        );
    }
}

export default ConnectedUserItems;
