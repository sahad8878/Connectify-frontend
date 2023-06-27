import React, {  useState } from "react";
import { useSelector } from "react-redux";

import baseUrl from "../Api/Api";
import ClosestPerson from "../Components/ClosestPerson";
import Search from "../Components/Search";
import profileImage from "../Assets/user.png";
import FormModal from "../Components/FormModal";

function Profile() {
  const { userInfo} = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="flex justify-center content-center flex-col px-5 md:px-0 ">
      <div className="flex justify-center my-10 ">
        <div className=" border-2 shadow-2xl md:p-5">
          <div className="flex justify-center">
            {userInfo && userInfo.profileImg ? (
              <img
                className="h-32    "
                src={`${baseUrl}/uploads/${userInfo.profileImg}`}
                alt=""
              />
            ) : (
              <img className="h-28 " src={profileImage} alt="" />
            )}
          </div>
          <div className="flex flex-col text-lg font-serif">
            <span className="text-center">
              {userInfo?.firstName} {userInfo?.lastName}
            </span>
            <span className="text-center">{userInfo?.username}</span>
          </div>
          <div className="flex justify-center m-6">
            {!userInfo?.profileImg && (
              <button
                onClick={handleOpenModal}
                className="px-3  bg-[#0e2d39] text-white  hover:bg-opacity-60"
              >
                Add your Details
              </button>
            )}
            {isOpen && <FormModal handleCloseModal={handleCloseModal} />}
          </div>
        </div>
      </div>

      <div className="flex sm:flex-row flex-col bg-[#ffcc05] md:min-h-[310px]  ">
        <div className=" md:w-[50%] shadow-2xl   ">
          <ClosestPerson handleOpenModal={handleOpenModal} />
        </div>
        <div className=" md:w-[50%] shadow-black">
          <Search />
        
        </div>
      </div>
    </div>
  );
}

export default Profile;
