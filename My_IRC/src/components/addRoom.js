import React, { Component } from 'react'

const formContainer = {
    flex:'10',
    display: 'flex',
}

const inputStyle = {
    width:'83%',
}

export class AddRoom extends Component {

    state = {
        roomName: "",
    }

    updateRoomName = (e) => { this.setState({roomName:e.target.value}); }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.roomName !== "") {
            this.props.sendSocket("addRoom", [this.state.roomName, this.props.user]);
            this.setState({roomName: ""});
        }
    }

    render() {
        return (
            <React.Fragment>
                <form style={formContainer} onSubmit={this.onSubmit}>
                    <input style={inputStyle} type="text" placeholder="Add a new room ..." value={this.state.roomName} onChange={this.updateRoomName}/>
                    <input type="submit" value="Create"/>
                </form>
            </React.Fragment>
        )
    }
}

export default AddRoom
