import React from 'react';
import io from 'socket.io-client';
import './App.css';

import Login from './components/login';
import Header from './components/layout/header';
import AddRoom from './components/addRoom';
import Room from './components/room';
import Tchat from './components/tchat';
import ConnectedUser from './components/connectedUser';
import Footer from './components/layout/footer';

class App extends React.Component {

  state = {
      verifyPseudo: undefined,
      pseudoSent: false,
      isConnectedRoom: false,
      lastDeletedRoom:"",
      connectedRoom: "",
      rooms: [],
      roomMessages:[],
      allUsers:[],
      server: "http://localhost:3001/home",
  }

  socket = io.connect(this.state.server);

  componentWillUnmount() {
      this.sendSocket('disconnect', this.state.verifyPseudo);
  }

  componentDidMount() {
      this.getRoom();
      this.getAllUser();
      setInterval(this.getConnectedRoom, 2000);
      setInterval(this.getRoom, 10000);
      setInterval(this.getAllUser, 10000);
      setInterval(this.checkConnectedRoom, 2000);
      setInterval(this.getRoomMessages, 1500);
      setInterval(this.deletedRoom, 1500);
  }

  sendSocket = (name, value) => { this.socket.emit(name, value) }

  deletedRoom = () => {
      this.sendSocket("getDeletedRoom", '');
      this.socket.on("lastDeletedRoom", room => this.setState({lastDeletedRoom:room}));
      if(this.state.lastDeletedRoom === this.state.connectedRoom) {
          this.sendSocket('connectToRoom', ["Home", this.state.verifyPseudo]);
      }
  }

  addPseudo = (pseudo) => {
      this.setState({verifyPseudo:pseudo});
      if(!this.state.pseudoSent)
          this.sendPseudo(pseudo);
  }

  changePseudo = (pseudo) => {
      this.setState({verifyPseudo:pseudo});
  }

  sendPseudo = (pseudo) => {
      this.sendSocket("pseudo", pseudo);
      this.setState({ pseudoSent: true });
  }

  getAllUser = () => {
      this.sendSocket('getAllUser', '');
      this.socket.on('returnAllUser', usersList => this.setState({allUsers:usersList}));
  }

  getRoom = () => {
      this.sendSocket('getAllRoom', '');
      this.socket.on('returnRoom', roomsList => this.setState({rooms:roomsList}));
  }

  getConnectedRoom = () => {
      this.socket.on('returnConnectedRoom', room => this.setState({connectedRoom:room}));
  }

  getRoomMessages = () => {
      this.sendSocket('getRoomMessages', this.state.connectedRoom);
      this.socket.on('returnRoomMessages', roomMessages => this.setState({roomMessages:roomMessages}));
  }

  checkConnectedRoom = () => {
      if(this.state.connectedRoom !== "")
        if(this.state.isConnectedRoom !== true)
            this.setState({isConnectedRoom:true});
  }

  render() {
    if (this.state.verifyPseudo !== undefined) {
      return (
        <div className="App">
          <Header pseudo={this.state.verifyPseudo}/>
          <AddRoom sendSocket={this.sendSocket}  user={this.state.verifyPseudo}/>
          <Room sendSocket={this.sendSocket} oldRoomName={this.state.connectedRoom} rooms={this.state.rooms} user={this.state.verifyPseudo}/>
          <Tchat 
            user={this.state.verifyPseudo} 
            isConnectedRoom={this.state.isConnectedRoom} 
            connectedRoom={this.state.connectedRoom} 
            oldRoomName={this.state.connectedRoom}
            sendSocket={this.sendSocket} 
            allMessages={this.state.roomMessages}
            changePseudo={this.changePseudo}
            oldPseudo={this.state.verifyPseudo}
            socket={this.socket}
          />
          <h3 className="usersTitle"> Online users : </h3>
          <ConnectedUser allUsers={this.state.allUsers} />
          <Footer changePseudo={this.changePseudo} sendSocket={this.sendSocket} oldPseudo={this.state.verifyPseudo}/>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Login server={this.state.server} addPseudo={this.addPseudo}/>
        </div>
      )
    }
  }
}

export default App;
