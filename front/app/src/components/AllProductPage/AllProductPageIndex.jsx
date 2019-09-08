import React, { Component } from 'react';
import axios from 'axios';

import ProductItem from './ProductItem/ProductItemIndex';
import CategorieMenu from '../CategorieMenu/CategorieMenuIndex';

import './index.scss';

class AllProductPage extends Component {

    state = {
        products:[],
        fake : [
            { id: 9997, title:"fake", rating: 3 },
            { id: 9998, title:"fake", rating: 3 },
        ],
        home: true,
    }

    componentDidMount() {
        if(!this.props.home || window.location.pathname === '/produits') {
            this.setState({home: false});
        }

        if(!this.props.products) {
            axios({
                headers: { 
                    'Content-Type': 'application/json',
                },
                method: 'GET',
                url: 'http://localhost:8000/products',
            }).then((response) => {
                let tab = [];
                tab = response.data["hydra:member"];
                tab.push(this.state.fake[0], this.state.fake[1]);
                this.setState({products:tab});
            });
        }
    }

    render(){
        if(this.props.products) {
            if(!this.state.home) {
                this.props.products.push(this.state.fake[0], this.state.fake[1]);
                return (
                    <div>
                        <div className="allProductContainer">
                            <div className="productContainerBackground">
                            <div className="categorieTitleContainer">
                                <h2 className="categorieTitle"> {this.props.title} {this.props.underName}</h2>
                            </div>
                                {this.props.products.map((product) => (
                                    <ProductItem key={product.id} item={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }
            return (
                <div>
                    <div className="allProductContainer">
                        <div className="productContainerBackground">
                        <div className="categorieTitleContainer">
                            <h2 className="categorieTitle"> {this.props.title} </h2>
                        </div>
                        {this.props.products.map((product) => (
                            <ProductItem home="true" key={product.id} item={product} />
                        ))}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <CategorieMenu all="true"/>
                <div className="allProductContainer">
                    <div className="productContainerBackground">
                        <div className="categorieTitleContainer">
                            <h2 className="categorieTitle"> Tous nos produits </h2>
                        </div>
                        {this.state.products.map((product) => (
                            <ProductItem key={product.id} item={product} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default AllProductPage;
