import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Features/Auth/authActions";
import { useNavigate, NavLink } from "react-router-dom";

function Register() {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (success) navigate("/login");
    if (userInfo) navigate("/home");
  }, [navigate, userInfo, success]);
  const submitForm = (data) => {
    dispatch(registerUser(data));
  };
  return (
    <div className="text-center flex justify-center content-center">
      <div className="shadow-lg shadow-[#0e2d39]  border-2 rounded-2xl  my-16 p-14 ">
        <h1 className="text-xl font-bold font-serif text-[#0e2d39] ">
          Register Here..
        </h1>

        <form onSubmit={handleSubmit(submitForm)} className="">
          <div className="form-group  text-left mt-4 flex flex-col">
            <label className="text-left font-semibold " htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              className="form-input rounded-sm border-[#0e2d39] border-2"
              {...register("firstName", {
                required: true,
                maxLength: 50,
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: "Invalid first name",
                },
              })}
            />
            {errors.firstName && (
              <p className="errorMsg text-red-600">
                Please check the First Name
              </p>
            )}
          </div>{" "}
          <div className="form-group  text-left mt-4 flex flex-col">
            <label className="text-left font-semibold " htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              className="form-input rounded-sm border-[#0e2d39] border-2"
              {...register("lastName", {
                required: true,
                maxLength: 50,
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: "Invalid last name",
                },
              })}
            />
            {errors.lastName && (
              <p className="errorMsg text-red-600">
                Please check the Last Name
              </p>
            )}
          </div>
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
              Already have one?
              <NavLink
                to="/login"
                className="text-[#0e2d39] ml-2 text-base font-semibold"
              >
                Login
              </NavLink>{" "}
            </h1>
          </div>
          {error && <p className="text-red-400 p-2">{error}</p>}
          <button
            type="submit"
            className="button px-5 py-0.5 bg-[#0e2d39] mt-5 font-semibold rounded-md text-white "
          >
            {loading ? "Loading..." : "Registe"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
