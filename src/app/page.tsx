"use client";

import {
  PageContent,
  Posts,
  Recommendations,
  SidebarFooter,
} from "@/components";
import RecentPosts from "@/components/community/RecentPosts";
import React from "react";

export default function Home() {
  return (
    <PageContent>
      {/* Center Content: Feed */}
      <div className="flex flex-col gap-5">
        <Posts />
        
        {/* Mobile-only Sidebar Elements */}
        <div className="flex lg:hidden flex-col gap-5 mt-4">
          <RecentPosts />
          <Recommendations />
          <SidebarFooter />
        </div>
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
