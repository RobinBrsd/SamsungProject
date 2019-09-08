import React, { Component } from 'react';
import TchatMessageItems from './tchatMessageItems';

class TchatMessage extends Component {
  render() {
    return this.props.roomMessages.map((roomMessages) => (
        <TchatMessageItems key={roomMessages.id} messages={roomMessages} user={this.props.user}/>
    ));
  }
}

export default TchatMessage