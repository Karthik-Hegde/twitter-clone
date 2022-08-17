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
import { useSession, signOut } from "next-auth/react";
import SidebarMenuItem from "./SidebarMenuItem";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();

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
        {session && (
          <>
            <SidebarMenuItem text="Notifications" Icon={BellIcon} />
            <SidebarMenuItem text="Messages" Icon={InboxIcon} />
            <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
            <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
            <SidebarMenuItem text="Profile" Icon={UserIcon} />
            <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
          </>
        )}
      </div>

      {/* Button */}
      {session ? (
        <>
          <button className="bg-blue-400 text-white rounded-full font-bold w-36 h-12 shadow-md hover:brightness-95 text-lg hidden xl:inline">
            Tweet
          </button>

          <div className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start mt-auto">
            <img
              onClick={() => signOut()}
              src={
                session.user?.image
                  ? session.user.image
                  : `https://avatars.dicebear.com/api/initials/${session.user?.name}.svg`
              }
              alt="user"
              className="h-10 w-10 ronded-full xl:mr-2"
            />
            <div className="hidden leading-5 xl:inline">
              <h4 className="font-bold">{session.user?.name}</h4>
              <p className="text-gray-500">@{session.user?.username}</p>
            </div>
            <DotsHorizontalIcon className="hidden h-5 xl:ml-8 xl:inline" />
          </div>
        </>
      ) : (
        <button
          onClick={() => router.push("/auth/signin")}
          className="bg-blue-400 text-white rounded-full font-bold w-36 h-12 shadow-md hover:brightness-95 text-lg hidden xl:inline"
        >
          Sign in
        </button>
      )}
    </div>
  );
};

export default Sidebar;
