import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

import './index.scss';

class CartItem extends Component {
    state = {
        quantity:this.props.item.quantity,
        price:this.props.item.price,
        weight:this.props.item.weight,
      };


    changeItem = (op) =>{
        var priceUnit= this.state.price / this.state.quantity;
        var weightUnit= this.state.weight / this.state.quantity;
        var dataItem={};
        let id = "";
        if(localStorage.getItem('user') !== null) {
            id = localStorage.getItem('user').split(',')[0];
        } else {
            id = localStorage.getItem('visitor');
        }

        if (op === '-' && this.state.quantity >1) {
            this.setState({quantity:this.state.quantity - 1});
             dataItem ={
                 userId: parseInt(id),
                 quantity:this.state.quantity - 1,
                 price:this.state.price - priceUnit,
                 weight:this.state.weight - weightUnit,
             }
        } else if (op === '+' && this.state.quantity < this.props.stock) {
            this.setState({quantity:this.state.quantity + 1});
             dataItem ={
                 userId: parseInt(id),
                 quantity:this.state.quantity + 1,
                 price:this.state.price + priceUnit,
                 weight:this.state.weight + weightUnit,
             }

            
        }
        axios({
            headers: { 
                'Content-Type': 'application/json',
            },
            method: 'put',
            url: 'http://localhost:8000/paniers/'+this.props.item.id,
            data: JSON.stringify(dataItem),
        }).then((response) => {
          this.setState({
              quantity:response.data.quantity,
              price: response.data.price,
              weight:response.data.weight,
            })
        })

    }


    render(){
        return(
            <div className="itemPanierContainer">
                <p className="itemPanierTitle">{this.props.item.title}  <strong>X {this.state.quantity}</strong></p>
                <div className="itemInfosContainer">
                    <div>
                        <p>{this.state.price}€ </p>
                        <p>{this.props.stock} Disponible </p>
                    </div>
                    <div className='counter'>
                    <button onClick={() => this.changeItem('-')}> - </button>
                        <p> {this.state.quantity} </p>
                    <button onClick={() => this.changeItem('+')}> + </button>
                  </div>
                    <Fab onClick={() => this.props.removeItem(this.props.item.id)}>
                        <DeleteIcon />
                    </Fab>
                </div>
            </div>
        )        
    }
    
}

export default CartItem;
