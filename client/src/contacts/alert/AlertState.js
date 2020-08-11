import React , {useReducer} from "react";

import AlertContext from "./AlertContext";
import alertReducer from './AlertReducer';
import {SET_ALERT, REMOVE_ALERT} from '../types'

const AlertSate = props =>{
  const initialState =[];
  const [state , dispatch] = useReducer(alertReducer , initialState);

  //SET ALERT

  const setAlert = (msg, type, timeout= 5000) => {
    const id = Math.ceil(Math.random());
    dispatch({
      type: SET_ALERT,
      payload:{msg, type , id}
    });
    setTimeout(()=> dispatch({type:REMOVE_ALERT , payload: id}), timeout)
  }

  return (
    <AlertContext.Provider
      value={{alerts:state , setAlert}}>
      {props.children}</AlertContext.Provider>
  )
}

export default AlertSate;
