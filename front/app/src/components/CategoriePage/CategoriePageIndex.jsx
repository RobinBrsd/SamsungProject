import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import AllProductPage from '../AllProductPage/AllProductPageIndex';
import UnderCategorieMenuPage from '../UnderCategorieMenu/UnderCategorieMenuIndex';

class CategoriePage extends Component {

    state = {
        products: [],
        name: "",
        underName: "",
        underId: "",
        id: this.props.location.pathname.split('/')[2],
        error:false,
    }

    componentDidMount() {
        if(this.props.location.pathname.split('/')[3]) {
            this.setState({underId:this.props.location.pathname.split('/')[3]})
            let id = this.props.location.pathname.split('/')[3];

            axios({
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
                url: 'http://localhost:8000/sub_categories/' + id,
            }).then((response) => {
                this.setState({products: response.data[0], name:response.data[1].nameCategory,  underName: " / " + response.data[1].nameSubCategory});
            }).catch((error) => {
                if(error)
                    this.setState({error:true});
            });
        } else {
            axios({
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
                url: 'http://localhost:8000/categories/' + this.state.id,
            }).then((response) => {
                this.setState({products: response.data[0], name:response.data[1].nameCategory});
            }).catch((error) => {
                if(error)
                    this.setState({error:true});
            });
        }
    }

    render() {
        if(this.state.error) 
            return <Redirect to="/404" />;
        return (
            <div>
                <div className="underCategorieContainer">
                    <UnderCategorieMenuPage id={this.state.id} name={this.state.name} />
                </div>
                <AllProductPage title={this.state.name} products={this.state.products} underName={this.state.underName}/>  
            </div>
        )
    }
}

export default CategoriePage;
