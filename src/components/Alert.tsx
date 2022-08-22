import React from "react";

const Alert = () => {
  return (
    <div className="h-16 sm:h-[74px] fixed bottom-0 pt-1 left-0 w-screen bg-sky-500 text-white">
      <div className="flex min-w-full mx-auto justify-center">
        {/* <div className="hidden sm:w-[275px]">hello</div> */}
        <div className="hidden sm:flex sm:flex-col">
          <h2 className="font-bold text-lg md:text-2xl">
            Don’t miss what’s happening
          </h2>
          <span className="">People on Twitter are the first to know.</span>
        </div>
        <div className="flex items-center mt-3 sm:ml-12 xl:ml-32">
          <button className="py-0.5 px-20 sm:px-5 sm:py-1 border border-gray-100 rounded-full mr-4">
            Log in
          </button>
          <button className="py-0.5 px-20 sm:px-5 sm:py-1 border border-gray-100 rounded-full bg-white text-black font-semibold">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
