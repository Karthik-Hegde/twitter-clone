import React from "react";
import Meta from "./Meta";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Meta />
      {children}
    </>
  );
};

export default Layout;
