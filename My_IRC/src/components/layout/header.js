import React, { Component } from 'react'

const headerContainer = {
    backgroundColor: "#444444",
    padding:'5px 8px',
    color:'#fff',
    textAlign:'center',
    borderBottom:'3px solid black',
}

export class header extends Component {
  render() {
    return (
      <div style={headerContainer}>
        <h2> Connected as : <span> { this.props.pseudo } </span></h2>
      </div>
    )
  }
}

export default header