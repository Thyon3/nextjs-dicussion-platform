"use client";

import {
  PageContent,
  PersonalHome,
  Posts,
  Recommendations,
  SidebarFooter,
} from "@/components";
import RecentPosts from "@/components/community/RecentPosts";
import React from "react";
import { AiOutlineBulb } from "react-icons/ai";

export default function AllPage() {
  return (
    <PageContent>
      {/* Center Content: Feed */}
      <div className="flex flex-col gap-5">
        {/* Page Header */}
        <div className="flex items-center gap-3 p-4 bg-[#1A1D23] rounded-[16px] border border-white/10 shadow-md">
          <div className="w-10 h-10 rounded-full bg-[#FF5722]/10 flex items-center justify-center text-[#FF5722]">
            <AiOutlineBulb size={22} />
          </div>
          <div>
            <h1 className="font-reddit text-[18px] font-bold text-white leading-tight">
              r/all
            </h1>
            <p className="font-reddit text-[12px] text-gray-500">
              The front page of Circus, showing all latest posts
            </p>
          </div>
        </div>

        {/* Posts Feed sorted by newest */}
        <Posts />
      </div>

      {/* Right Content: Sidebar */}
      <div className="flex flex-col gap-5">
        <RecentPosts />
        <Recommendations />
        <PersonalHome />
        <SidebarFooter />
      </div>
    </PageContent>
  );
}
