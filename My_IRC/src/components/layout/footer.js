import React, { Component } from 'react'

const footerContainer = {
    backgroundColor: "#444444",
    padding:'5px 8px',
    color:'#fff',
    textAlign:'center',
    borderBottom:'3px solid black',
}

class Footer extends Component {

    state = {
        newPseudo:"",
    }

    updateNewPseudo = (e) => { this.setState({newPseudo:e.target.value}); }

    changePseudo = () => {
        if(this.state.newPseudo !== "") {
            this.props.sendSocket("sendMessage", [this.props.oldPseudo + " Changed his name to : " + this.state.newPseudo, "Infos System", "all"]);
            this.props.sendSocket("changePseudo", [this.props.oldPseudo, this.state.newPseudo]); 
            this.props.changePseudo(this.state.newPseudo);
            this.setState({newPseudo: ""});
        }
    }

    render() {
        return (
            <p style={footerContainer}>
                <input value={this.state.newPseudo} onChange={this.updateNewPseudo} type="text" name="newPseudo" placeholder="new Pseudo"/>
                <button onClick={this.changePseudo}> Change my Pseudo </button>
            </p>
        )
    }
}

export default Footer