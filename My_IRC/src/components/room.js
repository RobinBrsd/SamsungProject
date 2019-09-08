import React, { Component } from 'react';
import RoomItem from './roomItems';

export class Room extends Component {
  render() {
    return this.props.rooms.map((roomName) => (
        <RoomItem sendSocket={this.props.sendSocket} oldRoomName={this.props.oldRoomName} user={this.props.user} key={roomName} name={roomName}/>
    ));
  }
}

export default Room