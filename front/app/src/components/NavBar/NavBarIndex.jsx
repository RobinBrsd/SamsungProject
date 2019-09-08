import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import './index.scss';

import Logo from './logo_new.png';

import FormLogin from './LoginForm/LoginFormIndex';
import ProfilPanel from './ProfilPanel/ProfilPanelIndex';
import PanierPanel from './PanierPanel/PanierPanelIndex';

import { ReactComponent as LoupeSVG } from './NavIcon/loupe.svg';
import { ReactComponent as PanierSVG } from './NavIcon/paper-bag.svg';
import { ReactComponent as ProfileSVG } from './NavIcon/profile.svg';
class NavBar extends Component {

    state = {
        admin:false,
        userLogged: false,
        isTyping: false,
        clickLogin: false,
        clickPanier: false,
        userText: "Compte Client",
        url: "",
        searchValue: "",
        miniTotal:"",
        tabAutoComplete:[],
        tabAutoCompleteResult:[],
    }

    getSugValue = (e) => {
        this.setState({searchValue:e.target.innerHTML, isTyping:false});
    }

    filtreTexte = (arr, requete) => {
        if (requete.length > 0) {
            return arr.filter((el) =>  {
                return el.toLowerCase().indexOf(requete.toLowerCase()) !== -1;
            })
        }
      }

    changeMiniTotal = (total) => {
        this.setState({miniTotal:total});
    }

    getHistorique = (e) => {
        var historique = localStorage.getItem('historique');
        if(historique !== null) {
            let tab = [historique];
            tab.push(this.state.searchValue);
            localStorage.setItem("historique", tab);
        } else {
            localStorage.setItem("historique", [this.state.searchValue]);
        }
    }

    displayHistorique = () => {
        var historique = localStorage.getItem('historique');
        if (historique !== null){
            var tab = historique.split(",");
            while (tab.length > 10) {
                tab.pop();
            }
            this.setState({tabAutoCompleteResult: tab.reverse(), isTyping:true});
        }
    }

    hideHistorique = () => {
        this.setState({isTyping:false});
    }

    updateValue = (e) => {
        var matchTitle=[];
        this.setState({url:"/search/" + e.target.value});
        
        matchTitle = this.filtreTexte(this.state.tabAutoComplete,e.target.value)

        if (matchTitle !== undefined){
            while (matchTitle.length > 10) {
                matchTitle.pop();
            }
        } else {
            matchTitle =[];
        }
        this.setState({url:"/search/" + this.state.searchValue, tabAutoCompleteResult: matchTitle, searchValue:e.target.value, isTyping:true});
    }
    
    displayForm = (e) => {
        e.preventDefault();
        this.setState(prevState => ({clickLogin: !prevState.clickLogin}));
    }

    displayPanier = (e) => {
        e.preventDefault();
        this.setState(prevState => ({clickPanier: !prevState.clickPanier}));
    }

    componentDidMount() {
        let user = localStorage.getItem('user');
        if (user !== null) {
            this.setState({userLogged: true, userLink: '/profile', userText: 'Mon Compte'});
        }

        if (this.state.tabAutoComplete.length === 0) {
            var tabResponse = [];
            axios({
                headers: { 
                    'Content-Type': 'application/json',
                },
                method: 'GET',
                url: 'http://localhost:8000/products',
            }).then((response) => {
                response.data['hydra:member'].map((product,)=>{
                    tabResponse[product.id]=product.title;
                    return ''
                })

                this.setState({
                    tabAutoComplete:tabResponse,
                })
            });
        }
    }

    render() {
        if(this.state.userLogged) {
            return (
                <header>
                    <nav className="nav">
                        <div className="logoContainer">
                            <img src={Logo} alt="logo" className="logo"/>
                        </div>
                        <div className="linkContainer">
                            <NavLink draggable="false" className="link" to="/" exact={true}> Home  </NavLink>
                            <NavLink draggable="false" className="link" to="/produits"> Nos Produits </NavLink>
                            <NavLink draggable="false" className="link" to="/contact"> Contact </NavLink>
                        </div>
                        <div draggable="false" className="searchContainer">
                            <form action={this.state.url}>
                                <div className="searchField">
                                    <input onFocus={this.displayHistorique} onBlur={this.hideHistorique} autoComplete="off" type="text" placeholder="Rechercher ..." name="search" value={this.state.searchValue || ''} onChange={this.updateValue}/>
                                    <button className="btnSubmit" onClick={this.getHistorique}> <LoupeSVG className="loupeIcon"/> </button>
                                    <div className={!this.state.isTyping ? "hiddenAutoComplete" : "autoCompleteContainer" }>
                                        { this.state.tabAutoCompleteResult.map((item, id) => (
                                            <li onClick={this.getSugValue} key={id}>{item}</li>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div onMouseEnter={this.displayForm} onMouseLeave={this.displayForm} className="userContainer">
                            <p onClick={this.displayForm} draggable="false"> <ProfileSVG className="userLogo"/> {this.state.userText} </p>
                            <ProfilPanel hidden={this.state.clickLogin}/>
                        </div>
                        <div onMouseEnter={this.displayPanier} onMouseLeave={this.displayPanier} className="panierContainer">
                            <a href="/panier" draggable="false"> <PanierSVG className="panierLogo"/> Mon Panier </a>
                            <span className={ this.state.miniTotal === "" || this.state.miniTotal === 0 ? "hidden" : "panierMiniTotal" }> {this.state.miniTotal} </span>
                            <PanierPanel changeMiniTotal={this.changeMiniTotal.bind(this)} hidden={this.state.clickPanier} />
                        </div>
                    </nav>
                </header>
            );
        }
        return (
            <header>
                <nav className="nav">
                    <div className="logoContainer">
                        <img src={Logo} alt="logo" className="logo"/>
                    </div>
                    <div className="linkContainer">
                        <NavLink draggable="false" className="link" to="/" exact={true}> Home  </NavLink>
                        <NavLink draggable="false" className="link" to="/produits"> Nos Produits </NavLink>
                        <NavLink draggable="false" className="link" to="/contact"> Contact </NavLink>
                    </div>
                    <div draggable="false" className="searchContainer">
                        <form action={this.state.url}>
                            <div className="searchField">
                                <input onFocus={this.displayHistorique} onBlur={this.hideHistorique} autoComplete="off" type="text" placeholder="Rechercher ..." name="search" value={this.state.searchValue || ''} onChange={this.updateValue}/>
                                <button onClick={this.getHistorique} className="btnSubmit"> <LoupeSVG className="loupeIcon"/> </button>
                                <div className={!this.state.isTyping ? "hiddenAutoComplete" : "autoCompleteContainer" }>
                                    { this.state.tabAutoCompleteResult.map((item, id) => (
                                        <li onClick={this.getSugValue} key={id}>{item}</li>
                                    ))}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div draggable="false" onMouseEnter={this.displayForm} onMouseLeave={this.displayForm} className="userContainer">
                        <p onClick={this.displayForm} draggable="false"> <ProfileSVG className="userLogo"/> {this.state.userText} </p>
                        <FormLogin hidden={this.state.clickLogin}/>
                    </div>
                    
                    <div draggable="false" onMouseEnter={this.displayPanier} onMouseLeave={this.displayPanier} className="panierContainer">
                        <a href="/panier" draggable="false"> <PanierSVG className="panierLogo"/> Mon Panier </a>
                        <span className={ this.state.miniTotal === "" || this.state.miniTotal === 0 ? "hidden" : "panierMiniTotal" } > {this.state.miniTotal} </span>
                        <PanierPanel changeMiniTotal={this.changeMiniTotal.bind(this)} hidden={this.state.clickPanier} />
                    </div>
                </nav>
            </header>
        );
    }
}

export default NavBar;