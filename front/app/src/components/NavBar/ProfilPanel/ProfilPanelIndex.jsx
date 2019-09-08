import React, { Component } from 'react';
import uuidv4 from 'uuid';

import './index.scss';

class PanelProfil extends Component {

    logout = () => {
        localStorage.clear();
        localStorage.setItem('visitor', uuidv4());
    }

    render() {
        return (
            <div className={!this.props.hidden ? "hiddenForm" : "panelProfil"}>
                <span className="panelTitle"> Bonjour Name </span>
                <hr className="bar"/>
                <a href="/profile" > Voir mon Profil </a>
                <a href="/commandeSuivis" > Mes commandes </a>
                <a onClick={this.logout} href="/"> Me Deconnecter </a>
            </div>
        )
    }
}

export default PanelProfil;
