/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore";
import { formatDistance } from "date-fns";
import { db, storage } from "../../firebase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";
import Image from "next/image";

interface PostProps {
  id: string;
  post: QueryDocumentSnapshot<DocumentData>;
}

const Post = ({ id, post }: PostProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [comments, setComments] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [openModal, setOpenModal] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot) => setComments(snapshot.docs)
    );

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes, session]);

  const likePost = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
          username: session?.user?.username,
        });
      }
    } else {
      router.push("/auth/signin");
    }
  };

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteDoc(doc(db, "posts", id));
      if (post.data().image) {
        deleteObject(ref(storage, `posts/${id}/image`));
      }
      router.push("/");
    }
  };

  return (
    <>
      {post && (
        <div className="flex p-3 border-b border-gray-200 cursor-pointer">
          <div className="relative h-11 w-11 rounded-full overflow-hidden mr-4">
            <Image
              layout="fill"
              objectFit="cover"
              src={post.data().userImg}
              alt={post.data().name}
              className="rounded-full mr-4"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 whitespace-nowrap text-gray-800 dark:text-[#5B6065]">
                <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                  {post.data().name}
                </h4>
                <span className="text-sm sm:text-[15px]">
                  @{post.data().username} -{" "}
                </span>
                <span className="text-sm sm:text-[15px] hover:underline">
                  {post.data().timestamp &&
                    formatDistance(
                      new Date(post.data().timestamp.toDate()),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                </span>
              </div>
              <DotsHorizontalIcon className="h-10 w-10 hover:bg-sky-100 hoverEffect hover:text-sky-500 p-2" />
            </div>

            {/* text and image */}
            <p className="text-[15px] sm:text-[16px] mb-2">
              {post.data().text}
            </p>
            {post.data().image && (
              <img
                onClick={() => router.push(`/posts/${id}`)}
                src={post.data().image}
                alt={post.data().id}
                className="rounded-xl mr-2"
              />
            )}

            {/* Icons */}
            <div className="flex items-center justify-between pt-2 text-gray-500">
              <div className="flex items-center select-none">
                <ChatIcon
                  onClick={() => {
                    if (session) {
                      setPostId(id);
                      setOpenModal(!openModal);
                    } else {
                      router.push("/auth/signin");
                    }
                  }}
                  className="h-9 w-9 p-2  hover:text-sky-500 hover:bg-sky-100 hoverEffect "
                />
                {comments.length > 0 && (
                  <span className="text-sm">{comments.length}</span>
                )}
              </div>
              {session?.user?.uid === post.data().id && (
                <TrashIcon
                  onClick={deletePost}
                  className="h-9 w-9 p-2  hover:text-red-600 hover:bg-red-100 hoverEffect "
                />
              )}
              <div className="flex items-center select-none">
                {hasLiked ? (
                  <HeartIconFilled
                    onClick={likePost}
                    className="h-9 w-9 p-2 hoverEffect text-red-600 hover:bg-red-100 "
                  />
                ) : (
                  <HeartIcon
                    onClick={likePost}
                    className="h-9 w-9 p-2  hover:text-red-600 hover:bg-red-100 hoverEffect"
                  />
                )}
                {likes.length > 0 && (
                  <span
                    className={`${
                      hasLiked && "text-red-600"
                    } text-sm select-none`}
                  >
                    {" "}
                    {likes.length}
                  </span>
                )}
              </div>
              <ShareIcon className="h-9 w-9 p-2  hover:text-sky-500 hover:bg-sky-100 hoverEffect " />
              <ChartBarIcon className="h-9 w-9 p-2  hover:text-sky-500 hover:bg-sky-100 hoverEffect " />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
