import Head from "next/head";
import React from "react";

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const Meta = ({ title, description, keywords }: MetaProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="color-scheme" content="light dark" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Twitter Clone",
  description: "Twitter clone website using Next.js",
  keywords: "twitter news",
};

export default Meta;
