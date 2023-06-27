import React from "react";
import masterImg from "../Assets/master.png";
import { NavLink } from "react-router-dom";
function Home() {
  return (
    <div className="flex justi content-center h-screen">
      <div className="flex flex-col justify-center w-[50%] ">
        <h1 className="text-3xl font-sans text-center font-bold">
          Login here and Connect with your friends
        </h1>
        <div className=" flex justify-center p-10 ">
          <NavLink
            className="button px-7 bg-[#0e2d39] text-lg font-semibold uppercase text-white "
            to="/login"
          >
            Login
          </NavLink>
        </div>
      </div>
      <div className="flex justify-center   w-[50%]">
        <img src={masterImg} className="mt-2 h-[500px]" alt="" />
      </div>
    </div>
  );
}

export default Home;
