import React from 'react';

const loginContainer = {
    display: 'inlineblock',
    textAlign:'center',
}

class Login extends React.Component {

    state = {
        pseudo:"",
    }
    
    updatePseudo = (e) => { this.setState({pseudo:e.target.value}); }

    sendPseudo = (e) => {
        e.preventDefault();
        if(this.state.pseudo !== "") {
            this.props.addPseudo(this.state.pseudo)
        }
    }

    render() {
        return (
            <div style={loginContainer}>
                <h2> IRC CHAT </h2>
                <form onSubmit={this.sendPseudo}>
                    <input placeholder="Enter Pseudo..." type="text" name="pseudo" value={this.state.pseudo} onChange={this.updatePseudo}/>
                    <input type="submit" value="Connect"/>
                </form>
            </div>
        );
    }
}

export default Login;
