/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Image from "next/image";

const Input = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const [loading, setLoading] = useState(false);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session?.user?.uid,
      text: input,
      userImg: session?.user?.image,
      timestamp: serverTimestamp(),
      name: session?.user?.name,
      username: session?.user?.username,
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        console.log(downloadURL);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };

  const addImageToPost = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (!e.target.files) {
      return;
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result);
    };
  };

  return (
    <>
      {session && (
        <div className="flex border-b border-gray-200 p-3 space-x-3">
          <div className="relative h-11 w-11 rounded-full overflow-hidden">
            <Image
              layout="fill"
              objectFit="cover"
              onClick={() => signOut()}
              src={
                session.user?.image
                  ? session.user.image
                  : `https://avatars.dicebear.com/api/initials/${session.user?.name}.svg`
              }
              alt="user"
              className="rounded-full cursor-pointer hover:brightness-95"
            />
          </div>
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={2}
                placeholder="What's happening?"
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] dark:bg-[#202327] dark:placeholder-[#5B6065]"
              />
            </div>
            {selectedFile && (
              <div className="relative">
                <XIcon
                  onClick={() => setSelectedFile(null)}
                  className="h-7 border text-black absolute cursor-pointer shadow-md border-white m-1 rounded-full"
                />
                <img
                  src={selectedFile}
                  alt=""
                  className={`${loading && "animate-pulse"}`}
                />
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5">
              {!loading && (
                <>
                  <div className="flex">
                    <div className="">
                      <PhotographIcon
                        onClick={() =>
                          filePickerRef.current && filePickerRef.current.click()
                        }
                        className="h-10 w-10 p-2 text-sky-500 cursor-pointer hoverEffect hover:bg-sky-100"
                      />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                    <EmojiHappyIcon className="h-10 w-10 p-2 text-sky-500 cursor-pointer hoverEffect hover:bg-sky-100" />
                  </div>
                  <button
                    disabled={!input.trim()}
                    className="text-white bg-blue-400 px-4 py-1.5 rounded-full font-bold cursor-pointer shadow-md hover:brightness-95 disabled:opacity-50"
                    onClick={sendPost}
                  >
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Input;
