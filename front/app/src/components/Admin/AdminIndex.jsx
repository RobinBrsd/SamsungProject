import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

import './index.scss';

class AdminIndex extends Component {

    state = {
        admin:true,
        categories: [],
        sousCategories: [],
        users: [],
        products: [],

        formCategorieName: "",
        formCategorieDescription: "",

        formSousCategorieName: "",
        formSousCategorieId: "",

        code: "",
        amount:"",
    }

    componentDidMount = () => {
        this.getCategories();
        this.getUsers();
        this.getProducts();

        if(localStorage.getItem('user') !== null) {
            var role = localStorage.getItem('user').split(',')[1];
            if(role !== "ROLE_ADMIN") {
                this.setState({admin:false});
            }
        } else {
            this.setState({admin:false});
        }
    }

    getCategories = () => {
        axios({
            headers: { 'Content-Type': 'application/json', },
            method: 'GET',
            url: 'http://localhost:8000/categories',
        }).then((response) => {
            this.setState({categories:response.data[0], sousCategories:response.data[1]});
        }); 
    }

    getUsers = () => {
        axios({
            headers: { 'Content-Type': 'application/json', },
            method: 'GET',
            url: 'http://localhost:8000/users',
        }).then((response) => {
            this.setState({users:response.data["hydra:member"]});
        }); 
    }

    getProducts = () => {
        axios({
            headers: { 'Content-Type': 'application/json', },
            method: 'GET',
            url: 'http://localhost:8000/products',
        }).then((response) => {
            this.setState({products:response.data["hydra:member"]});
        }); 
    }

    deleteProduct = (id) => {
        axios({
            headers: { 'Content-Type': 'application/json', },
            method: 'DELETE',
            url: 'http://localhost:8000/products/' + id,
        }).then((response) => {
            this.getProducts();
        });
    }

    deleteCategorie = (id) => {
        axios({
            headers: { 'Content-Type': 'application/json', },
            method: 'DELETE',
            url: 'http://localhost:8000/categories/' + id,
        }).then((response) => {
            this.getCategories();
        });
    }

    updateValue = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    addCategories = (e) => {
        e.preventDefault();
        let data = {
            name:this.state.formCategorieName,
            description:this.state.formCategorieDescription,
            picture:"https://picsum.photos/400/400",
        }

        axios({
            headers: { 'Content-Type': 'application/json', },
            method: 'POST',
            url: 'http://localhost:8000/categories',
            data:data,
        }).then((response) => {
            this.setState({formCategorieName: "", formCategorieDescription:''});
            this.getCategories();
        });
    }

    addSousCategories = (e) => {
        e.preventDefault();
        let data = {
            categoryId: parseInt(this.state.formSousCategorieId),
            name: this.state.formSousCategorieName,
        }

        axios({
            headers: { 'Content-Type': 'application/json', },
            method: 'POST',
            url: 'http://localhost:8000/sub_categories',
            data:data,
        }).then((response) => {
            this.setState({formSousCategorieId:"", formSousCategorieName:""})
            this.getCategories();
        });
    }

    addCodePromo = (event) => {
        event.preventDefault();
        if (this.state.code !== "" && this.state.amount !== "") {
            axios.post('http://localhost:8000/promos', {
                "code": this.state.code,
                "amount": parseInt(this.state.amount)
            }).then((response) => {

                this.setState({code:"", amount:""})
            });
        }
    }

    reOrderProduct = (id, quantity) => {
        let data = {
            stock:quantity,
        }

        axios({
            headers: { 'Content-Type': 'application/json', },
            method: 'POST',
            url: 'http://localhost:8000/products/fill/' + id,
            data: data,
        }).then((response) => {
            this.getProducts();
        });
    }

    getDoc = () => {
        axios({
            headers: { 'Content-Type': 'application/json', },
            method: 'GET',
            url: 'http://localhost:8000/admin/stats',
        });
    }

    render() {
        if(!this.state.admin){
            return <Redirect to="/"/>
        }

        return (
            <div>

                <form onSubmit={this.addCodePromo} className="addCodePromo">
                    <h3> Add a Promo Code </h3>
                    <input name="code" onChange={this.updateValue} value={this.state.code} type="text" placeholder="Promo Code Name..." />
                    <input className="number" name="amount" onChange={this.updateValue} value={this.state.amount} type="number" placeholder="Promo Code Amount..." />
                    <button type="submit"> Go ! </button>
                </form>
                <div className="sectionAdminContainer">
                    <div className="sectionAdminBackground">
                    <div className="categorieTitleContainer">
                        <h2 className="sectionAdminTitle"> Liste des Produits </h2>
                    </div>
                        <div className="sectionAdminList">
                        <a href="/admin/addProduct" className="btnAddProduct" type="button"> Ajouter un produit </a>
                            {this.state.products.map((produit, i) => (
                                <div className="adminProductContainer" key={i}>
                                    <div className={(produit.stock >= 30) ? "bar-green" : (produit.stock > 0) ? "bar-yellow" : "bar-red"}> {produit.stock} </div>
                                    <img className="adminProductImg" src={produit.picture} alt="imgProd"/>
                                    <div className="adminProductCase"> 
                                        <span className="productCaseTitle"> ID </span>
                                        <span className="productCaseInfos"> {produit.id} </span>
                                    </div>
                                    <div className="adminProductCase"> 
                                        <span className="productCaseTitle"> CATEGORY ID </span>
                                        <span className="productCaseInfos"> {produit.categoryId} </span>
                                    </div>
                                    <div className="adminProductCase"> 
                                        <span className="productCaseTitle"> NAME </span>
                                        <span className="productCaseInfos"> {produit.title} </span>
                                    </div>
                                    <div className="adminProductCase"> 
                                        <span className="productCaseTitle"> SELLS </span>
                                        <span className="productCaseInfos"> {produit.sells} </span>
                                    </div>
                                    <div className="adminProductCase"> 
                                        <span className="productCaseTitle"> PRICE </span>
                                        <span className="productCaseInfos"> {produit.price}€</span>
                                    </div>
                                    <div className="adminProductCase"> 
                                        <span className="productCaseTitle"> SOLD </span>
                                        <span className="productCaseInfos"> {produit.sold}% </span>
                                    </div>
                                    <div className="adminProductCase"> 
                                        <span className="productCaseTitle"> AFTER SOLD </span>
                                        <span className="productCaseInfos"> {produit.afterSold}€ </span>
                                    </div>

                                    <button className="adminEditProduct"> 
                                        <a href={"/admin/editProduct/" + produit.id}> EDIT </a>
                                    </button>
    
                                    <div className="orderProductContainer">
                                        <button onClick={() => this.reOrderProduct(produit.id, 15)} className="adminOrderProduct"> ORDER x15 </button>
                                        <button onClick={() => this.reOrderProduct(produit.id, 30)} className="adminOrderProduct"> ORDER x30 </button>
                                    </div>
                                    <button onClick={() => this.deleteProduct(produit.id)} className="adminDeleteProduct"> DELETE </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="sectionAdminContainer"> 
                    <div className="sectionAdminBackground">
                    <div className="categorieTitleContainer">
                        <h2 className="sectionAdminTitle"> Liste des Categories </h2>
                    </div>
                        <div className="sectionAdminList categoriesList">
                            {this.state.categories.map((categorie, i) => (
                                <div className="adminProductContainer" key={i}>
                                    <img className="adminProductImg" src={categorie.picture} alt="imgProd"/>
                                    <div className="adminProductCase"> 
                                        <span className="productCaseTitle"> ID </span>
                                        <span className="categoriesCaseInfos"> {categorie.id} </span>
                                    </div>
                                    <div className="adminCategoriesCase"> 
                                        <span className="productCaseTitle"> NAME </span>
                                        <span className="categoriesCaseInfos"> {categorie.name} </span>
                                    </div>
                                    <div className="adminCategoriesCase"> 
                                        <span className="productCaseTitle"> DESCRIPTION </span>
                                        <span className="categoriesCaseInfos"> {categorie.description} </span>
                                    </div>

                                    <div className="adminCategoriesCase"> 
                                        <span className="productCaseTitle"> SOUS CATEGORIES </span>
                                        <span className="categoriesCaseInfos">
                                            { this.state.sousCategories[i].map((obj, i) => (
                                                obj.name + " / "
                                            ))} 
                                        </span>
                                    </div>
                                    <button onClick={() => this.deleteCategorie(categorie.id)} className="adminDeleteProduct"> DELETE </button>
                                </div>
                            ))}

                            <form onSubmit={this.addCategories} className="addCategories">
                                <h3> Add a Categories </h3>
                                <input name="formCategorieName" value={this.state.formCategorieName} onChange={this.updateValue} type="text" placeholder="Categories Name..." />
                                <textarea name="formCategorieDescription" value={this.state.formCategorieDescription} onChange={this.updateValue} placeholder="Categorie Description..."/>
                                <button type="submit"> Go ! </button>
                            </form>

                            <form onSubmit={this.addSousCategories} className="addSousCategories">
                                <h3> Add a SubCategories </h3>
                                <input name="formSousCategorieName" value={this.state.formSousCategorieName} onChange={this.updateValue} type="text" placeholder="Sous Categories Name..." />
                                <select onChange={this.updateValue} name="formSousCategorieId" >
                                    <option defaultValue disabled> Categorie : </option>
                                    {this.state.categories.map((obj, i) => (
                                        <option key={i} value={obj.id}> { obj.name } </option>
                                    ))}
                                </select> 
                                <button type="submit"> Go ! </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="sectionAdminContainer"> 
                    <div className="sectionAdminBackground">
                    <div className="categorieTitleContainer">
                        <h2 className="sectionAdminTitle"> Liste des Utilisateurs </h2>
                    </div>
                        <div className="sectionAdminList">
                            {this.state.users.map((user, i) => (
                                <div key={i}>
                                    <span> ID : {user.id} /|/ </span>
                                    <span> ROLE : {user.role} /|/ </span>
                                    <span> EMAIL : {user.email} </span>
                                </div>
                            ))}
                        </div>
                        <button onClick={this.getDoc} type="button"> Get excel document ! </button>
                    </div>
                </div>
            </div>
        )
    }
}


export default AdminIndex;