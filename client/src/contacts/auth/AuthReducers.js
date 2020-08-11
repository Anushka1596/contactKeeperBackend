import {
  AUTH_ERROR,
  CLEAR_ERRORS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS, USER_LOADED
} from "../types";

export default (state, action) =>{
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {...state , ...action.payload, isAuthenticated:true, loading:false}
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token')
      return {...state , error:action.payload, token:null, user:null ,  isAuthenticated:null, loading:false}
    case CLEAR_ERRORS:
      return {...state , error: null}
    case USER_LOADED:
        return {...state , isAuthenticated: true , loading: false , user: action.payload}
    default:
      return state;


  }
}
