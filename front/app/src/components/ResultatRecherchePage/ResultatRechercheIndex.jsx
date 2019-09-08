import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';

import AllProductPage from '../AllProductPage/AllProductPageIndex';
import CategorieMenu from '../CategorieMenu/CategorieMenuIndex';

class ResultatRecherche extends Component {

    state = {
        products:[],
        title: "", 
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);
        axios({
            headers: { 
                'Content-Type': 'application/json',
            },
            method: 'GET',
            url: 'http://localhost:8000/products?title=' + parsed.search,
        }).then((response) => {
            this.setState({products: response.data['hydra:member'], title: "Resultat recherche pour : " + parsed.search});
        });
    }

    render() {
        return (
            <div>
                <CategorieMenu all="true"/>
                <AllProductPage title={this.state.title} products={this.state.products}/>
            </div>
        )
    }
}

export default ResultatRecherche;