import React, { Component } from 'react';
import TchatMessage from './tchatMessage';


const tchatContainer = {
    border:"2px solid #444444",
    borderRadius:'2px',
}

const boardStyle = {
    backgroundColor:'#EFF0F1',
    height:'550px',
    padding:'8px',
    overflowY:'scroll',
}

const titleInfos = {
    textAlign:'center',
    marginTop: '50px',
    border: '2px solid black',
    padding: '5px 10px',
}

const formContainer = {
    flex:'10',
    display: 'flex',
    borderTop:'2px solid #444444',
}

const inputStyle = {
    width:'85%',
}

class Tchat extends Component {

    state = {
        message: "",
        listSpecifiedRoom:"",
        listChannelUser:"",
    }

    updateMessage = (e) => { this.setState({message:e.target.value}); }

    renamePseudo = (name) => {
        if(name !== "" || name !== undefined) {
            this.props.sendSocket("sendMessage", [this.props.oldPseudo + " Changed his name to : " + name, "Infos System", "all", 'allUser']);
            this.props.sendSocket("changePseudo", [this.props.oldPseudo, name]); 
            this.props.changePseudo(name);
        }
    }

    joinRoom = (infos) => {
        this.props.sendSocket("connectToRoom", infos);
        this.props.sendSocket("joinedRoom", infos);
        if(this.props.name !== this.props.oldRoomName)
            this.props.sendSocket("leavedRoom", [this.props.oldRoomName, this.props.user]); 
    }

    setRoom = (rooms) => {
        let msg = "Available room : ";
        rooms.forEach(function(name) {
            msg += name + " - ";
        });
        this.setState({listSpecifiedRoom:msg})
        this.props.sendSocket("sendMessage", [this.state.listSpecifiedRoom, "Infos System", this.props.oldRoomName, 'allUser']);
    }

    setChannelUser = (users) => {
        let msg = "User in this room : ";
        users.forEach(function(name) {
            msg += name + " - ";
        });
        this.setState({listChannelUser:msg})
        this.props.sendSocket("sendMessage", [this.state.listChannelUser, "Infos System", this.props.oldRoomName, 'allUser']);
    }

    listSpecifiedRoom = (val) => {
        this.props.sendSocket("listRoom", val);
        this.props.socket.on('returnListRoom', rooms => this.setRoom(rooms));
    }

    listChannelUsers = (room) => {
        this.props.sendSocket("listRoomUser", room);
        this.props.socket.on('returnRoomUser', users => this.setChannelUser(users));
    }

    sendCommande = (message) => {
        let tab = message.split(' ');
        let cmd = tab[0];
        let val = tab[1];
        let msg = tab[2];

        switch(cmd) {
            case '/nick':
                this.renamePseudo(val);
                break;
            case '/list':
                this.listSpecifiedRoom(val);
                break;
            case '/create':
                this.props.sendSocket("addRoom", [val, this.props.user]);
                this.props.sendSocket('connectToRoom', [val, this.props.user]);
                break;
            case '/delete':
                this.props.sendSocket("deleteRoom", [val, this.props.user]);
                if(this.props.oldRoomName === val)
                    this.props.sendSocket('connectToRoom', ["Home", val]);
                break;
            case '/join':
                this.joinRoom([val, this.props.user]);
                break;
            case '/part':
                this.joinRoom(["Home", this.props.user]);
                break;
            case '/users':
                this.listChannelUsers(this.props.oldRoomName);
                break;
            case '/msg':
                this.props.sendSocket("sendMessage", [msg, this.props.user, this.props.connectedRoom, val]);
                break;

            case '/clear':
                this.props.sendSocket("clearRoom", this.props.connectedRoom);
                break;
            default:
                console.log("Commande not found");
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        let message = this.state.message;

        if(message !== "") {
            if(message.startsWith("/"))
                this.sendCommande(message);
            else
                this.props.sendSocket("sendMessage", [message, this.props.user, this.props.connectedRoom, "allUser"]);
            
            this.setState({message: ""});
        }
    }

    render() {
        if(this.props.isConnectedRoom !== false) {
            return (
                <React.Fragment>
                    <h5 className="tchatTitle"> Currently tchating on : {this.props.connectedRoom} room </h5>
                    <div style={tchatContainer}>
                        <div style={boardStyle}>
                            <TchatMessage user={this.props.user} roomMessages={this.props.allMessages}/>
                        </div>
                        <form style={formContainer} onSubmit={this.onSubmit}>
                            <input style={inputStyle} type="text" placeholder="Type a message..." value={this.state.message} onChange={this.updateMessage}/>
                            <input type="submit" value="Send"/>
                        </form>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <h2 style={titleInfos}> Connect to a Room </h2>
            )
        }
    }
}

export default Tchat
