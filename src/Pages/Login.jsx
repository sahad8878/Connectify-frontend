import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import logImg from "../Assets/vote.png";
import axios from "../Axios/Axios";
import { message } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import { userLogin } from "../Features/Auth/authActions";

function Login() {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/user-profile");
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {

    dispatch(userLogin(data));
  };
  const handelGoogleSignIn = async (response) => {
    const decoded = jwtDecode(response.credential);

    const { email, family_name, given_name } = decoded;

    const { data } = await axios.post("/users/googleLogin", {
      email: email,
      firstName: given_name,
      lastName: family_name,
    });
    if (data.success) {
      localStorage.setItem("userToken", data.token);
      navigate("/user-profile");
      message.success("Login successful");
    }
  };

  return (
    <div className="text-center flex justify-center content-center">
      <div className="shadow-lg shadow-[#0e2d39]  border-2 rounded-2xl  my-16 p-14 ">
        <div className="flex justify-center content-center">
          <img src={logImg} className="h-28" alt="" />
        </div>
        <h1 className="text-xl font-bold font-serif text-[#0e2d39] ">
          Login Here..
        </h1>

        <form onSubmit={handleSubmit(submitForm)} className="">
          <div className="form-group  text-left mt-4 flex flex-col">
            <label className="text-left font-semibold " htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="form-input rounded-sm border-[#0e2d39] border-2"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="errorMsg text-red-600">Please check the Email</p>
            )}
          </div>
          <div className="form-group text-left flex flex-col mt-2">
            <label htmlFor="password" className="text-left font-semibold ">
              Password
            </label>
            <input
              type="password"
              className="form-input rounded-sm border-[#0e2d39] border-2"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="errorMsg text-red-600">Please check the Password</p>
            )}
          </div>
          <div className="my-2">
            <h1 className="text-sm ">
              Create New Account?
              <NavLink
                to="/register"
                className="text-[#0e2d39] ml-2 text-base font-semibold"
              >
                Signup
              </NavLink>{" "}
            </h1>
          </div>
          {error && <p className="text-red-400 p-2">{error}</p>}

          <button
            type="submit"
            className="button px-5 py-0.5 bg-[#0e2d39] mt-5 font-semibold rounded-md text-white "
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <h1 className="my-2 font-bold">OR</h1>
        <GoogleLogin
          size="large"
          onSuccess={(response) => {
            handelGoogleSignIn(response);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
}

export default Login;
