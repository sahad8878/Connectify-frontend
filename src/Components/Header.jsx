import React, { useEffect } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "../Features/Auth/authService";
import { logout, setCredentials } from "../Features/Auth/authSlice";
import logo from "../Assets/logoHeader.png";
import axios from "../Axios/Axios";

function Header() {
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // automatically authenticate user if token is found
  const { data } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15mins
    pollingInterval: 500000,
  });
  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  const logoutHandle = () => {
    axios
      .post(
        "/users/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(async (response) => {
        dispatch(logout());
        navigate("/");
        message.success("Logout completed successfully");
      });
  };
  return (
    <div className="h-20 bg-[#0e2d39]  flex justify-between ">
      <div>
        <img src={logo} className="h-9 m-6 md:mx-16 " alt="logo" />
      </div>
      <div className="text-white">
        <div className="font-serif flex  font-medium uppercase text-base p-9 md:mr-28">
          <div>
            {userInfo ? (
              <NavLink className="button mr-4 " to="/user-profile">
                Home
              </NavLink>
            ) : (
              <NavLink className="button mr-4 " to="/">
                Home
              </NavLink>
            )}
          </div>

          {userInfo ? (
            <button className="button uppercase" onClick={logoutHandle}>
              Logout
            </button>
          ) : (
            <div>
              <NavLink className="button mr-4 " to="/register">
                Register
              </NavLink>
              <NavLink className="button " to="/login">
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
