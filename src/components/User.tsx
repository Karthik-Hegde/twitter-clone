/* eslint-disable @next/next/no-img-element */
import React from "react";

const User = ({ userData }: { userData: {} }) => {
  return (
    <div
      key={userData.login.username}
      className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-500 ease-out"
    >
      <img
        src={userData.picture.thumbnail}
        alt={userData.login.username}
        width={"40"}
        className={"rounded-full"}
      />
      <div className="truncate ml-4 leading-5">
        <h4 className="font-bold hover:underline text-[14px] truncate">
          {userData.login.username}
        </h4>
        <h5 className="text-[13px] text-gray-500 truncate">
          {userData.name.first + " " + userData.name.last}
        </h5>
      </div>
    </div>
  );
};

export default User;
