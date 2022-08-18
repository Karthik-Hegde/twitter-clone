import { SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import News from "./News";
import User from "./User";

interface WidgetsProps {
  newsResults: [];
  randomUserResults: [];
}

const Widgets = ({ newsResults, randomUserResults }: WidgetsProps) => {
  const [articleNum, setArticleNum] = useState(3);
  const [randomUserNum, setRandomUserNum] = useState(3);

  return (
    <div className="hidden xl:w-[600px] lg:inline ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50 ">
        <div className="flex items-center p-3 rounded-full relative">
          <SearchIcon className="h-5 z-50 text-gray-500" />
          <input
            type="text"
            placeholder="Search twitter"
            className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100"
          />
        </div>
      </div>

      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">Whats happening</h4>
        <AnimatePresence>
          {newsResults?.slice(0, articleNum).map((article) => (
            <motion.div
              key={article.article}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <News key={article.article} article={article} />
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          onClick={() => setArticleNum(articleNum + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show more
        </button>
      </div>
      <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        <AnimatePresence>
          {randomUserResults.slice(0, randomUserNum).map((randomUser) => (
            <motion.div
              key={randomUser.login.username}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <User key={randomUser.login.username} userData={randomUser} />
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          onClick={() => setRandomUserNum(randomUserNum + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default Widgets;
