import React, { Component } from 'react'
import axios from 'axios';

import UnderCategorieMenuItem from './UnderCategorieMenuItem/UnderCategorieMenuItem';
import './index.scss';

class UnderCategorieMenu extends Component {

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
        return (
            <div className="categorieContainer">
                <p draggable="false" className="menuTitle"> Materiels </p>
                { this.state.categorie.map((item) => (
                    <UnderCategorieMenuItem key={item.id} id={item.id} name={item.name} description={item.description} />
                ))}
            </div>
        )
    }
}

export default UnderCategorieMenu;
