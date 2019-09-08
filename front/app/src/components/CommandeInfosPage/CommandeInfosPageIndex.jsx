import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';


import './index.scss';
class CommandeInfosPage extends Component {

   
    constructor(props) {
        super(props)
        this.changeData = this.changeData.bind(this);

        this.state = {
            user_logged: false,
            user_id:"",
            user_role:"",
            email: "",
            password:"",
            redirect:false,

            prenom: "",
            nom: "",
            pays: "",
            ville: "",
            adresse: "",

            paysLiv: "",
            villeLiv: "",
            adresseLiv: "",

            livraisonType: 0,
            codePromo: "",
            price:0,
            pricePromo:0,
            allCodePromo:[],

            buttonPaymentDisabled:true,
            promoIsLoading:false,

        }

    }

    onToken = (token) => {
        var data = {};
        if(localStorage.getItem('user') !== null) {
            data = {
                userId: parseInt(localStorage.getItem('user').split(',')[0]),
                firstname: this.state.prenom,
                lastname: this.state.nom,
                country: this.state.paysLiv,
                city: this.state.villeLiv, 
                adress: this.state.adresseLiv,
                accountFree: this.state.email,
                visaExp:this.state.price + this.state.livraisonType * 1 - this.state.pricePromo,
                visaNumber:token.id,

            }
            
        } else {
            data = {
                token: localStorage.getItem('visitor'),
                firstname: this.state.prenom,
                lastname: this.state.nom,
                country: this.state.paysLiv,
                city: this.state.villeLiv, 
                adress: this.state.adresseLiv,
                accountFree: this.state.email,
                visaExp:this.state.price + this.state.livraisonType * 1 - this.state.pricePromo,
                visaNumber:token.id,
            }
        }
        axios({
            headers: { 'Content-Type': 'application/json', },
            method: 'POST',
            url: 'http://localhost:8000/paniers/user/validate',
            data: data,
        })
        this.setState({redirect:true});

    }

    componentDidMount() {


        var id = "";
        if(localStorage.getItem('user') !== null) {
            id = localStorage.getItem('user').split(',')[0];
        } else {
            id = localStorage.getItem('visitor');
        }

        axios({
            headers: { 'Content-Type': 'application/json', },
            method: 'GET',
            url: 'http://localhost:8000/paniers/user/'+id,
        }).then((response)=>{
            this.setState({price:response.data[1].price})
        })
        
        axios({
            headers: { 'Content-Type': 'application/json', },
            method: 'GET',
            url: 'http://localhost:8000/promos',
        }).then((response)=>{
            this.setState({allCodePromo:response.data['hydra:member']})
        })

        let user = localStorage.getItem('user');
        if (user !== null) {
            axios({
                headers: { 'Content-Type': 'application/json', },
                method: 'GET',
                url: 'http://localhost:8000/user_infos/' + id,
            }).then((response) => {
                let data = response.data[0];

                this.setState({
                    email: user.split(',')[2],
                    idModify: data.id,
                    prenom: data.firstname,
                    nom: data.lastname,
                    pays: data.country,
                    ville: data.city,
                    adresse:data.adress,
                    paypal_login:data.paypal_login,
                    paypal_password:data.paypal_password,
                    wallet: data.wallet,
                    account_free: data.account_free,
                })
            });
        }
    }

    async changeData (e)  {
        var target = e.target
        await this.setState({[target.name]:target.value });

        if (this.state.paysLiv.length > 0 && this.state.villeLiv.length > 0 && this.state.adresseLiv.length > 0 && this.state.email.length > 0 && this.state.prenom.length > 0 && this.state.nom.length > 0 && this.state.pays.length > 0 && this.state.ville.length > 0 && this.state.adresse.length > 0) {
            this.setState({buttonPaymentDisabled:false})
        } else {
            this.setState({buttonPaymentDisabled:true})
        }

        if (target.name === 'codePromo') {
            this.state.allCodePromo.map((code) => {
                if (this.state.codePromo === code.code){
                    this.setState({pricePromo:code.amount})

                }
                return ''
            })
           

        }
        

    }


    postData = (e) =>  {
        e.preventDefault();
        let id = "";
        let infos = {};
  
        if(localStorage.getItem('user') !== null) {
            id = localStorage.getItem('user').split(',')[0];
            infos = {
                firstname: this.state.prenom,
                lastname: this.state.nom,
                country: this.state.pays,
                city: this.state.ville, 
                adress: this.state.adresse,
                accountFree: this.state.email
            };

            axios({
                headers: { 'Content-Type': 'application/json', },
                method: 'PUT',
                url: 'http://localhost:8000/user_infos/' + this.state.idModify,
                data:infos,
            })
        } else {
            id = localStorage.getItem('visitor');
            infos = {
                token: id,
                firstname: this.state.prenom,
                lastname: this.state.nom,
                country: this.state.pays,
                city: this.state.ville, 
                adress: this.state.adresse,
                accountFree: this.state.email,
            };
            axios({
                headers: { 'Content-Type': 'application/json', },
                method: 'POST',
                url: 'http://localhost:8000/user_infos',
                data:infos,
            })
        }
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/commandeSuivis"/>
        }

        return (
            <div className="profileContainer">
                <div className="profileContainerBackground">
                    <h2 className="profileTitle"> Infos de livraisons </h2>
                    <form onSubmit={this.postData}>
                        <h3 className="sectionTitle"> Informations Personnelles </h3>
                        <div className="formField">
                            <label htmlFor="email"> Email : </label>
                            <input className="formInput" id="email" name="email" type="text" value={this.state.email} onChange={this.changeData}/>

                            <label htmlFor="nom"> Nom : </label>
                            <input className="formInput" id="nom" required name="nom" type="text" value={this.state.nom} onChange={this.changeData}/>
                            
                            <label htmlFor="prenom"> Prenom : </label>
                            <input className="formInput" id="prenom" required name="prenom" type="text" value={this.state.prenom} onChange={this.changeData}/>
                        </div>

                        <div className="formField">
                            <label htmlFor="country"> Pays : </label>
                            <input className="formInput" required id="country" name="pays" type="text" value={this.state.pays} onChange={this.changeData}/>
                            
                            <label htmlFor="ville"> Ville : </label>
                            <input className="formInput" required id="ville" name="ville" type="text" value={this.state.ville} onChange={this.changeData} />
                        </div>

                        <div className="formField">
                            <label htmlFor="adress"> Adresse : </label>
                            <input className="formInput" required id="adress" name="adresse" type="text" value={this.state.adresse} onChange={this.changeData}/>
                        </div>
                        <br/>

                        <h3 className="sectionTitle"> Informations de livraison </h3>
                        <div className="formField">
                            <label htmlFor="country"> Pays : </label>
                            <input className="formInput" required id="country" name="paysLiv" type="text" value={this.state.paysLiv} onChange={this.changeData}/>
                        </div>
                        <div className="formField">    
                            <label htmlFor="ville"> Ville : </label>
                            <input className="formInput" required id="ville" name="villeLiv" type="text" value={this.state.villeLiv} onChange={this.changeData} />
                        </div>

                        <div className="formField">
                            <label htmlFor="adress"> Adresse : </label>
                            <input className="formInput" required id="adress" name="adresseLiv" type="text" value={this.state.adresseLiv} onChange={this.changeData}/>
                        </div>
                        <br/>

                        <h3 className="sectionTitle"> Details de livraison </h3>
                        <div className="formField">
                            <label htmlFor="promo"> Code Promotionel : </label>
                            <input className="formInput" id="promo" name="codePromo" type="text" value={this.state.codePromo} onChange={this.changeData}/>
                        </div>
                        <div className="formField">
                            <label htmlFor="promo"> Methodes de livraisons : </label>
                            <select className="formInput" name="livraisonType" value={this.state.livraisonType} onChange={this.changeData}>
                                <option value={0}> Chronopost  </option>
                                <option value={5}> Chronopost Express (+5,00€)</option>
                            </select>
                        </div> 
                        <br/>
                        <h3 className="sectionTitle"> Recapitulatif de la commande </h3>
                        <div className="recapLivraison">
                            <p> Prix des produits : {this.state.price}€ </p>
                            <p>Reduction code promo : {this.state.pricePromo}€</p>
                            <p> Forfait de livraison : {this.state.livraisonType}€ </p>
                            <p> Total TTC : {this.state.price + this.state.livraisonType * 1 - this.state.pricePromo}€</p>
                        </div>
                        <hr className="bottomBar"/>
                        <StripeCheckout
                            token={this.onToken}
                            stripeKey="pk_test_lRZZe5XPWTtFQ1G9cTdwyEga00GDhaoy2F"
                            amount={(this.state.price + this.state.livraisonType * 1 - this.state.pricePromo) * 100}
                            currency="EUR"
                            image="https://cdn.shopify.com/s/files/1/0864/6210/products/Xavi_-_Cinci_Red_Text_Uncensored_large.jpg?v=1484918671"
                            disabled={this.state.buttonPaymentDisabled}
                        />
                    </form>
                   
                </div>
            </div>
        )
    }
}

export default CommandeInfosPage;