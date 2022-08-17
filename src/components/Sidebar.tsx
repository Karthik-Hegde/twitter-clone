/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { HomeIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";
import SidebarMenuItem from "./SidebarMenuItem";

const Sidebar = () => {
  return (
    <div className="hidden fixed h-full flex-col sm:flex  p-2 xl:items-start xl:ml-24">
      <div className="hoverEffect p-0 hover:bg-blue-100 xl-px-1">
        <Image
          src={
            "https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          }
          width={50}
          height={50}
          alt="logo"
        />
      </div>

      {/* Menu */}
      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        <SidebarMenuItem text="Notifications" Icon={BellIcon} />
        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
        <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
        <SidebarMenuItem text="Profile" Icon={UserIcon} />
        <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
      </div>

      {/* Button */}
      {1 === 1 ? (
        <>
          <button className="bg-blue-400 text-white rounded-full font-bold w-36 h-12 shadow-md hover:brightness-95 text-lg hidden xl:inline">
            Tweet
          </button>

          <div className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start mt-auto">
            <img
              src="https://next-auth.js.org/img/logo/logo-xs.png"
              alt="user"
              className="h-10 w-10 ronded-full xl:mr-2"
            />
            <div className="hidden leading-5 xl:inline">
              <h4 className="font-bold">{"John Doe"}</h4>
              <p className="text-gray-500">@johndoe</p>
            </div>
            <DotsHorizontalIcon className="hidden h-5 xl:ml-8 xl:inline" />
          </div>
        </>
      ) : (
        <button className="bg-blue-400 text-white rounded-full font-bold w-36 h-12 shadow-md hover:brightness-95 text-lg hidden xl:inline">
          Sign in
        </button>
      )}
    </div>
  );
};

export default Sidebar;
