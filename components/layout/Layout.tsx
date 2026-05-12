import React, { ReactNode } from "react";
import Navbar from "../navbar/Navbar";
import GlobalHooks from "./GlobalHooks";
import LeftSidebar from "./LeftSidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <GlobalHooks />
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <main className="flex-1 min-h-[calc(100vh-56px)] bg-[#0B0E11]">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
