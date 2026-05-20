import React, { ReactNode, useState } from "react";
import Navbar from "../../src/features/auth/components/Navbar";
import GlobalHooks from "./GlobalHooks";
import LeftSidebar from "./LeftSidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <GlobalHooks />
      <Navbar toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <div className="flex relative">
        <LeftSidebar isOpen={isMobileMenuOpen} closeMenu={() => setIsMobileMenuOpen(false)} />
        <main className="flex-1 min-h-[calc(100vh-56px)] bg-background">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
