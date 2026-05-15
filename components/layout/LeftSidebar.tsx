'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AiFillHome,
  AiOutlineLineChart,
  AiOutlineBulb,
} from "react-icons/ai";
import {
  IoCompassOutline,
  IoAddOutline,
  IoSettingsOutline,
  IoMegaphoneOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
} from "react-icons/io5";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { useAuth } from "@/hooks/useAuth";
import useCommunityState from "@/hooks/community/useCommunityState";

const SKELETON_COUNT = 4;

const LeftSidebar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  // Read directly from Jotai atom — updates instantly on join/leave with no reload needed
  const { communityStateValue } = useCommunityState();
  const joinedCommunities = communityStateValue.mySnippets;
  const [showAllCommunities, setShowAllCommunities] = useState(false);

  const visibleCommunities = showAllCommunities
    ? joinedCommunities
    : joinedCommunities.slice(0, 5);

  return (
    <aside className="hidden lg:flex flex-col w-[272px] shrink-0 h-[calc(100vh-56px)] sticky top-[56px] border-r border-white/10 overflow-y-auto bg-[#0B0E11]">
      {/* Navigation Section */}
      <div className="flex flex-col gap-1 pt-3 px-3">
        <SidebarItem
          icon={<AiFillHome size={20} />}
          label="Home"
          href="/"
          active={pathname === "/"}
        />
        <SidebarItem
          icon={<AiOutlineLineChart size={20} />}
          label="Popular"
          href="/popular"
          active={pathname === "/popular"}
        />
        <SidebarItem
          icon={<IoCompassOutline size={20} />}
          label="Explore"
          href="/communities"
          active={pathname === "/communities"}
        />
        <SidebarItem
          icon={<AiOutlineBulb size={20} />}
          label="All"
          href="/all"
          active={pathname === "/all"}
        />
      </div>

      <div className="h-[1px] bg-white/10 my-3 mx-3" />

      {/* Communities Section */}
      <div className="flex flex-col px-3 mb-2">
        <div className="flex items-center justify-between px-2 py-2">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            Communities
          </span>
          {user && (
            <Link href="/communities">
              <button className="p-1 hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white">
                <IoAddOutline size={18} />
              </button>
            </Link>
          )}
        </div>

        {!user ? (
          <p className="px-2 py-3 text-[12px] text-gray-600 italic">
            Log in to see your communities
          </p>
        ) : joinedCommunities.length === 0 ? (
          <p className="px-2 py-3 text-[12px] text-gray-600 italic">
            You haven&apos;t joined any communities yet
          </p>
        ) : (
          <div className="flex flex-col gap-0.5">
            {visibleCommunities.map((snippet) => (
              <CommunityItem key={snippet.communityId} snippet={snippet} pathname={pathname} />
            ))}

            {joinedCommunities.length > 5 && (
              <button
                onClick={() => setShowAllCommunities((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 text-[13px] text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {showAllCommunities ? (
                  <>
                    <IoChevronUpOutline size={16} />
                    <span>Show less</span>
                  </>
                ) : (
                  <>
                    <IoChevronDownOutline size={16} />
                    <span>See {joinedCommunities.length - 5} more</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="h-[1px] bg-white/10 my-3 mx-3" />

      {/* Resources Section */}
      <div className="flex flex-col px-3 pb-4">
        <div className="px-2 py-2">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            Resources
          </span>
        </div>
        <SidebarItem
          icon={<IoMegaphoneOutline size={20} />}
          label="Advertise"
          href="/advertise"
          active={false}
        />
        <SidebarItem
          icon={<IoSettingsOutline size={20} />}
          label="Settings"
          href="/settings"
          active={false}
        />
      </div>
    </aside>
  );
};

/* ─── Community Item ─────────────────────────────────────────── */
interface CommunityItemProps {
  snippet: { communityId: string; imageURL?: string; isAdmin?: boolean };
  pathname: string;
}

const CommunityItem: React.FC<CommunityItemProps> = ({ snippet, pathname }) => {
  const href = `/community/${snippet.communityId}`;
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${
        active
          ? "bg-white/10 text-white"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {snippet.imageURL ? (
        <img
          src={snippet.imageURL}
          alt={snippet.communityId}
          className="w-6 h-6 rounded-full object-cover shrink-0"
        />
      ) : (
        <IoPeopleCircleOutline
          size={24}
          className={`shrink-0 ${active ? "text-[#FF5722]" : "text-gray-500 group-hover:text-[#FF5722]"} transition-colors`}
        />
      )}
      <span className="text-[13px] font-medium truncate">
        r/{snippet.communityId}
      </span>
      {snippet.isAdmin && (
        <span className="ml-auto text-[9px] font-bold text-[#FF5722] bg-[#FF5722]/10 px-1.5 py-0.5 rounded-full shrink-0">
          MOD
        </span>
      )}
    </Link>
  );
};

/* ─── Generic Sidebar Item ───────────────────────────────────── */
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href,
  active,
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
        active
          ? "bg-white/10 text-white font-bold"
          : "text-gray-400 hover:bg-white/5 hover:text-white font-bold"
      }`}
    >
      <div
        className={`${
          active ? "text-[#FF5722]" : "text-gray-400 group-hover:text-[#FF5722]"
        } transition-colors shrink-0`}
      >
        {icon}
      </div>
      <span className="text-[14px] uppercase tracking-wide">{label}</span>
    </Link>
  );
};

export default LeftSidebar;
