/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";

interface PostProps {
  id: string;
  post: {
    id: string;
    name: string;
    userImg: string;
    img: string;
    text: string;
    timestamp: string;
  };
}

const Post = ({ id, post }: PostProps) => {
  return (
    <div className="flex p-3 border-b border-gray-200 cursor-pointer">
      <img
        src={post.userImg}
        alt={post.name}
        className="w-11 h-11 rounded-full mr-4"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[15px] hover:underline">
              {post.name}
            </h4>
            <span className="text-sm sm:text-[15px]">@{post.name} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              {post.timestamp}
            </span>
          </div>
          <DotsHorizontalIcon className="h-10 w-10 hover:bg-sky-100 hoverEffect hover:text-sky-500 p-2" />
        </div>

        {/* text and image */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {post.text}
        </p>
        <img src={post.img} alt={post.id} className="rounded-xl mr-2" />

        {/* Icons */}
        <div className="flex items-center justify-between pt-2 text-gray-500">
          <div className="flex items-center select-none">
            <ChatIcon className="h-9 w-9 p-2  hover:text-sky-500 hover:bg-sky-100 hoverEffect " />
            <span className="text-sm">{10}</span>
          </div>
          <TrashIcon className="h-9 w-9 p-2  hover:text-red-600 hover:bg-red-100 hoverEffect " />
          <div className="flex items-center select-none">
            <HeartIcon className="h-9 w-9 p-2  hover:text-red-600 hover:bg-red-100 hoverEffect " />
            <span className="text-sm">{10}</span>
          </div>
          <ShareIcon className="h-9 w-9 p-2  hover:text-sky-500 hover:bg-sky-100 hoverEffect " />
          <ChartBarIcon className="h-9 w-9 p-2  hover:text-sky-500 hover:bg-sky-100 hoverEffect " />
        </div>
      </div>
    </div>
  );
};

export default Post;
