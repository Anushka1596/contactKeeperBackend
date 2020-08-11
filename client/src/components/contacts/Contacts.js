import React, {Fragment, useContext, useEffect} from 'react';
import {CSSTransition , TransitionGroup} from "react-transition-group";
import ContactContext from '../../contacts/contact/ContactContext';
import ContactItem from "./ContactItem";
import Spinner from "../layout/spinner";

const Contacts = () =>{
  const contactContext = useContext(ContactContext)
  const { contacts, filtered, getContacts , loading} = contactContext;

  useEffect(()=>{
    getContacts();
    //eslint-disable-next-line
  }, [])
  if(contacts && contacts.length == 0 && !loading){
    return <h4>PLease add a contact</h4>
  }
  return(
    <Fragment>
      { contacts != null && !loading ? (
        <TransitionGroup>
          { filtered != null ?
            filtered.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem  contact={contact} /></CSSTransition>))
            :
            contacts.map((contact)=>
              (<CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} /></CSSTransition>))
          }
        </TransitionGroup>
      ) : <Spinner/>}

    </Fragment>
  )
}

export default Contacts;
