import { message } from "antd";
import React,{useEffect} from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../Features/Auth/authSlice";



function ProtoctedRoute() {
 const navigate = useNavigate()
 const dispatch = useDispatch()
  const token = localStorage.getItem("userToken");

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  useEffect(() => {
    if (token) {
      const decodedJwt = parseJwt(token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        message.error("token expired");
        dispatch(logout());
        navigate("/login");
      }
    }
  }, [token,dispatch,navigate]);

  return !token ? <Navigate to="/" /> : <Outlet />;
}

export default ProtoctedRoute;
