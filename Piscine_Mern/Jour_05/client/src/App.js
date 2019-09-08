import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './Custom.css';
import BilletsList from './billets.js';

function App() {
  return (
    <Router>
      <Nav/>
      <div>
        <Route exact path="/"/>
        <Route path="/users/login" component={Login} />
        <Route path="/users/register" component={Register} />
        <Route exact path="/:login" component={Profile} />
      </div>
    </Router>
  );
}

function Nav() {
  return (
    <div className="nav">
      <h1> NavBar </h1>
    </div>
  );
}

function Profile(props) {
  return (
    <div>
      <h1> Welcome : {props.match.params.login} </h1>
      <form method="post" className="form-container" action="http://localhost:3000/users/publishBillet">
          <h1> ----- Create Billet : </h1>
          <label> Title : </label>
          <input type="text" name="Title" required/><br/>
          <label> Content : </label>
          <input type="text" name="Content" required/><br/>
          <label> Categories : </label>
          <input type="checkbox" name="Maison" value="Maison"/> House |
          <input type="checkbox" name="Jardin" value="Jardin"/> Garden |
          <input type="checkbox" name="Voiture" value="Voiture"/> Car
          <input type="submit" value="Publish"/>
      </form>
      <BilletsList/>
    </div>
  );
}

function Login() {
  return (
    <div className="form-container">
      <h2> ---- Login Page </h2><br/>
      <form method="post" action="http://localhost:3000/users/login">
          <label> Login : </label>
          <input type="text" name="Login" min-length="5" max-length="20" required/><br/>
          <label> Password : </label>
          <input type="password" name="Password" required/><br/>
          <input type="submit" value="Login"/>
      </form>
    </div>
  );
}

function Register() {
  return (
    <div className="form-container">
      <h2> ---- Register Page </h2><br/>
      <form method="post" action="http://localhost:3000/users/register">
          <label> Login : </label>
          <input type="text" name="Login" min-length="5" max-length="20" required/><br/>
          <label> Email : </label>
          <input type="email" name="Email" required/> <br/>
          <label> Password : </label>
          <input type="password" name="Password" required/><br/>
          <label> Confirm : </label>
          <input type="password" name="PasswordConfirm" required/><br/><br/>
          <input type="submit" value="Inscription"/>
      </form>
    </div>
  );
}
export default App;