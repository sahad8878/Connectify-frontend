import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import baseUrl from "../Api/Api";
import axios from "../Axios/Axios";
function Search() {
  const { userToken } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    let searchData = async () => {
      try {
        axios
          .get(`/users/getSearchData?search=${search}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((response) => {
            setSearchData(response.data.search);
          });
      } catch (err) {
        console.log(err);
      }
    };

    searchData();
  }, [search,userToken]);

  const handleSearch = (event) => {
    setSearch(event.target.value);

  };
  return (
    <div className=" shadow-l-2xl">
      <h1 className="text-center text-2xl text-[#0e2d39] font-bold font-sans p-7  ">
        Search location find your friends
      </h1>

      <div className="flex justify-center">
        <dir className="md:px-36 ">
          <div className="relative ">
            <span className="absolute inset-y-0 left-0 flex items-center py-4">
              <button
                type="submit"
                className="p-2 focus:outline-none focus:ring"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </span>
            <input
              name="search"
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search Location..."
              className="md:w-72 h-7 py-2 pl-10 text-sm rounded-full focus:outline-none"
            />
          </div>
        </dir>
      </div>
      <div className="grid  grid-cols-1 lg:grid-cols-2  gap-4 p-5 ">
        {searchData &&
          search &&
          searchData.map((user) => (
            <div className="flex h-32 flex-col items-center bg-white border border-gray-200 rounded-md  shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer">
              <div className=" flex flex-col p-3 text-base font-semibold">
                <h1>
                  {user.firstName}
                  {user.lastName}
                </h1>
                <h1>{user.username}</h1>
              </div>
              <div className="m-3">
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
      </div>
    </div>
  );
}

export default Search;
