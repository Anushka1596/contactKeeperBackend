import React, {useContext} from "react";
import AuthContext from "../../contacts/auth/AuthContext";
import Route from "react-router-dom/es/Route";
import Redirect from "react-router-dom/es/Redirect";

const PrivateRoute = ({component:Component , ...rest}) =>{
  const authContext = useContext(AuthContext);
  const {isAuthenticated, loading} = authContext;
  return (
    <Route  {...rest} render={props => !isAuthenticated && !loading ? (
      <Redirect to='/login'/>
    ) : (
      <Component {...props}/>
    ) } />
  )
}

export default PrivateRoute;
