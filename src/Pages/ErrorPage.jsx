import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className="flex  justify-center h-screen  items-center">
    <div className="  text-center space-y-4  ">
      <h1 className="text-7xl  text-shadow font-bold ">404</h1>
      <h1 className="uppercase text-2xl ">OPPS! Page not found</h1>
      <div className="cursor-pointer text-xl font-semibold hover:text-[#0e2d39]   uppercase">
        <Link to="/" className="">
          Go to home
        </Link>
      </div>
    </div>
  </div>
  )
}

export default ErrorPage
