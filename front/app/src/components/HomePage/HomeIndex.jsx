import React, { Component } from 'react';
import axios from 'axios';
import AllProductPage from '../AllProductPage/AllProductPageIndex';

import Banner from './bannerMinage.png';
import BannerPromo from './bannerPromo.png';

import CategorieMenu from '../CategorieMenu/CategorieMenuIndex';

import './index.scss';
class HomePage extends Component {

    state = {
        topProductsSell: [],
        topProductsPopularity:[],
    }

    componentDidMount() {
        axios({
            headers: { 
                'Content-Type': 'application/json',
            },
            method: 'GET',
            url: 'http://localhost:8000/products/trends',
        }).then((response) => {
            this.setState({topProductsSell: response.data[0], topProductsPopularity: response.data[1]});
        });
    }

    render() {
        return (
            <div>
                <CategorieMenu />
                <div className="allProductContainer">
                    <img className="bannerHome" src={Banner} alt="yaminGraphiste"/>
                </div>
                <AllProductPage title="Top des ventes :" home="true" products={this.state.topProductsSell} />
                <AllProductPage title="Les plus populaires : " home="true" products={this.state.topProductsPopularity} />

                <div className="allProductContainer">
                    <img className="bannerHome" src={BannerPromo} alt="yaminGraphiste"/>
                </div>

            </div>
        );
    }
}

export default HomePage;