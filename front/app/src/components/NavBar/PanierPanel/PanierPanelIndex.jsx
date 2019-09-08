import React, { Component } from 'react';
import axios from 'axios';

import './index.scss';

class PanelPanier extends Component {

    state = {
        products:[],
        total:"",
    }

    componentDidMount() {
        let id = "";
        if(localStorage.getItem('user') !== null) {
            id = localStorage.getItem('user').split(',')[0];
        } else {
            id = localStorage.getItem('visitor');
        }

        axios({
            headers: { 
                'Content-Type': 'application/json',
            },
            method: 'GET',
            url: 'http://localhost:8000/paniers/user/' + id
        }).then((response) => {
            this.props.changeMiniTotal(response.data[1].quantity);
            this.setState({products:response.data[0], total:response.data[1]})
        });
    }

    render() {
        return (
            <div className={!this.props.hidden ? "hiddenPanier" : "panelPanier"}>
                <span className="panelTitle"> Dans le Panier </span>
                <hr className="bar"/>
                { this.state.products.map((item, id) => (
                    <div className="itemContainer" key={id}>
                        <p className="itemTitle"> { item.title } </p>
                        <p> Quantite : { item.quantity } </p>  
                        <p className="itemPrice"> {item.price} € </p>
                    </div>
                ))}
                <div className="itemTotalContainer">
                    <p className="itemTotal"> { this.state.total.quantity } produits dans le panier </p>
                    <p className="itemTotal"> Total : { this.state.total.price } €</p>
                </div>
            </div>
        )
    }
}

export default PanelPanier;
