import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

import SearchBarFilter from '../SearchBarFilter/SearchBarFilterIndex';
import UnderCategorieMenuItem from './UnderCategorieMenuItem/UnderCategorieMenuItem';
import './index.scss';

class UnderCategorieMenu extends Component {

    state = {
        categorie:[],
        error:false,
        redirect:false,
        hover:false,
    }

    redirect = () => {
        this.setState({redirect:true});
    } 

    displayGoBack = () => {
        this.setState(prevState => ({hover: !prevState.hover}));
    }

    componentDidMount() {
        axios({
            headers: { 
                'Content-Type': 'application/json',
            },
            method: 'GET',
            url: 'http://localhost:8000/categories',
        }).then((response) => {
            this.setState({categorie:response.data[1][this.props.id - 1]});
        });
    }

    render() {
        if(this.state.categorie === undefined)
            return <Redirect to="/404" />;
        if(this.state.redirect)
            return <Redirect to="/produits" />; 
        return (
            <div className="categorieContainer">
                <p onClick={this.redirect} onMouseEnter={this.displayGoBack} onMouseLeave={this.displayGoBack} draggable="false" className="menuTitle"> 
                    <FontAwesomeIcon className="iconTitle" icon={faCaretLeft} />
                    { !this.state.hover ? this.props.name : "Go Back" } 
                </p>
                { this.state.categorie.map((item) => (
                    <UnderCategorieMenuItem key={item.name} categName={this.props.name} categId={this.props.id} id={item.id} name={item.name} description={item.description} />
                ))}
                <SearchBarFilter />
            </div>
        )
    }
}

export default UnderCategorieMenu;
