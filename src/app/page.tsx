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
