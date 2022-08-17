import React from "react";
import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";
import Post from "./Post";

const Feed = () => {
  const posts = [
    {
      id: "1",
      name: "John Doe",
      userImg:
        "https://images.unsplash.com/profile-1647784171251-63ae54296932image?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
      img: "https://images.unsplash.com/photo-1660678473509-120139e9317b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
      text: "nice view!",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      name: "John Doe",
      userImg:
        "https://images.unsplash.com/profile-1647784171251-63ae54296932image?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
      img: "https://images.unsplash.com/photo-1660678732383-1ad7842ed297?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      timestamp: "5 hours ago",
    },
  ];
  return (
    <div className="border-l border-r border-gray-200 xl:ml-[370px] xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex items-center py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
