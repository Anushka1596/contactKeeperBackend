import React, {useContext} from "react";
import AlertContext from "../../contacts/alert/AlertContext";


const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return(
    alertContext.alerts.length > 0 && alertContext.alerts.map((alert)=>
      (<div key={alert.id} className={`alert alert-${alert.type}`}>
          <i className="fa fa-info-circle" /> {alert.msg}
      </div>))
  )
}

export default Alerts;
