/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { formatDistance } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";

const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [post, setPost] = useState<DocumentSnapshot<DocumentData> | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const [input, setInput] = useState("");

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      setPost(snapshot);
    });
  }, [postId]);

  const sendComment = async () => {
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: input,
      name: session?.user?.name,
      username: session?.user?.username,
      userImg: session?.user?.image,
      timestamp: serverTimestamp(),
      userId: session?.user?.uid,
    });

    setOpen(false);
    setInput("");
    router.push(`/posts/${postId}`);
  };

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white  border-2 border-gray-200 rounded-xl shadow-md"
        >
          <div className="p-1">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <div
                onClick={() => setOpen(false)}
                className="hoverEffect w-10 h-10 flex items-center justify-center"
              >
                <XIcon className="h-[23px] text-gray-700 p-0" />
              </div>
            </div>
            <div className="p-2 flex items-center space-x-1 relative dark:text-black">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
              <div className="relative h-11 w-11 mr-4">
                <Image
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  src={post?.data()?.userImg}
                  alt={post?.data()?.name}
                />
              </div>
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post?.data()?.name}
              </h4>
              <span className="text-sm sm:text-[15px]">
                @{post?.data()?.username} -{" "}
              </span>
              <span className="text-sm sm:text-[15px] hover:underline">
                {post?.data()?.timestamp &&
                  formatDistance(
                    new Date(post?.data()?.timestamp.toDate()),
                    new Date(),
                    {
                      addSuffix: true,
                    }
                  )}
              </span>
            </div>
            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
              {post?.data()?.text}
            </p>

            <div className="flex p-3 space-x-3">
              <div className="relative h-11 w-11 rounded-full">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={session?.user?.image || ""}
                  alt=""
                  className="rounded-full cursor-pointer hover:brightness-95"
                />
              </div>
              <div className="w-full divide-y divide-gray-200">
                <div className="">
                  <textarea
                    rows={2}
                    placeholder="Tweet your reply"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className={
                      "w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                    }
                  />
                </div>

                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex">
                    <PhotographIcon className="h-10 w-10 p-2 text-sky-500 cursor-pointer hoverEffect hover:bg-sky-100" />
                    <EmojiHappyIcon className="h-10 w-10 p-2 text-sky-500 cursor-pointer hoverEffect hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={sendComment}
                    disabled={!input.trim()}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CommentModal;
