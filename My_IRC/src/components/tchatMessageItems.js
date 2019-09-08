import React, { Component } from 'react';

const highlightUser = {
    color:'blue',
    fontWeight:'bold',
    marginRight: '8px',
}

const classicUser = {
    color:'green',
    fontWeight:'bold',
    marginRight: '8px',
}

const dateStyle = {
    fontSize: '12px',
    color: 'grey',
    float: 'right',
    marginTop: '3px',
}

const adminMessage = {
    fontSize: '12px',
    color: 'grey',
    marginRight: '8px',
}

const dmMessage = {
    color:'red',
    fontWeight:'bold',
    marginRight: '8px',
}

class TchatMessageItems extends Component {
    
    state = {
        highlightUser:false,
        admin:false,
        dm:false,
        sender:false,
    }

    componentDidMount() {
        (this.props.user === this.props.messages.user) ? this.setState({highlightUser:false}) : this.setState({highlightUser:true});
        (this.props.messages.user === "Infos System") ? this.setState({admin:true}) : this.setState({admin:false});
    
        (this.props.user === this.props.messages.to || this.props.user === this.props.messages.user) ? this.setState({dm:true}) : this.setState({dm:false});
        (this.props.user === this.props.messages.user) ? this.setState({sender:true}) : this.setState({sender:false});
    }

    render() { 
        if(this.state.admin) {
            return (
                <div>
                    <span style={adminMessage}> {this.props.messages.user} : {this.props.messages.message} </span>
                    <span style={dateStyle}> @{this.props.messages.date} </span>
                </div>
            );
        } 
        else if(this.props.messages.to === 'allUser') {
            return (
                <div>
                    <span style={(!this.state.highlightUser) ? highlightUser : classicUser}> {this.props.messages.user} : </span> 
                    {this.props.messages.message} 
                    <span style={dateStyle}> @{this.props.messages.date} </span>
                </div>
            );
        }
        else if(this.state.dm && this.state.sender) {
            return (
                <div>
                    <span style={dmMessage}> {this.props.messages.user} : </span> 
                    {this.props.messages.message} 
                    <span style={dateStyle}> @ {this.props.messages.date} </span>
                    <span style={dateStyle}> to : {this.props.messages.to} | </span>
                </div>
            );
        }
        else if(this.state.dm && !this.state.sender) {
            return (
                <div>
                    <span style={dmMessage}> {this.props.messages.user} : </span> 
                    {this.props.messages.message} 
                    <span style={dateStyle}> @ {this.props.messages.date} </span>
                    <span style={dateStyle}> From : {this.props.messages.user} | </span>
                </div>
            );
        }  
        else {
            return ( <div></div> );
        }
    }
}

export default TchatMessageItems;
