import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import axios from "../Axios/Axios";
import { message } from "antd";

function FormModal({ handleCloseModal }) {
  const { userToken } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    const formData = new FormData();
  

    formData.append("file", data.file[0]);
    formData.append("city", data.city);
    formData.append("landMark", data.landMark);
    console.log(formData,"formdata");
    axios
      .post(
        "/users/addUserdetails",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {

        if (res.data.success) {
          message.success("your city has been added");
          handleCloseModal()
        } else {
          message.error("your city has already been added");
          handleCloseModal()

        }
      });
  };

  return (
    <div className="fixed z-[1000] mt-10- inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 transition-opacity"
          onClick={handleCloseModal}
        >
          <div className="absolute inset-0 bg-gray-500 bg-opacity-70"></div>
        </div>

        {/* Modal */}
        <div className="rounded-lg  bg-opacity-70 bg-white overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-md">
          <div className="bg-[#EDF4FE] bg-opacity-70 px-4 py-3">
            <h2 className="text-lg text-center font-medium text-gray-900">
              Add your details
            </h2>
          </div>
          <div className="flex justify-center mt-8">
            <div>
              <form onSubmit={handleSubmit(submitForm)} className="">
                <div className="flex flex-col my-6">
                  <label htmlFor="city" className="mt-2 mr-2">
                    Profile Image:
                  </label>
                  <input
                    type="file"
                    className="bg-white"
                    {...register("file", { required: true })}
                  />
                  {errors.file && <span>This field is required</span>}
                </div>
                <div className="flex flex-col my-6">
                  <label htmlFor="city" className="mt-2 mr-2">
                    City:
                  </label>
                  <input
                    type="text"
                    className="bg-white"
                    {...register("city", { required: true })}
                  />
                  {errors.city && (
                    <p className="errorMsg text-red-600">fill the Field</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="landMark" className="mt-2">
                 Land Mark
                  </label>
                  <textarea
                    type="text"
                    className="bg-white"
                    {...register("landMark", { required: true })}
                  />
                  {errors.landMark && (
                    <p className="errorMsg text-red-600">fill the Field</p>
                  )}
                </div>
                <div className="flex justify-center content-center">
                  <button className="button bg-[#0e2d39] rounded-md px-4 py-1 text-white m-3 ">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="bg-[#EDF4FE] bg-opacity-70 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#0e2d39] text-base font-medium text-white hover:bg-opacity-70 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormModal;
