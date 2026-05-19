'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth, useAuthModal, AuthModal } from '@/src/features/auth';
import { IoSearchOutline, IoNotificationsOutline, IoAddOutline } from 'react-icons/io5';
import UserMenu from './UserMenu';
import { useRouter } from 'next/navigation';
import { getCommunities } from '@/lib/api/community';
import { Community } from '@/types/community';
import useCallCreatePost from '@/hooks/posts/useCallCreatePost';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const { openModal } = useAuthModal();
  const { onClick: handleCreatePost } = useCallCreatePost();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Community[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!search.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const results = (await getCommunities(search)) as any;
        setSuggestions(results.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };

    const debounceFn = setTimeout(fetchSuggestions, 200);
    return () => clearTimeout(debounceFn);
  }, [search]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      if (search.trim()) {
        router.push(`/communities?search=${encodeURIComponent(search.trim())}`);
      } else {
        router.push('/communities');
      }
    }
  };

  return (
    <nav className="bg-background h-[56px] px-6 flex justify-between items-center border-b border-border sticky top-0 z-[100]">
      {/* Left Section: Logo & Links */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center cursor-pointer">
          <img src="/images/logo.svg" className="h-[28px]" alt="Circus Logo" />
          <span className="font-reddit font-bold text-[16pt] ml-2 text-foreground tracking-tighter">
            Circus
          </span>
        </Link>
      </div>

      {/* Center Section: Search Bar */}
      <div ref={searchRef} className="flex-1 max-w-[600px] mx-8 relative flex items-center">
        <div className="absolute left-4 z-10 flex items-center pointer-events-none">
          <IoSearchOutline className="text-muted-foreground text-[20px]" />
        </div>
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search communities... (Press Enter)"
          className="font-reddit w-full text-[10pt] bg-muted text-white h-[38px] rounded-full pl-11 pr-4 border border-transparent placeholder:text-muted-foreground hover:bg-white/20 hover:border-white/30 focus:outline-none focus:bg-white/20 focus:border-[#FF5722] transition-all"
        />

        {/* Search Suggestions Dropdown */}
        {showSuggestions && search.trim() && (
          <div className="absolute top-[44px] left-0 w-full bg-card border border-border rounded-[12px] shadow-lg py-2 z-50">
            {suggestions.length > 0 ? (
              suggestions.map((community) => (
                <div
                  key={community.id}
                  onClick={() => {
                    setShowSuggestions(false);
                    setSearch("");
                    router.push(`/community/${community.id}`);
                  }}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-muted cursor-pointer transition-colors"
                >
                  {community.imageURL ? (
                    <img src={community.imageURL} alt="" className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-foreground text-[10px] font-bold">
                      r/
                    </div>
                  )}
                  <span className="font-reddit text-[13px] font-medium text-foreground">
                    r/{community.id}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-[13px] text-muted-foreground text-center font-reddit">
                No communities found
              </div>
            )}
            {suggestions.length > 0 && (
              <div
                onClick={() => {
                  setShowSuggestions(false);
                  router.push(`/communities?search=${encodeURIComponent(search.trim())}`);
                }}
                className="px-4 py-2 border-t border-border text-[12px] text-blue-400 font-bold hover:bg-muted cursor-pointer font-reddit"
              >
                Search all for &quot;{search}&quot;
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-4">
        {user && (
          <button
            onClick={handleCreatePost}
            aria-label="Create Post"
            className="p-1 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors"
          >
            <IoAddOutline size={28} />
          </button>
        )}
        <button
          aria-label="Notifications"
          className="p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
        >
          <IoNotificationsOutline size={22} />
        </button>

        {user ? (
          <UserMenu />
        ) : (
          <div className="flex gap-3">
            <button
              className="px-4 py-2 text-foreground text-[10pt] font-bold hover:bg-muted rounded-full transition-colors"
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
