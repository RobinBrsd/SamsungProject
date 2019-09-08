import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

import './index.scss';

class LoginPage extends Component {

    state = {
        email: '',
        password: '',
        error: false,
        redirect: false,
    }

    updateFormValue = (e) => {
        this.setState({[e.target.name]:e.target.value });
    }

    postData = (e) => {
        e.preventDefault();
        let token = localStorage.getItem('visitor');

        let user = {
            email: this.state.email,
            password: this.state.password,
            token: token,
        }
        axios({
            headers: { 
                'Content-Type': 'application/json',
            },
            method: 'POST',
            url: 'http://localhost:8000/login',
            data: JSON.stringify(user),
        }).then((response) => {
            if(response) {
                localStorage.setItem("user", [response.data[0].id, response.data[0].role, response.data[0].email]);
                this.setState({redirect:true});
            }
        }).catch((error) => {
            if(error)
                this.setState({error:true});
        });

        this.setState({email:'', password:''});
    }

    render() {
        if (this.state.redirect) {
            window.location.reload();
            return <Redirect to='/'/>;
        }

        return (
            <div className={!this.props.hidden ? "hiddenForm" : "formLogin"}>
                <span className="formTitle"> Deja Client ? </span>
                <form onSubmit={this.postData}>
                    <input type="email" placeholder="Email" name="email" onChange={this.updateFormValue}/>
                    <input type="password" placeholder="Password" name="password" onChange={this.updateFormValue}/>
                    <p className={this.state.error ? "error" : "hidden"}> Identifiant invalides </p>
                    <button type="submit"> Se Connecter </button>
                </form>
                <hr className="bar"/>
                <span className="formTitle"> Nouveaux Client ? </span>
                <a href="/register"><button> Creer votre compte </button></a>
            </div>
        )
    }
}

export default LoginPage;
