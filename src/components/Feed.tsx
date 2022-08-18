import React, { useEffect, useState } from "react";
import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";
import Post from "./Post";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AnimatePresence, motion } from "framer-motion";
import CommentModal from "./CommentModal";

const Feed = () => {
  const [posts, setPosts] = useState<
    QueryDocumentSnapshot<DocumentData>[] | []
  >([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    []
  );

  return (
    <div className="border-l border-r border-gray-200 xl:ml-[370px] xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex items-center py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      <AnimatePresence>
        {posts.length &&
          posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Post key={post.id} id={post.id} post={post} />
            </motion.div>
          ))}
      </AnimatePresence>
      <CommentModal />
    </div>
  );
};

export default Feed;
