import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

import './index.scss';

class EditProductPage extends Component {

    state = {
        id: "",
        categoryId: "",
        categoryName:"",
        title: "",
        description: "",
        picture: "",
        details: "",
        price: "",
        subCategoryId: "",
        subCategoryName:"",
        stock: "",
        sold: "",
        afterSold: "",
    }

    componentDidMount = () => {
        this.getProduct();
    }

    getProduct = () => {
        var id = parseInt(this.props.location.pathname.split('/')[3]);
        axios({
            headers: { 'Content-Type': 'application/json', },
            method: 'GET',
            url: 'http://localhost:8000/products/' + id,
        }).then((response) => {
            let data = response.data;
            this.setState({
                id: data[0][0].id,
                categoryId: data[0][0].categoryId,
                categoryName: data[1].nameCategory,
                title: data[0][0].title,
                description: data[0][0].description,
                picture: data[0][0].picture,
                details: data[0][0].details,
                price: Math.round(data[0][0].price),
                subCategoryId: data[1].idSubCategory,
                subCategoryName: data[1].nameSubCategory,
                stock: data[0][0].stock,
                sold: data[0][0].sold,
                afterSold: Math.round(data[0][0].afterSold),
            });
        }); 
    }

    updateValue = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    postEditProduct = (e) => {
        e.preventDefault();

        var data = {
            categoryId: this.state.categoryId,
            title: this.state.title,
            description: this.state.description,
            picture: this.state.picture,
            details: this.state.details,
            price: this.state.price,
            subCategoryId: this.state.subCategoryId,
            stock: this.state.stock,
            sold: this.state.sold,
            afterSold: this.state.afterSold,
        }

        axios({
            headers: { 'Content-Type': 'application/json', },
            method: 'PUT',
            url: 'http://localhost:8000/products/' +  this.props.location.pathname.split('/')[3],
            data:data,
        }).then((response) => {
            this.getProduct();
        }); 
    }

    render() {
        return (
            <div className="sectionAdminContainer">
                <div className="sectionAdminEditBackground">
                <div className="categorieTitleContainer">
                    <h2 className="sectionAdminTitle"> Edit Product </h2>
                </div>

                    <div className="formAdminContainer">
                        <form onSubmit={this.postEditProduct}>
                            <label htmlFor="title"> Product Name : </label>
                            <input type="text" value={this.state.title} name="title" id="title" onChange={this.updateValue}/>

                            <label htmlFor="description"> Product Description : </label>
                            <textarea value={this.state.description} name="description" id="description" onChange={this.updateValue}></textarea>

                            <label htmlFor="details"> Product Details : </label>
                            <textarea value={this.state.details} name="details" id="details" onChange={this.updateValue}></textarea>

                            <label htmlFor="price"> Product Price : </label>
                            <input type="number" value={this.state.price} name="price" id="price" onChange={this.updateValue}/>

                            <label htmlFor="sold"> Product Sold : </label>
                            <input type="number" value={this.state.sold} name="sold" id="sold" onChange={this.updateValue}/>

                            <label htmlFor="afterSold"> Product afterSold Price : </label>
                            <input type="number" value={this.state.afterSold} name="afterSold" id="tafterSold" onChange={this.updateValue}/>

                            <label htmlFor="stock"> Product Stock : </label>
                            <input type="number" value={this.state.stock} name="stock" id="stock" onChange={this.updateValue}/>

                            <button type="submit"> Editer </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProductPage;