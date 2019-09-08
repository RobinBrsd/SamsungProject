import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import { Redirect } from 'react-router';
import { ReactComponent as PanierSVG } from './paper-bag.svg';
import Magnifier from "react-magnifier";

import "./index.scss";
import CategorieMenu from '../CategorieMenu/CategorieMenuIndex';

class DetailProduct extends React.Component {
      state = {
          curPic:'',
          idProduct:this.props.location.pathname.split('/')[2],
          product:[],  
          error:false,
          quantity:1,
        };

  

    componentDidMount() {
      axios({
          headers: { 
              'Content-Type': 'application/json',
          },
          method: 'GET',
          url: 'http://localhost:8000/products/'+this.state.idProduct,
      }).then((response) => { 
          this.otherPic.push(response.data[0][0].picture,"https://previews.123rf.com/images/chuyu/chuyu1401/chuyu140100095/25831615-fond-abstrait-avec-carte-de-circuit-imprim%C3%A9-d-ordinateur-bleu.jpg")
          this.setState({
            product:response.data[0][0],
            curPic:response.data[0][0].picture,
          });
      }).catch((error)=>{
        if (error) {
          this.setState({error:true});
        }
      });
    }

    otherPic=[];

    createTable = () => {
      var pics = []
      for (let i = 0; i < this.otherPic.length; i++) {
          pics.push(<li key={i}><img onMouseOver={this.setCurPic} width="50px" height="50px" src={this.otherPic[i]} alt='product'/></li>)
      }
      return pics;
    }

    setCurPic = (e) =>{
        this.setState({
          curPic: e.target.src,
        });
        
    }

    handleQuantity = (op) =>{
      if (op === '-' && this.state.quantity >1) {
          this.setState({quantity:this.state.quantity-1})
      } else if (op === '+' && this.state.quantity < this.state.product.stock) {
          this.setState({quantity:this.state.quantity+1})
      }
      
    }

    addPanier = () => {
      let id = "";
      var dataCart = {};

      if(this.state.product.sold === null) {
          if(localStorage.getItem('user') !== null) {
            id = localStorage.getItem('user').split(',')[0];
            dataCart = {
              userId: parseInt(id),
              title: this.state.product.title ,
              productId: this.state.product.id,
              quantity:this.state.quantity,
              weight:this.state.product.weight * this.state.quantity,
              price:this.state.product.price*this.state.quantity
            }
          } else {
            id = localStorage.getItem('visitor');
            dataCart = {
              token: id,
              title: this.state.product.title,
              productId: this.state.product.id,
              quantity:this.state.quantity,
              weight:this.state.product.weight * this.state.quantity,
              price:this.state.product.price * this.state.quantity
            }
          }
      } else {
        if(localStorage.getItem('user') !== null) {
          id = localStorage.getItem('user').split(',')[0];
          dataCart = {
            userId: parseInt(id),
            title: this.state.product.title ,
            productId: this.state.product.id,
            quantity:this.state.quantity,
            weight:this.state.product.weight * this.state.quantity,
            price:this.state.product.afterSold * this.state.quantity
          }
      } else {
          id = localStorage.getItem('visitor');
          dataCart = {
            token: id,
            title: this.state.product.title,
            productId: this.state.product.id,
            quantity:this.state.quantity,
            weight:this.state.product.weight * this.state.quantity,
            price:this.state.product.afterSold * this.state.quantity
          }
      }
      }

      axios({
        headers: { 
            'Content-Type': 'application/json',
        },
        method: 'POST',
        url: 'http://localhost:8000/paniers',
        data: JSON.stringify(dataCart),
      }).then((response) => {
          window.location.reload();
      });

    }

    render() {
      var product = this.state.product;
      if (this.state.error){
        return <Redirect to='/404'/>;
      }
      if(this.state.product.sold === null) {
        return (
          <div>
            <CategorieMenu />
            <div className="detailProduct">
              <div className="detailProductBackground">
                  <h2 className="titleProduct" >{product.title}</h2>
                  <div className="infosContainer">
                      <div className="smallPicProduct">
                        <ul>{this.createTable()}</ul>
                      </div>
                      <div className="picContainer">
                      <Magnifier 
                        src={this.state.curPic}
                        mgShape='square'
                        mgHeight={300}
                        mgWidth={300}
                        zoomFactor={0.6}
                        width={'90%'}
                       />
                      </div>
                      <div className="descProduct">
                        <p className="label"> Description : </p>
                        <p> {product.description} </p>
                        <p className="label"> Details : </p>
                        <p>{product.details}</p>
                        <p className="stock">{product.stock} en stock </p>
                    </div>
                </div>
                <div className="bottomContainer">
                  <div className="button" onClick={() => this.addPanier(this.state.idProduct)}>
                      <div className="buttonBackground"> Ajouter au panier
                        <div className="btnPanier"> <PanierSVG className="logoPanier"/> </div>
                      </div>
                  </div>
                  <div className='counter'>
                  <button onClick={()=>this.handleQuantity("-")}> - </button>
                    <p> {this.state.quantity} </p>
                    <button onClick={()=>this.handleQuantity("+")}> + </button>
                  </div>
                  <StarRatingComponent name="rate" value={product.rating} starCount={5}/>
                  <p className="price" >{product.price} €</p>
                </div>
              </div>
            </div>
            </div>
        );
      } else {
        return (
          <div>
            <CategorieMenu />
            <div className="detailProduct">
              <div className="detailProductBackground">
                  <h2 className="titleProduct" >{product.title}</h2>
                  <div className="infosContainer">
                      <div className="smallPicProduct">
                        <ul>{this.createTable()}</ul>
                      </div>
                      <div className="picContainer">
                      <Magnifier 
                        src={this.state.curPic}
                        mgShape='square'
                        mgHeight={300}
                        mgWidth={300}
                        zoomFactor={0.6}
                        width={'90%'}
                       />
                      </div>
                      <div className="descProduct">
                        <p className="label"> Description : </p>
                        <p> {product.description} </p>
                        <p className="label"> Details : </p>
                        <p>{product.details}</p>
                        <p className="stock">{product.stock} en stock </p>
                    </div>
                </div>
                <div className="bottomContainer">
                  <div className="button" onClick={() => this.addPanier(this.state.idProduct)}>
                      <div className="buttonBackground"> Ajouter au panier
                        <div className="btnPanier"> <PanierSVG className="logoPanier"/> </div>
                      </div>
                  </div>
                  <div className='counter'>
                  <button onClick={()=>this.handleQuantity("-")}> - </button>
                    <p> {this.state.quantity} </p>
                    <button onClick={()=>this.handleQuantity("+")}> + </button>
                  </div>
                  <StarRatingComponent name="rate" value={product.rating} starCount={5}/>
                    <p className="newPrice"> { product.afterSold } €</p>
                    <div className="priceSoldContainer">
                      <p className="priceSold" >{product.price} € </p>
                      <span className="priceReduc"> -{ product.sold }% </span>
                  </div>
                </div>
              </div>
            </div>
            </div>
        );
      }
    }
  }
  
  export default DetailProduct;
