import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const RoleBasedRoutes = ({children,requiredRole}) => {

    const {user,loading} =useAuth()
   //   console.log("RoleBasedRoutes user:", user, "loading:", loading);


    if(loading){
       return <div>Loading...</div>
    }

    if(!requiredRole.includes(user.role)){
      return <Navigate to="/unauthorized"></Navigate>
    }
   
    return user ? children : <Navigate to ="/login"></Navigate>
 
}

export default RoleBasedRoutes