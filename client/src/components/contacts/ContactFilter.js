import React, {useContext, useEffect, useRef} from "react";
import ContactContext from "../../contacts/contact/ContactContext";

const ContactFilter = () =>{
  const contactContext = useContext(ContactContext);
  const {filterContact , clearFilter, filtered} = contactContext;
  const text = useRef('');
  useEffect(()=>{
    if(filtered == null){
      text.current.value = '';
    }
  }, [])
  const onChange = e =>{
    if(text.current.value !== ''){
      filterContact(e.target.value)
    }else{
      clearFilter();
    }
  }
  return(
    <form>
      <input ref={text} type="text" placeholder="Filtered Contacts ..." onChange={onChange} />
    </form>
  )
}

export default ContactFilter;
