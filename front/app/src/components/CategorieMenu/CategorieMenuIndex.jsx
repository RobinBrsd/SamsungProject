import React, { Component } from 'react'
import axios from 'axios';

import CategorieMenuItem from './CategorieMenuItem/CategorieMenuItem';
import './index.scss';
import SearchBarFilter from '../SearchBarFilter/SearchBarFilterIndex';

class CategorieMenu extends Component {

    state = {
        categorie:[],
    }

    componentDidMount() {
        axios({
            headers: { 
                'Content-Type': 'application/json',
            },
            method: 'GET',
            url: 'http://localhost:8000/categories',
        }).then((response) => {
            this.setState({categorie:response.data[0]});
        });
    }

    render() {
        if(this.props.all) {
            return (
                <div className="homeCategorieContainer">
                    <p draggable="false" className="homeMenuTitle"> Materiels </p>
                    { this.state.categorie.map((item) => (
                        <CategorieMenuItem key={item.id} id={item.id} name={item.name} description={item.description} />
                    ))}
                     <SearchBarFilter />
                </div>
            );
        }
        return (
            <div className="homeCategorieContainer">
                <p draggable="false" className="homeMenuTitle"> Materiels </p>
                { this.state.categorie.map((item) => (
                    <CategorieMenuItem key={item.id} id={item.id} name={item.name} description={item.description} />
                ))}
            </div>
        )
    }
}

export default CategorieMenu;
