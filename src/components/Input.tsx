/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";

const Input = () => {
  const { data: session } = useSession();

  return (
    <>
      {session && (
        <div className="flex border-b border-gray-200 p-3 space-x-3">
          <img
            onClick={() => signOut()}
            src={session?.user?.image}
            alt="user"
            className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
          />
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea
                rows={2}
                placeholder="What's happening?"
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px]"
              />
            </div>
            <div className="flex items-center justify-between pt-2.5">
              <div className="flex">
                <PhotographIcon className="h-10 w-10 p-2 text-sky-500 cursor-pointer hoverEffect hover:bg-sky-100" />
                <EmojiHappyIcon className="h-10 w-10 p-2 text-sky-500 cursor-pointer hoverEffect hover:bg-sky-100" />
              </div>
              <button className="text-white bg-blue-400 px-4 py-1.5 rounded-full font-bold cursor-pointer shadow-md hover:brightness-95 disabled:opacity-50">
                Tweet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Input;
