/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { getProviders, signIn } from "next-auth/react";
import { Provider } from "next-auth/providers";

const Signin = ({ providers }: { providers: { [name: string]: Provider } }) => {
  return (
    <div className="flex justify-center mt-20 space-x-4">
      <img
        src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
        alt=""
        className="hidden md:inline-flex object-cover md:w-44 md:h-80 rotate-6"
      />
      <div className="flex flex-col items-center">
        <Image
          width={144}
          height={144}
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          alt=""
          objectFit="cover"
        />
        <p className="text-center text-sm italic my-10">
          This app is created for learning purposes
        </p>
        {Object.values(providers)?.map((provider) => (
          <button
            key={provider.id}
            className="bg-red-400 rounded-lg p-3 my-4 text-white hover:bg-red-500"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Sign in with {provider.name}
          </button>
        ))}
        {/* <button className="bg-red-400 rounded-lg p-3 my-4 text-white hover:bg-red-500">
          Sign in with Google
        </button>
        <button className="rounded-lg p-3 my-4 text-white bg-gray-800 hover:bg-gray-900">
          Sign in with Github
        </button> */}
      </div>
    </div>
  );
};

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
