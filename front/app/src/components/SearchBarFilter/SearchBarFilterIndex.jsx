import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import axios from 'axios';

import './index.scss';

class SearchBarFilter extends React.Component {

    state = {
        filter:'',
        curMarque:'',
        minPrice:'',
        maxPrice:'',
        allMarques:[],
    }

    marques = ['MSI','Samsung','Intel','Fuck Robin'];

    handleChange = name => event => {
        this.setState({[name]:event.target.value})
        
    }

    componentDidMount() {
            axios({
                headers: { 
                    'Content-Type': 'application/json',
                },
                method: 'GET',
                url: 'http://localhost:8000/sub_categories',
            }).then((response) => {
                this.setState({allMarques:response.data['hydra:member']})
            });
        
    }

    handleChangeReglette = event => {
        if (event.target.dataset.index === "0") {
            this.setState({minPrice:event.target.innerText})
        } else if (event.target.dataset.index === "1"){
            this.setState({maxPrice:event.target.innerText})
        }
        
    }

    render(){
        return (
            <div className="filterBar">
                <form className="formFilter">
                    <p className="filterTitle"> Filtrer </p>
                    <FormControl >
                        <InputLabel >Filtre</InputLabel>
                        <Select value={this.state.filter} onChange={this.handleChange('filter')} >
                            <MenuItem value="">Aucun</MenuItem>
                            <MenuItem value='most-popular'>Plus populaires</MenuItem>
                            <MenuItem value='rating'>Mieux notes</MenuItem>
                            <MenuItem value='most-view'>Plus vue</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel >Marque</InputLabel>
                        <Select value={this.state.curMarque} onChange={this.handleChange('curMarque')}>
                            <MenuItem value="">Tous</MenuItem>
                                {this.state.allMarques.map((marque) => (
                            <MenuItem key={marque.id} value={marque.name}>{marque.name}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <div className='reglette'>
                    <Typography gutterBottom>
                        Prix
                    </Typography>
                    <Slider
                        value={this.price}
                        onChange={this.handleChangeReglette}
                        valueLabelDisplay="auto"
                        min={0}
                        max={5000}
                        step={100}
                        defaultValue={[0, 10000]}
                    />
                    </div>
                    <div className="btnFilterContainer">
                        <button className="btnFilter" type="submit" value="filter"> Filtrer</button>
                    </div>
                </form>
            </div>
          );
     
    }
}

export default SearchBarFilter;
