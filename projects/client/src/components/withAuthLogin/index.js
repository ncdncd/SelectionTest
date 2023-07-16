import React from 'react'
import { Navigate } from 'react-router-dom'


function withAuthLogin(Component) {
  return (props) => {
    
    if(localStorage.getItem("token")){    
    return <Navigate to="/" replace />
        }

    return <Component {...props} />

    }
}

export default withAuthLogin