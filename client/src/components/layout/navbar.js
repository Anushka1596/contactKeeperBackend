import React, {Fragment , useContext} from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import AuthContext from "../../contacts/auth/AuthContext";
import ContactContext from "../../contacts/contact/ContactContext";


const Navbar = ({title , icon}) =>{
  const authContext = useContext(AuthContext);
  const contactContacts = useContext(ContactContext);
  const {logout, isAuthenticated , user } = authContext;
  const {clearContacts} = contactContacts;

  const onLogout =() =>{
    logout();
    clearContacts()
  }


  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li><a href="#!" onClick={()=>onLogout()}>
        <i className="fa fa-sign-out"><span className="hide-sm">Logout</span></i>
      </a></li>
    </Fragment>
  )
  const guestLinks = (
    <Fragment>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register">Register</Link></li>
    </Fragment>
  )
  return(
    <div className="navbar bg-primary">
   <h1>
     <i className={icon}>{title}</i>
   </h1>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  )
}

Navbar.propTypes ={
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
}

Navbar.defaultProps ={
  title:' Contact Keeper',
  icon: 'fa fa-id-card mr-1'
}

export default Navbar
