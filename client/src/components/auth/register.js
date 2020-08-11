import React, {useContext, useState , useEffect } from "react";
import AlertContext from "../../contacts/alert/AlertContext";
import AuthContext from "../../contacts/auth/AuthContext";

const Register = (props) =>{
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const {setAlert} = alertContext;
  const {register, error , clearErrors,isAuthenticated} = authContext;

  useEffect(()=>{
    if(isAuthenticated){
      props.history.push('/')
    }
    if (error === 'User already exists'){
      setAlert(error, 'danger')
      clearErrors();
    }
    //eslint-disable-next-line
  },[error, isAuthenticated , props.history])

  const [user , setuser] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  })
  const {name , email , password , password2} = user;

  const onChange = (e) =>{
    setuser({...user , [e.target.name] : e.target.value})
  }
  const onSubmit = (e) =>{
    e.preventDefault();
    if(name == '' || email == '' || password =='' ){
      setAlert('Please enter all fields', 'danger')
    }else if( password !== password2){
      setAlert('Password Does not match')
    }else{
      register({name, email , password})
      console.log('Register Submit')
    }

  }
  return(
    <div className="form-container">
      <h1>Account <span className="text-primary"> Register </span></h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required minLength="6"/>
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" value={password2} onChange={onChange} required minLength="6"/>
        </div>

        <input type="submit" value="Register" className="btn btn-primary btn-block"/>
      </form>
    </div>
  )
}
export default Register;
