import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../contacts/auth/AuthContext";
import AlertContext from "../../contacts/alert/AlertContext";

const Login = (props) =>{
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const {setAlert} = alertContext;
  const {loginUser, error , clearErrors,isAuthenticated} = authContext;

  useEffect(()=>{
    if(isAuthenticated){
      props.history.push('/')
    }
    if (error === 'Invalid Credentials'){
      setAlert(error, 'danger')
      clearErrors();
    }
    //eslint-disable-next-line
  },[error, isAuthenticated , props.history])


  const [user , setuser] = useState({
    email:'',
    password:'',
  })
  const {email , password} = user;

  const onChange = (e) =>{
    setuser({...user , [e.target.name] : e.target.value})
  }
  const onSubmit = (e) =>{
    e.preventDefault();
   if(email === '' || password === ''){
     setAlert('PLease fill in all fields' , 'danger')
   }else{
      loginUser({email, password})
   }
  }
  return(
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required/>
        </div>

        <input type="submit" value="Login" className="btn btn-primary btn-block"/>
      </form>
    </div>
  )
}
export default Login;
