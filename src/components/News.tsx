/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

const News = ({ article }: { article: {} }) => {
  return (
    <a rel="noreferrer" href={article.url} target="_blank">
      <div className="flex items-center justify-between px-4 space-x-1 hover:bg-gray-200 transition duration-500 ease-out">
        <div className="space-y-0.5">
          <h6 className="text-sm font-bold dark:text-white">{article.title}</h6>
          <p className="text-xs font-medium text-gray-500 dark:text-[#5B6065]">
            {article.source.name}
          </p>
        </div>
        {/* <div className="w-[70px] h-[70px] relative">
          <Image
            src={`https://res.cloudinary.com/demo/image/fetch/${article.urlToImage}`}
            width={70}
            height={70}
            alt=""
            className="rounded-xl"
          />
        </div> */}
        <img
          src={`${article.urlToImage}`}
          width={70}
          alt=""
          className="rounded-xl"
        />
      </div>
    </a>
  );
};

export default News;
