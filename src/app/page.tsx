"use client";

import {
  CreatePostLink,
  PageContent,
  PersonalHome,
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
        <CreatePostLink />
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
