import React, {Fragment} from 'react';
import {BrowserRouter as Router , Route , Switch } from "react-router-dom"
import './App.css';
import Navbar from "./components/layout/navbar";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import ContactState from "./contacts/contact/ContactState";
import AuthState from "./contacts/auth/AuthState";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import AlertSate from "./contacts/alert/AlertState";
import Alerts from "./components/layout/alerts";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";


if(localStorage.getItem('token')){
  setAuthToken(localStorage.getItem('token'));
}

const App =() => {
  return (
    <AuthState>
    <ContactState>
      <AlertSate>
    <Router>
      <Fragment>
        <Navbar/>
        <div className="container">
          <Alerts/>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Fragment>
    </Router>
      </AlertSate>
    </ContactState>
    </AuthState>
  );
}

export default App;
