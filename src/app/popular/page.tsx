"use client";

import {
  PageContent,
  Posts,
  Recommendations,
  SidebarFooter,
} from "@/components";
import RecentPosts from "@/components/community/RecentPosts";
import React from "react";
import { AiOutlineLineChart } from "react-icons/ai";

export default function PopularPage() {
  return (
    <PageContent>
      {/* Center Content: Feed */}
      <div className="flex flex-col gap-5">
        {/* Page Header */}
        <div className="flex items-center gap-3 p-4 bg-[#1A1D23] rounded-[16px] border border-white/10 shadow-md">
          <div className="w-10 h-10 rounded-full bg-[#FF5722]/10 flex items-center justify-center text-[#FF5722]">
            <AiOutlineLineChart size={22} />
          </div>
          <div>
            <h1 className="font-reddit text-[18px] font-bold text-white leading-tight">
              Popular
            </h1>
            <p className="font-reddit text-[12px] text-gray-500">
              The most popular posts on Circus right now
            </p>
          </div>
        </div>

        {/* Posts Feed sorted by popularity */}
        <Posts sort="popular" />
      </div>

      {/* Right Content: Sidebar */}
      <div className="flex flex-col gap-5">
        <RecentPosts />
        <Recommendations />
        <SidebarFooter />
      </div>
    </PageContent>
  );
}
