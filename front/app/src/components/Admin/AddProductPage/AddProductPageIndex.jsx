import React, { Component } from 'react';
import axios from 'axios';

class CreatedProduitsForm extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            data: {},
            categories: [],
            sousCategories: [],
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let tmp = this.state.data;
        tmp[name] = value;

        this.setState({[name]: value, data: tmp});
    }

    static isEmpty(obj)
    {
        for(let key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }


    componentDidMount = () => {
        this.getCategories();
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

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.data !== CreatedProduitsForm.isEmpty(this.state.data))
        {
            axios.post('http://localhost:8000/products', {
                "categoryId": parseInt(this.state.data.categoryId),
                "title": this.state.data.title,
                "description": this.state.data.description,
                "picture": this.state.data.picture,
                "video": this.state.data.video,
                "details": this.state.data.details,
                "price": parseInt(this.state.data.price),
                "subCategoryId": parseInt(this.state.data.subCategoryId),
                "stock": parseInt(this.state.data.stock),
                "sold": parseInt(this.state.data.sold),
                "afterSold": parseInt(this.state.data.afterSold)
            }).then(function (response) {
                window.location.replace("http://localhost:3000/admin");
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    render() {
        return (
            <div className="sectionAdminContainer">
                <div className="sectionAdminEditBackground">
                <div className="categorieTitleContainer">
                    <h2 className="sectionAdminTitle"> Add Product </h2>
                </div>
                <form className="formAdminContainer" onSubmit={this.handleSubmit}>
                    <label>
                        CategoryId :
                        <select name="categoryId" onChange={this.handleInputChange}>
                            {
                                this.state.categories.map((categories, index) => (
                                    <option key={index} value={categories.id} >{categories.name}</option>
                                ))
                            }
                        </select>
                    </label>

                    <label>
                        Title :
                        <input
                            name="title"
                            type="text"
                            placeholder=" Titre du produits (ex: MacBook )  "
                            onChange={this.handleInputChange} />
                    </label>

                    <label>
                        description:
                        <textarea name="description" onChange={this.handleInputChange} />
                    </label>

                    <label>
                        picture :
                        <input
                            name="picture"
                            type="text"
                            placeholder=" Le lien de votre image "
                            onChange={this.handleInputChange} />
                    </label>

                    <label>
                        video :
                        <input
                            name="video"
                            type="text"
                            placeholder=" Le lien de votre video "
                            onChange={this.handleInputChange} />
                    </label>

                    <label>
                        details:
                        <textarea name="details" onChange={this.handleInputChange} />
                    </label>

                    <label>
                        prix de solde :
                        <input
                            name="price"
                            type="number"
                            placeholder=" prix de solde "
                            onChange={this.handleInputChange} />
                    </label>

                    <label>
                        subCategoryId :
                        <select value={this.state.value} name="subCategoryId" onChange={this.handleInputChange}>
                            {
                                        this.state.sousCategories.map((item, i) => (
                                            <option key={i} value={item.id}>{ item.title }</option>
                                        ))

                            }
                        </select>
                    </label>

                    <label>
                        stock :
                        <input
                            name="stock"
                            type="number"
                            placeholder=" numbre de stock "
                            onChange={this.handleInputChange} />
                    </label>

                    <label>
                        pourcentage solde :
                        <input
                            name="sold"
                            type="number"
                            placeholder="pourcentage solde"
                            onChange={this.handleInputChange} />
                    </label>

                    <label>
                        prix  :
                        <input
                            name="afterSold"
                            type="number"
                            placeholder="prix du produits"
                            onChange={this.handleInputChange} />
                    </label>

                    <input type="submit" value="Envoyer" />

                </form>
                </div>
            </div>
        );
    }


}

export default CreatedProduitsForm;