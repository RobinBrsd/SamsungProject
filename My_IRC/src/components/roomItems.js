import React, { Component } from 'react';

const divContainer = {
    display:'ruby',
    backgroundColor: '#444',
    color: '#fff',
    padding: '7px 10px',
    borderRadius: '3px',
    border: '2px solid black',
    margin: '5px',
    marginLeft:'0px',
    cursor: 'pointer',
}

class Room extends Component {

    joinRoom = (roomName) => {
        this.props.sendSocket("connectToRoom", [roomName, this.props.user]);
        this.props.sendSocket("joinedRoom", [roomName, this.props.user]);
        if(this.props.name !== this.props.oldRoomName && this.props.oldRoomName !== "")
            this.props.sendSocket("leavedRoom", [this.props.oldRoomName, this.props.user]); 
    }

    render() {
        return (
            <button onClick={() => this.joinRoom(this.props.name)} style={divContainer}> Join -> {this.props.name} </button>
        );
    }
}

export default Room;