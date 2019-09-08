import React, { Component } from 'react';
import axios from 'axios';
import CartItem from './CartItem/CartItemIndex';

import './index.scss';

class CartPage extends Component {

    state = {
        products:[],
        reload:false,   
        recap:[],
        first:false,
    };

    componentDidMount() {
        let id = "";
        if(localStorage.getItem('user') !== null) {
            id = localStorage.getItem('user').split(',')[0];
        } else {
            id = localStorage.getItem('visitor');
        }

        axios({
            headers: { 
                'Content-Type': 'application/json',
            },
            method: 'GET',
            url: 'http://localhost:8000/paniers/user/' + id,
        }).then((response) => {
            this.setState({
                products:response.data[0],
                recap:response.data[1],
                stock:response.data[2],
            })
        })
    }

    removeItem=(id)=>{
        axios({
            headers: { 
                'Content-Type': 'application/json',
            },
            method: 'delete',
            url: 'http://localhost:8000/paniers/'+id,
        }).then((response) => {
            this.setState({reload:this.state.reload})
            window.location.reload();
        });
        
    }

    render(){
        return (
            <div className='cartContainer'>
                <div className='cart'>
                    <h2> Votre Panier </h2>
                    <div className='item'>
                    {this.state.products.map((product,id) => (
                        <CartItem key={id} item={product} removeItem={this.removeItem} stock={this.state.stock[id]}/>
                    ))}
                    </div>
                    <div className='recap'>
                        <h2>Recapitulatif</h2>
                        <p> Nombre d'article: {this.state.recap.quantity} </p>
                        <p> {this.state.recap.price} €</p>
                        <a href="/commandeInfos" className="paymentButton"> Proceder au payment </a>
                    </div> 
                </div>
            </div>
        )
        
    }
    
}

export default CartPage;
