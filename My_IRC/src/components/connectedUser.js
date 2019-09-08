import React, { Component } from 'react';
import ConnectedUserItems from './connectedUsersItems';
import uuidv4 from 'uuid/v4';

class ConnectedUser extends Component {
  render() {
    return this.props.allUsers.map((userName) => (
        <ConnectedUserItems key={uuidv4()} name={userName}/>
    ));
  }
}

export default ConnectedUser;