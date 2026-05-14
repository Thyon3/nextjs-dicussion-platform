'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth, useAuthModal, AuthModal } from '@/src/features/auth';
import { IoSearchOutline, IoNotificationsOutline } from 'react-icons/io5';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { openModal } = useAuthModal();

  return (
    <nav className="bg-[#0B0E11] h-[56px] px-6 flex justify-between items-center border-b border-white/10 sticky top-0 z-[100]">
      {/* Left Section: Logo & Links */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center cursor-pointer">
          <img src="/images/logo.svg" className="h-[28px]" alt="Circus Logo" />
          <span className="font-bold text-[16pt] ml-2 text-white tracking-tighter">
            Circus
          </span>
        </Link>
      </div>

      {/* Center Section: Search Bar */}
      <div className="flex-1 max-w-[600px] mx-8 relative flex items-center">
        <div className="absolute left-4 z-10 flex items-center pointer-events-none">
          <IoSearchOutline className="text-gray-400 text-[20px]" />
        </div>
        <input
          placeholder="Search communities..."
          className="w-full text-[10pt] bg-white/10 text-white h-[38px] rounded-full pl-11 pr-4 border border-transparent placeholder:text-gray-500 hover:bg-white/20 hover:border-white/30 focus:outline-none focus:bg-white/20 focus:border-[#FF5722] transition-all"
        />
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-4">
        <button
          aria-label="Notifications"
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <IoNotificationsOutline size={22} />
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-[9pt] font-bold text-white hidden lg:block">
              {user.displayName || user.email?.split('@')[0]}
            </span>
            <button
              className="h-[36px] px-4 rounded-full text-[10pt] font-bold text-white border border-white/30 hover:bg-white/10 transition-colors"
              onClick={logout}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              className="px-4 py-2 text-white text-[10pt] font-bold hover:bg-white/10 rounded-full transition-colors"
              onClick={() => openModal('login')}
            >
              Log In
            </button>
            <button
              className="bg-[#FF5722] text-white h-[36px] px-6 rounded-full text-[10pt] font-bold hover:bg-[#E64A19] transition-colors"
              onClick={() => openModal('signup')}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>

      <AuthModal />
    </nav>
  );
};

export default Navbar;
