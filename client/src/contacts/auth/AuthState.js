import React , {useReducer} from "react";

import axios from 'axios'
import AuthContext from './AuthContext';
import authReducer from './AuthReducers';
import {
  REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_FAIL,
  LOGIN_SUCCESS, LOGOUT, AUTH_ERROR, CLEAR_ERRORS, USER_LOADED
} from '../types'
import setAuthToken from "../../utils/setAuthToken";

const AuthState = props =>{
  const initialState ={
   token:localStorage.getItem('token'),
   isAuthenticated:null,
    loading:true,
    user:null,
    error:null
  }
  const [state , dispatch] = useReducer(authReducer , initialState);

  //Load User
  const loadUser = async () =>{
    //@todo -- load token to gobal headers
    if(localStorage.token){
      setAuthToken(localStorage.token);
    }
    try{
      const res = await axios.get('/api/auth');
      dispatch({type:USER_LOADED, payload:res.data})
    }catch(err){
      dispatch({type:AUTH_ERROR, payload:err})
    }

  }

  //Register User
  const register = async formData =>{
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }
    try{
      const res = await axios.post('/api/users', formData , config);
      dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
      })
      await loadUser();

    }catch(err){
      dispatch({
        type:REGISTER_FAIL,
        payload:err.response.data.msg
      })

    }
  }

  //Login User
  const loginUser = async formData =>{
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }
    try{
      const res = await axios.post('/api/auth', formData , config);
      dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data
      })
      await loadUser();

    }catch(err){
      dispatch({
        type:LOGIN_FAIL,
        payload:err.response.data.msg
      })

    }
  }

  //Logoutre
  const logout = () => dispatch({type:LOGOUT})

  //Clear Errors
  const clearErrors = () => dispatch({type:CLEAR_ERRORS})

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated:state.isAuthenticated,
        loading:state.loading,
        user:state.user,
        error:state.error,
        loadUser ,
        register ,loginUser, logout ,clearErrors }}>
      {props.children}</AuthContext.Provider>
  )
}

export default AuthState;
