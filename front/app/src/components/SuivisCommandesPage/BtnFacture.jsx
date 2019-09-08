import React, { Component } from 'react';
import axios from 'axios';

class BtnFacture extends Component {

    state = {
        send:false,
    }

    getFacture = (date) => {

        let data = {
            userId: parseInt(this.props.user_id),
            passedAt: date,
        }

        axios({
            headers: { 'Content-Type': 'application/json', },
            method: 'POST',
            url: 'http://localhost:8000/paniers/user/bill',
            data: data,
        });

        this.setState({send:true});
    }

    render() {
        return (
            <button className="factureAsk" onClick={() => this.getFacture(this.props.pureDates)} > {(this.state.send) ? "Envoyer"  : "Demander une facture" } </button>
        )
    }   
}

export default BtnFacture;
