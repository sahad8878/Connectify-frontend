import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import baseUrl from "../Api/Api";
import axios from "../Axios/Axios";

function ClosestPerson({ handleOpenModal }) {
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const [neibors, setNeibors] = useState([]);

  useEffect(() => {
    axios
      .get("/users/getNatives", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setNeibors(response.data.city);
      });
  }, [userToken]);
  return (
    <div className="shadow-r-black">
      <h1 className="text-center text-2xl text-[#0e2d39] font-bold font-sans p-8  ">
        Here are your natives{" "}
      </h1>
      {userInfo?.profileImg ? (
        <div>
          {
            userInfo?.profileImg && neibors.length !== 0 ?


        <div className="grid  grid-cols-1 lg:grid-cols-2  gap-4 p-5 ">
          {neibors.map((user) => (
            <div className="flex h-32 flex-col items-center bg-white border border-gray-200 rounded-md  shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer">
              <div className=" flex flex-col p-3 m-5 text-base font-semibold">
                <h1>
                  {user.firstName}
                  {user.lastName}
                </h1>
                <h1>{user.username}</h1>
              </div>
              <div className="">
                {user?.profileImg && (
                  <img
                    className="h-28 w-28  rounded-full"
                    src={`${baseUrl}/uploads/${user?.profileImg}`}
                    alt="pro"
                  />
                )}
              </div>
            </div>
          ))}
        </div> :
        <div className="text-center text-xl pb-14 font-medium text-white">Your neighbors have not registered yet..!</div>
          }
        </div>
      ) : (
        <div className="md:flex text-center space-y-3 p-2 pb-12  justify-center md:mt-7">
          <h1 className="font-semibold text-xl ">
            Add your details and view your natives
          </h1>
          <button
            onClick={handleOpenModal}
            className="px-3 ml-8 bg-[#0e2d39] text-white  hover:bg-opacity-60"
          >
            Add your Details
          </button>
        </div>
      )}
    </div>
  );
}

export default ClosestPerson;
