import React, { Component } from 'react'
import { Redirect } from 'react-router';
import axios from 'axios';

import './index.scss';

class RegisterPage extends Component {

    state = {
        email: '',
        password: '',
        error: false,
        redirect: false,
    }

    updateValue = (e) => {
        this.setState({[e.target.name]:e.target.value });
    }

    checkData = (e) => {
        e.preventDefault();

        const pattern = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
        const result = pattern.test(this.state.email);

        if(this.state.email === "" || result === false) {
            this.setState({error:true, msg:"Email Invalide"});
        } else if(this.state.password === "") {
            this.setState({error:true, msg:"Password Invalide"});
        } else {
            this.postData();
        }   
    }

    postData = () => {
        let user = {
            email: this.state.email,
            password: this.state.password,
            role: ["ROLE_USER"],
        }

        axios({
            headers: { 
                'Content-Type': 'application/json',
            },
            method: 'POST',
            url: 'http://localhost:8000/users',
            data: JSON.stringify(user),
        }).then((response) => {
            if(response)
                this.setState({redirect:true});
        }).catch((error) => {
            if(error)
                this.setState({error:true, msg:"Email Deja Utiliser"});
        });

        this.setState({email:''});
        this.setState({password:''});
    }

    render() {
        if (this.state.redirect)
            return <Redirect to='/'/>;

        return (
            <div className="formContainer">
                <form onSubmit={this.checkData}>
                    <h1> je m'inscris ! </h1>
                    <input className="field" type="text" placeholder="Email..." value={this.state.email} name="email" onChange={this.updateValue} />
                    <input className="field" type="password" placeholder="Password..." value={this.state.password} name="password" onChange={this.updateValue} />
                    <p className={this.state.error ? "error" : "hidden"}> {this.state.msg} </p>
                    <input className="submit" type="submit" value="Inscription"/>
                </form>
            </div>
        )
    }
}

export default RegisterPage;
