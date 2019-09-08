import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

import './index.scss';
import BtnFacture from './BtnFacture';
class SuivisCommandesPage extends Component {

    state = {
        user_logged: false,
        user_id: "",
        redirect:false,
        commandes:[],
        total:[],
        dates:[],
        done:[],
        price:[],
    }

    componentDidMount() {
        let user = localStorage.getItem('user');
        if (user !== null) {
            let id = user.split(',')[0];
            axios({
                headers: { 'Content-Type': 'application/json', },
                method: 'GET',
                url: 'http://localhost:8000/orders/user/' + id,
            }).then((response) => {
                this.setState({user_id: id,commandes:response.data[0].reverse(), total:response.data[1].reverse(), price: response.data[4].reverse(), dates:response.data[2].reverse(), done:response.data[3].reverse(), pureDates:response.data[5].reverse()});
            });
        } else {
            this.setState({redirect:true})
        }
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/register"/>
        }  
        return (
            <div className="allCommandesContainer">
                <div className="commandesContainerBackground">
                <div className="categorieTitleContainer">
                    <h2 className="categorieTitle"> Suvis Commandes </h2>
                </div>
                    { this.state.commandes.map((cmd, i) => (
                        <div key={i} className="commandeContainer">
                            <div className="referenceContainer">
                                <p className="date"> { this.state.dates[i] } </p>
                                <p className="status"> Statut : { (!this.state.done[i]) ? "En cours" : "Livrée" } </p>
                            </div>
                            { cmd.map((item, id) => (
                                <div className="itemSuivisContainer" key={id}>
                                    <img className="imgSuivisProduit" src={item.picture} alt="imgproduits" />
                                    <p className="titleSuivis"> {item.title} </p>
                                    <div className="suivisInfos">
                                        <p className="suivisPrix"> Prix : {item.price} € </p>
                                        <p> Quantite : {item.quantity} </p>
                                    </div>
                                </div>
                            )) }
                            <div className="totalSuivis"> 
                                <p className="flexSuivisItem"> TTC : { this.state.price[i]} € <span className="promotionTips"> *promotions et livraison comprises </span></p>
                                <p className="flexSuivisItem"> Nombres Total de produits : {this.state.total[i].totalquantity} </p>
                                <p> Nombres Total de colis : {this.state.total[i].totalcolis} </p>
                                <BtnFacture user_id={this.state.user_id} i={i} pureDates={this.state.pureDates[i]} />
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        )
    }
}

export default SuivisCommandesPage;