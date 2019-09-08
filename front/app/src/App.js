import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import uuidv4 from 'uuid';
import './styles/app.scss';

// Components
import NavBar from './components/NavBar/NavBarIndex';
import HomePage from './components/HomePage/HomeIndex';
import RegisterPage from './components/RegisterPage/RegisterIndex';
import ProductPage from './components/DetailProduct/DetailProductIndex';
import CategoriePage from './components/CategoriePage/CategoriePageIndex';
import AllProductPage from './components/AllProductPage/AllProductPageIndex';
import ResultatRecherchePage from './components/ResultatRecherchePage/ResultatRechercheIndex';
import CartPage from './components/CartPage/CartPageIndex';
import ProfilePage from './components/ProfilePage/ProfilePageIndex';
import CommandeInfosPage from './components/CommandeInfosPage/CommandeInfosPageIndex';
import SuivisCommandePage from './components/SuivisCommandesPage/SuivisCommandesPageIndex';

import AdminPanel from './components/Admin/AdminIndex';
import AdminEditProductPage from './components/Admin/EditProductPage/EditProductPage';
import AdminAddProductPage from './components/Admin/AddProductPage/AddProductPageIndex';

// 404 PAGES NOT FOUND
import ErrorPage from './components/Error404/ErrorIndex';

class App extends Component {
  state = {
      user_logged: false,
      user_id:"",
      user_role:"",
  }

  componentDidMount() {
      let user = localStorage.getItem('user');
      let visitor = localStorage.getItem('visitor');

      if (user !== null) {
          let id = user.split(',')[0];
          let role = user.split(',')[1];
          this.setState({user_logged: true, user_id:id, role:role});
      } else if(visitor === null) {
          localStorage.setItem('visitor', uuidv4());
      }
  }

  render() {
    return (
        <Router>
            <NavBar user_logged={this.state.user_logged} />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/categorie" component={CategoriePage} />
              <Route path="/produits" component={AllProductPage} />
              <Route path="/detailProduct/:id?" component={ProductPage} />
              <Route path="/search" component={ResultatRecherchePage} />
              <Route path="/panier" component={CartPage} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/commandeInfos" component={CommandeInfosPage} />
              <Route path="/commandeSuivis" component={SuivisCommandePage} />

              <Route exact path="/admin" component={AdminPanel} />
              <Route path="/admin/editProduct/:id?" component={AdminEditProductPage} />
              <Route path="/admin/addProduct/" component={AdminAddProductPage} />

              <Route component={ErrorPage} />
            </Switch>
        </Router>
    );
  }
}

export default App;