import React from 'react';

export default class BilletsList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {Billet: []};
      this.path = 'http://localhost:3000/users/getBillets' + window.location.pathname;
    }
  
    componentDidMount() { 
        fetch(this.path, {method: 'GET'})
            .then(response => response.json())
            .then((jsonData) => {
                this.setState({ Billet: jsonData });
            })
            .catch((error) => {
                console.error(error)
            })
    }
  
    render() {
      const Billets = this.state.Billet.map((item, i) => (
        <div key={i}>
          <h2> Billet Name : { item.Title } </h2>
          <p> Content : { item.Content } </p>
          <p> Categories : { item.Maison } { item.Jardin} { item.Voiture }</p>
          <a href={'http://localhost:3000/users/delete/' + item.Id}><button> Delete </button></a>
        </div>
      ));
      console.log(Billets);
  
      return (
        <div id="layout-content">
          <h1> --- Users Billets </h1>
          <div>{ Billets }</div>
        </div>
      );
    }
  }