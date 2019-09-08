import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

import './index.scss';
class ProfilePage extends Component {

    state = {
        user_logged: false,
        redirect:false,
        user_id:"",
        user_role:"",
        email: "",
        password:"",

        prenom: "",
        nom: "",
        pays: "",
        ville: "",
        adresse: "",
        visaNumber: "",
        visaCryptogram: "",
        visaExp: "",
    }

    componentDidMount() {
        let user = localStorage.getItem('user');
        if (user !== null) {
            let id = user.split(',')[0];

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
                    adresse: data.adress,
                    paypal_login: data.paypal_login,
                    paypal_password: data.paypal_password,
                    visaNumber: data.visaNumber,
                    visaCryptogram: data.visaCryptogram,
                    visaExp: data.visaExp,
                    wallet: data.wallet,
                    account_free:data.account_free,
                })
            });
        } else {
            this.setState({redirect:true})
        }
    }

    changeData = (e) => {
        this.setState({[e.target.name]:e.target.value });
    }

    postData = (e) =>  {
        e.preventDefault();
        let infos = {
            firstname: this.state.prenom,
            lastname: this.state.nom,
            country: this.state.pays,
            city: this.state.ville, 
            adress: this.state.adresse,
            visaNumber: this.state.visaNumber,
            visaCryptogram: this.state.visaCryptogram,
            visaExp: this.state.visaExp,
        };
        axios({
            headers: { 'Content-Type': 'application/json', },
            method: 'PUT',
            url: 'http://localhost:8000/user_infos/' + this.state.idModify,
            data:infos,
        }).then((response) => {
            window.location.reload();
        });
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/register"/>
        } 
        return (
            <div className="profileContainer">
                <div className="profileContainerBackground">
                    <h2 className="profileTitle"> Profile </h2>
                    <form onSubmit={this.postData}>
                        <h3 className="sectionTitle"> Infos Personelles </h3>
                        <div className="formField">
                            <label htmlFor="nom"> Nom : </label>
                            <input className="formInput" id="nom" name="nom" type="text" value={this.state.nom} onChange={this.changeData}/>
                            
                            <label htmlFor="prenom"> Prenom : </label>
                            <input className="formInput" id="prenom" name="prenom" type="text" value={this.state.prenom} onChange={this.changeData}/>
                        </div>

                        <div className="formField">
                            <label htmlFor="country"> Pays : </label>
                            <input className="formInput" id="country" name="pays" type="text" value={this.state.pays} onChange={this.changeData}/>
                            
                            <label htmlFor="ville"> Ville : </label>
                            <input className="formInput" id="ville" name="ville" type="text" value={this.state.ville} onChange={this.changeData} />
                        </div>

                        <div className="formField">
                            <label htmlFor="adress"> Adresse : </label>
                            <input className="formInput" id="adress" name="adresse" type="text" value={this.state.adresse} onChange={this.changeData}/>
                        </div>

                        <h3 className="sectionTitle"> Identifiants </h3>
                        <div className="formField">
                            <label htmlFor="email"> Email : </label>
                            <input className="formInput" id="email" type="text" name="email" value={this.state.email} onChange={this.changeData}/>
                        </div>

                        <div className="formField">
                            <label htmlFor="password"> Mot de passe : </label>
                            <input className="formInput" id="password" name="password" type="password" value={this.state.password} onChange={this.changeData}/>
                        </div>
                        <h3 className="sectionTitle"> Infos Bancaires </h3>
                        <div className="formField">
                            <label htmlFor="number"> Numero de Carte </label>
                            <input className="formInput" id="number" name="visaNumber" type="text" value={this.state.visaNumber} onChange={this.changeData}/>
                        </div>
                        <div className="formField">
                            <label htmlFor="visaExp"> Date d'expiration : </label>
                            <input className="formInput" id="visaExp" type="text" name="visaExp" value={this.state.visaExp} onChange={this.changeData}/>
                            
                            <label htmlFor="crypto"> Cryptogram Visuel </label>
                            <input className="formInput" id="crypto" name="visaCryptogram" type="text" value={this.state.visaCryptogram} onChange={this.changeData}/>
                        </div>
                        <hr className="bottomBar" />
                        <button type="submit"> Mettre a jour </button>  
                    </form>
                </div>
            </div>
        )
    }
}

export default ProfilePage;
