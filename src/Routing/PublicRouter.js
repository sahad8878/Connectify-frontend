import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'

function PublicRouter() {
  const { userInfo} = useSelector((state) => state.auth)


    return (
      userInfo ? <Navigate to="/user-profile"/> :  <Outlet/>
        )
    
}

export default PublicRouter
