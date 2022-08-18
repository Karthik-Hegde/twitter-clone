import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { Meta, Sidebar, Widgets, Post, Comment } from "../../components";
import type { NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";

const PostPage: NextPage = ({ newsResults, randomUserResults }) => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<DocumentSnapshot<DocumentData>>();
  const [comments, setComments] = useState<
    QueryDocumentSnapshot<DocumentData>[] | []
  >([]);

  useEffect(() => {
    if (typeof id === "string") {
      onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot));
    }
  }, [id]);

  useEffect(() => {
    if (typeof id === "string") {
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      );
    }
  }, [id]);

  return (
    <div className="flex">
      <Meta title={"Post Page"} />
      <main className="flex min-h-screen mx-auto">
        <Sidebar />

        <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex items-center space-x-2  py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <div
              className="hoverEffect flex items-center justify-center"
              onClick={() => router.push("/")}
            >
              <ArrowLeftIcon className="h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
              Tweet
            </h2>
          </div>
          <Post id={id} post={post} />
          {comments.length > 0 && (
            <div className="">
              <AnimatePresence>
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <Comment
                      key={comment.id}
                      commentId={comment.id}
                      originalPostId={id}
                      comment={comment.data()}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <Widgets
          newsResults={newsResults}
          randomUserResults={randomUserResults}
        />
      </main>
    </div>
  );
};

export default PostPage;

export async function getServerSideProps() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());

  const randomUserResults = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  ).then((res) => res.json());

  return {
    props: {
      newsResults: newsResults.articles,
      randomUserResults: randomUserResults.results,
    },
  };
}
